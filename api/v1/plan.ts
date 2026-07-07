import { VercelRequest, VercelResponse } from '@vercel/node';
import { planArabicProject } from '../lib/skill-integration';

/**
 * POST /api/v1/plan
 * Plan Arabic content projects with dialect selection and timeline
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { project_type, scope, timeline, dialects = [] } = req.body;

    // Validation
    if (!project_type || !scope) {
      return res.status(400).json({ error: 'Missing required fields: project_type, scope' });
    }

    const validProjectTypes = ['website', 'campaign', 'book', 'product'];
    if (!validProjectTypes.includes(project_type)) {
      return res.status(400).json({
        error: `Invalid project_type. Must be one of: ${validProjectTypes.join(', ')}`,
      });
    }

    // Call integrated skill function
    const result = await planArabicProject({
      projectType: project_type,
      scope,
      timeline,
      dialects,
    });

    return res.status(200).json(result);
  } catch (error) {
    console.error('Error in /v1/plan:', error);
    return res.status(500).json({
      error: 'Internal server error',
      details: error instanceof Error ? error.message : String(error),
    });
  }
}
