import { VercelRequest, VercelResponse } from '@vercel/node';
import { auditArabicContent } from '../lib/skill-integration';

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

    // Call integrated skill function
    const result = await auditArabicContent({ content, dialect, auditType: audit_type });

    return res.status(200).json(result);
  } catch (error) {
    console.error('Error in /v1/audit:', error);
    return res.status(500).json({
      error: 'Internal server error',
      details: error instanceof Error ? error.message : String(error),
    });
  }
}
