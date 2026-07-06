import { VercelRequest, VercelResponse } from '@vercel/node';

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

    // TODO: Call local /arabic plan command via child_process
    // For now, return mock response
    const mockPlan = {
      project: `${project_type} in ${dialects.length ? dialects.join(' + ') : 'Masri'}`,
      plan: {
        phases: [
          {
            phase: 1,
            title: 'Discovery & Strategy',
            duration: '1 week',
            deliverables: [
              'Dialect selection rationale',
              'Audience & market research',
              'Content calendar',
            ],
          },
          {
            phase: 2,
            title: 'Content Creation',
            duration: '2 weeks',
            deliverables: [
              'Draft copy in selected dialects',
              'Cultural sensitivity review',
              'First round of edits',
            ],
          },
          {
            phase: 3,
            title: 'QA & Delivery',
            duration: '1 week',
            deliverables: [
              'Final audit (RTL, dialect purity)',
              'Delivered content',
              'Style guide for future work',
            ],
          },
        ],
        timeline: timeline || '4 weeks',
        dialect_strategy: `Recommended dialects: ${dialects.length ? dialects.join(', ') : 'Masri (Egyptian Arabic) for primary audience'}. Consider regional market variants for broader reach.`,
      },
    };

    return res.status(200).json(mockPlan);
  } catch (error) {
    console.error('Error in /v1/plan:', error);
    return res.status(500).json({
      error: 'Internal server error',
      details: error instanceof Error ? error.message : String(error),
    });
  }
}
