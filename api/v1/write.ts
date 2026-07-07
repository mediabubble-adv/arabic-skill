import { VercelRequest, VercelResponse } from '@vercel/node';
import { writeArabicContent } from '../lib/skill-integration';

/**
 * POST /api/v1/write
 * Generate Arabic content for specified type, dialect, and tone
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { type, dialect, brief, count = 1, tone = 'conversational' } = req.body;

    // Validation
    if (!type || !dialect || !brief) {
      return res.status(400).json({
        error: 'Missing required fields: type, dialect, brief',
      });
    }

    const validTypes = ['caption', 'ad', 'blog', 'script', 'copy', 'microcopy'];
    const validDialects = ['masri', 'ksa', 'gulf', 'levantine', 'iraqi', 'yemeni', 'maghrebi', 'sudanese', 'libyan', 'msa', 'white'];
    const validTones = ['formal', 'casual', 'persuasive', 'educational', 'conversational'];

    if (!validTypes.includes(type)) {
      return res.status(400).json({ error: `Invalid type. Must be one of: ${validTypes.join(', ')}` });
    }

    if (!validDialects.includes(dialect)) {
      return res.status(400).json({ error: `Invalid dialect. Must be one of: ${validDialects.join(', ')}` });
    }

    if (!validTones.includes(tone)) {
      return res.status(400).json({ error: `Invalid tone. Must be one of: ${validTones.join(', ')}` });
    }

    if (count < 1 || count > 10) {
      return res.status(400).json({ error: 'Count must be between 1 and 10' });
    }

    if (brief.length > 500) {
      return res.status(400).json({ error: 'Brief must be 500 characters or less' });
    }

    // Call integrated skill function
    const result = await writeArabicContent({ type, dialect, brief, count, tone });

    return res.status(200).json(result);
  } catch (error) {
    console.error('Error in /v1/write:', error);
    return res.status(500).json({
      error: 'Internal server error',
      details: error instanceof Error ? error.message : String(error),
    });
  }
}
