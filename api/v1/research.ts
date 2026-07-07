import { VercelRequest, VercelResponse } from '@vercel/node';
import { researchArabicTopic } from '../lib/skill-integration';

/**
 * POST /api/v1/research
 * Research and distill Arabic content topics with lifecycle tracking
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { query, dialect, max_results = 5 } = req.body;

    // Validation
    if (!query) {
      return res.status(400).json({ error: 'Missing required field: query' });
    }

    if (max_results < 1 || max_results > 20) {
      return res.status(400).json({ error: 'max_results must be between 1 and 20' });
    }

    // Call integrated skill function
    const result = await researchArabicTopic({ query, dialect, maxResults: max_results });

    return res.status(200).json(result);
  } catch (error) {
    console.error('Error in /v1/research:', error);
    return res.status(500).json({
      error: 'Internal server error',
      details: error instanceof Error ? error.message : String(error),
    });
  }
}
