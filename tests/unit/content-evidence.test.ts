import { evaluate, parse } from 'groq-js';
import { describe, expect, it } from 'vitest';
import {
  caseStudyQuery,
  homepageDataQuery,
  visibleMetricsQuery,
  visibleTestimonialQuery,
} from '@/sanity/lib/queries';

const approved = { status: 'approved' };
const review = {
  _type: 'testimonial',
  _id: 'review',
  approval: approved,
  permission: true,
  quote: 'Actual quote',
  authorName: 'Actual person',
  verifiedExperience: true,
  source: 'Original review',
  permissionEvidence: 'Signed permission',
};
async function query(source: string, dataset: unknown[], params = {}) {
  return (await evaluate(parse(source), { dataset, params })).get();
}

describe('public proof', () => {
  it('hides fictional and undocumented testimonials including case-study references', async () => {
    const caseStudy = {
      _type: 'caseStudy',
      _id: 'case',
      approval: approved,
      evidenceSource: 'Delivery evidence and client permission',
      slug: { current: 'case' },
      approvedTestimonial: { _ref: 'review' },
    };
    for (const unsafe of [
      { ...review, permission: false },
      { ...review, approval: { status: 'draft' } },
      { ...review, verifiedExperience: false },
      { ...review, source: null },
      { ...review, permissionEvidence: null },
      { ...review, permissionEvidence: '   ' },
    ]) {
      expect(await query(visibleTestimonialQuery, [unsafe])).toEqual([]);
      const result = await query(caseStudyQuery(false), [caseStudy, unsafe], {
        slug: 'case',
      });
      expect(result.caseStudy.approvedTestimonial?.quote).toBeUndefined();
    }
    const result = await query(caseStudyQuery(false), [caseStudy, review], {
      slug: 'case',
    });
    expect(result.caseStudy.approvedTestimonial.quote).toBe('Actual quote');
    expect(await query(visibleTestimonialQuery, [review])).toHaveLength(1);
  });

  it('excludes unsupported, future, and expired metrics from both product and homepage', async () => {
    const metric = {
      _id: 'good',
      _type: 'metric',
      approval: approved,
      approved: true,
      source: 'Audited source',
      evidenceNote: 'Method and sample',
      label: 'Measured result',
      value: '10',
    };
    const data = [
      metric,
      { ...metric, _id: 'missing', source: null },
      { ...metric, _id: 'blank', source: '   ' },
      { ...metric, _id: 'expired', validTo: '2000-01-01' },
      { ...metric, _id: 'future', validFrom: '2999-01-01' },
    ];
    expect(
      (await query(visibleMetricsQuery, data)).map(
        (item: { _id: string }) => item._id,
      ),
    ).toEqual(['good']);
    expect(
      (await query(homepageDataQuery(false), data)).metrics.map(
        (item: { _id: string }) => item._id,
      ),
    ).toEqual(['good']);
  });
});
