import { VercelRequest, VercelResponse } from '@vercel/node';

/**
 * POST /api/v1/audit
 * Audit Arabic copy for quality, register, translationese, RTL issues, dialect purity
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { content, dialect, audit_type = 'full' } = req.body;

    // Validation
    if (!content) {
      return res.status(400).json({ error: 'Missing required field: content' });
    }

    if (content.length > 5000) {
      return res.status(400).json({ error: 'Content must be 5000 characters or less' });
    }

    const validAuditTypes = ['full', 'register', 'translationese', 'rtl', 'dialect-purity'];
    if (audit_type && !validAuditTypes.includes(audit_type)) {
      return res.status(400).json({
        error: `Invalid audit_type. Must be one of: ${validAuditTypes.join(', ')}`,
      });
    }

    // TODO: Call local /arabic audit command via child_process
    // For now, return mock response
    const mockIssues = [
      {
        type: 'translationese',
        severity: 'medium',
        description: 'Contains AI-sounding phrases that break natural flow',
        snippet: 'يرجى العلم',
        suggestion: 'Use more conversational phrasing like: اعرف إن',
      },
    ];

    return res.status(200).json({
      overall_score: 78,
      issues: audit_type === 'full' ? mockIssues : mockIssues.filter(i => i.type === audit_type),
      summary: 'Good Arabic quality with minor improvements suggested for naturalness',
    });
  } catch (error) {
    console.error('Error in /v1/audit:', error);
    return res.status(500).json({
      error: 'Internal server error',
      details: error instanceof Error ? error.message : String(error),
    });
  }
}
