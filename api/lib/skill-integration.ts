/**
 * Integration layer between Vercel API and /arabic skill
 *
 * This module bridges the plugin API endpoints to the Awesome Arabic Skill
 * by invoking the underlying CLI commands or importing skill modules directly.
 */

import { execFile } from 'child_process';
import { promisify } from 'util';
import * as path from 'path';

const execFileAsync = promisify(execFile);

/**
 * Configuration for skill integration
 */
const SKILL_CONFIG = {
  // Path to skill in repository (relative to API root)
  skillPath: path.join(process.cwd(), 'arabic'),
  // Whether to use CLI or direct module import
  useCliCommands: process.env.USE_CLI_COMMANDS === 'true',
  // Timeout for CLI commands (ms)
  commandTimeout: 30000,
};

/**
 * Execute CLI command with timeout
 * Safe execution using execFile (no shell injection risk)
 * @param args Command arguments (e.g., ['/arabic', 'write', 'caption', '--dialect', 'masri'])
 * @returns Command output as JSON
 */
export async function executeSkillCommand(args: string[]): Promise<any> {
  try {
    const { stdout } = await execFileAsync('npm', ['run', ...args], {
      cwd: process.cwd(),
      encoding: 'utf-8',
      timeout: SKILL_CONFIG.commandTimeout,
    });

    // Parse JSON output
    const output = JSON.parse(stdout);
    return output;
  } catch (error) {
    throw {
      code: 'SKILL_COMMAND_ERROR',
      message: `Failed to execute skill command`,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

/**
 * Write Arabic content
 * @param params Write parameters
 * @returns Generated content
 */
export async function writeArabicContent(params: {
  type: string;
  dialect: string;
  brief: string;
  count?: number;
  tone?: string;
}): Promise<any> {
  const { type, dialect, brief, count = 1, tone = 'conversational' } = params;

  // Build command with safe argument passing (no shell injection)
  const args = [
    '/arabic',
    'write',
    type,
    '--dialect',
    dialect,
    '--brief',
    brief,
    '--count',
    String(count),
    '--tone',
    tone,
  ];

  try {
    const result = await executeSkillCommand(args);
    return {
      content: result.content || [],
      metadata: result.metadata || {},
    };
  } catch (error: any) {
    throw new Error(`Write failed: ${error.message}`);
  }
}

/**
 * Audit Arabic content
 * @param params Audit parameters
 * @returns Audit results
 */
export async function auditArabicContent(params: {
  content: string;
  dialect?: string;
  auditType?: string;
}): Promise<any> {
  const { content, dialect, auditType = 'full' } = params;

  const args = ['/arabic', 'audit', '--content', content, '--type', auditType];
  if (dialect) {
    args.push('--dialect', dialect);
  }

  try {
    const result = await executeSkillCommand(args);
    return {
      overall_score: result.overall_score || 0,
      issues: result.issues || [],
      summary: result.summary || '',
    };
  } catch (error: any) {
    throw new Error(`Audit failed: ${error.message}`);
  }
}

/**
 * Research Arabic content topics
 * @param params Research parameters
 * @returns Research findings
 */
export async function researchArabicTopic(params: {
  query: string;
  dialect?: string;
  maxResults?: number;
}): Promise<any> {
  const { query, dialect, maxResults = 5 } = params;

  const args = ['/arabic', 'research', query, '--max-results', String(maxResults)];
  if (dialect) {
    args.push('--dialect', dialect);
  }

  try {
    const result = await executeSkillCommand(args);
    return {
      topic: query,
      findings: result.findings || [],
      lifecycleState: result.lifecycle_state || 'collected',
      lastUpdated: new Date().toISOString(),
    };
  } catch (error: any) {
    throw new Error(`Research failed: ${error.message}`);
  }
}

/**
 * Plan Arabic content project
 * @param params Planning parameters
 * @returns Content plan
 */
export async function planArabicProject(params: {
  projectType: string;
  scope: string;
  timeline?: string;
  dialects?: string[];
}): Promise<any> {
  const { projectType, scope, timeline, dialects = [] } = params;

  const args = ['/arabic', 'plan', projectType, '--scope', scope];
  if (timeline) {
    args.push('--timeline', timeline);
  }
  if (dialects.length) {
    args.push('--dialects', dialects.join(','));
  }

  try {
    const result = await executeSkillCommand(args);
    return {
      project: result.project || projectType,
      plan: result.plan || {},
    };
  } catch (error: any) {
    throw new Error(`Planning failed: ${error.message}`);
  }
}

/**
 * Health check: verify skill is available
 * @returns Health status
 */
export async function healthCheck(): Promise<{
  status: 'healthy' | 'degraded' | 'unhealthy';
  message: string;
  timestamp: string;
}> {
  try {
    // Try to execute a simple command
    await execFileAsync('npm', ['run', '/arabic', '--', 'help'], {
      cwd: process.cwd(),
      encoding: 'utf-8',
      timeout: 5000,
    });

    return {
      status: 'healthy',
      message: 'Skill is available and responding',
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    return {
      status: 'unhealthy',
      message: `Skill not available: ${error instanceof Error ? error.message : String(error)}`,
      timestamp: new Date().toISOString(),
    };
  }
}

/**
 * Export all integration functions
 */
export default {
  writeArabicContent,
  auditArabicContent,
  researchArabicTopic,
  planArabicProject,
  healthCheck,
};
