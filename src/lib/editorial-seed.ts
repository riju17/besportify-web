import type { PortableTextValue } from '@/components/content/portable-text';
import type {
  CaseStudiesPageData,
  CaseStudyPageData,
  EditorialAuthor,
  EditorialCategory,
  EditorialCaseStudy,
  EditorialInsight,
  InsightsPageData,
  InsightPageData,
} from '@/lib/editorial';

function block(
  style: 'normal' | 'h2' | 'h3' | 'blockquote',
  text: string,
  listItem?: 'bullet' | 'number',
) {
  return {
    _type: 'block' as const,
    style,
    ...(listItem ? { listItem } : {}),
    children: [{ _type: 'span' as const, text }],
  };
}

const editorialAuthor: Exclude<EditorialAuthor, null> = {
  _id: 'author-besportify-editorial',
  name: 'BeSportify editorial team',
  slug: { current: 'besportify-editorial-team' },
  role: 'Editorial',
  bio: 'Internal editorial and product team responsible for approved website content.',
  photo: null,
  profileLink: null,
  approval: { status: 'approved' },
};

const editorialCategories: Array<Exclude<EditorialCategory, null>> = [
  {
    _id: 'category-cricket-analytics',
    title: 'Cricket Analytics',
    slug: { current: 'cricket-analytics' },
    description: 'Practical analysis on player and match context.',
    displayOrder: 1,
    approval: { status: 'approved' },
  },
  {
    _id: 'category-match-strategy',
    title: 'Match Strategy',
    slug: { current: 'match-strategy' },
    description: 'Decision-making and preparation across fixtures.',
    displayOrder: 2,
    approval: { status: 'approved' },
  },
  {
    _id: 'category-data-quality',
    title: 'Data Quality',
    slug: { current: 'data-quality' },
    description: 'How clean structures affect downstream analysis.',
    displayOrder: 3,
    approval: { status: 'approved' },
  },
];

const editorialCaseStudies: Array<Exclude<EditorialCaseStudy, null>> = [
  {
    _id: 'case-study-preview-safe-editorial-layer',
    title: 'Building a preview-safe editorial layer for BeSportify',
    slug: { current: 'building-a-preview-safe-editorial-layer' },
    client: 'BeSportify',
    relationship: 'Internal product and content build',
    competitionContext: 'Phase 7 editorial rollout, August 2026',
    challenge:
      'The public site needed case studies and Insights routes that could be previewed safely without exposing drafts or inventing proof.',
    whyItMattered:
      'The editorial workflow needed to be trustworthy before the navigation could be opened to readers.',
    approach:
      'Implemented Sanity queries with approval filters, draft-mode-aware loaders, typed Portable Text rendering, related-content projections, and omission-safe components.',
    dataAndScope:
      'Root Next.js app, Sanity document types, article layouts, and the approval and presentation workflow.',
    intelligenceDelivered:
      'Publishable templates for case studies and Insights with controlled metadata, previews, and responsive long-form layouts.',
    application:
      'The content team can draft, preview, and approve content before publication while developers keep the route structure stable.',
    outcome:
      'Phase 7 code now renders editorial content cleanly in development and remains gated in production until approved content exists.',
    limitations:
      'This is an internal implementation case study, not a customer reference. No client confidentiality issue applies because the subject is the BeSportify website itself.',
    approvedTestimonial: null,
    relatedProduct: {
      _id: 'product-statstrike',
      name: 'StatStrike',
      slug: { current: 'statstrike' },
      summary:
        'A cricket-intelligence platform for performance analysis, opposition preparation, scouting, and match review.',
      accent: 'statstrike',
    },
    relatedService: null,
    media: null,
    publishedAt: '2026-08-21T00:00:00.000Z',
    seo: null,
    order: 1,
    approval: { status: 'approved' },
  },
];

const overviewBody: PortableTextValue = [
  block('h2', 'Start with the role'),
  block(
    'normal',
    'Batting average is useful, but it compresses different jobs into one number. An opener, a middle-order stabiliser, and a finisher are solving different problems, so their values should be judged against the role they were asked to perform.',
  ),
  block('h2', 'Add innings context'),
  block(
    'normal',
    'A batter who scores slowly in a collapse may have done a very different job from a batter who scores quickly when the target is small. Score state, wickets in hand, and the phase of the innings matter because they change the decision that the player is trying to make.',
  ),
  block('h2', 'Compare like with like'),
  block(
    'normal',
    'The most honest evaluation usually comes from comparing players who face similar match situations. That does not remove all uncertainty, but it keeps the analysis from rewarding a role player for output that came from a different job.',
  ),
  block('h3', 'Practical checks'),
  block('normal', 'Keep sample size visible when reporting a trend.', 'bullet'),
  block(
    'normal',
    'Record whether the player was batting first or chasing.',
    'bullet',
  ),
  block(
    'normal',
    'Note opposition quality and venue conditions before drawing a conclusion.',
    'bullet',
  ),
  block('blockquote', 'Averages answer how much. Context answers how and why.'),
];

const oppositionBody: PortableTextValue = [
  block('h2', 'Move from description to decision'),
  block(
    'normal',
    'A report that only says what the opponent did is easy to write and hard to use. Actionable analysis starts with the decision the coach, analyst, or captain needs to make and then collects only the evidence that helps with that decision.',
  ),
  block('h2', 'Ask a narrower question'),
  block(
    'normal',
    'Instead of asking for everything about an opponent, frame the task around a specific match state, phase, or selection problem. That makes the output easier to read and it also makes the recommendation easier to defend later.',
  ),
  block('h2', 'Turn observations into outputs'),
  block(
    'normal',
    'Useful opposition work usually ends in a small set of clear deliverables: a matchup note, a phase summary, a sequence to avoid, and one or two tendencies that support planning. The point is not volume. The point is a decision a team can act on.',
  ),
  block('h3', 'Practical checks'),
  block('normal', 'Separate description from recommendation.', 'bullet'),
  block(
    'normal',
    'Call out what the opponent does often and what they only do in specific states.',
    'bullet',
  ),
  block(
    'normal',
    'Keep the output short enough to use before the match starts.',
    'bullet',
  ),
  block(
    'blockquote',
    'The value is not the report. The value is the next action.',
  ),
];

const dataQualityBody: PortableTextValue = [
  block('h2', 'Duplicates create false confidence'),
  block(
    'normal',
    'If a player appears twice under different identifiers, every downstream comparison becomes less trustworthy. The same problem appears with duplicated matches, competitions, or teams: the analysis may still run, but the result is no longer describing one clean thing.',
  ),
  block('h2', 'Missing fields change interpretation'),
  block(
    'normal',
    'A missing dismissal, an incomplete scorecard, or an unknown venue can shift the meaning of a trend. The safest habit is to surface those gaps early instead of silently filling them with assumptions.',
  ),
  block('h2', 'Validate before you visualise'),
  block(
    'normal',
    'Validation is not a separate administrative step. It is part of analysis. Clean identifiers, consistent names, and sensible date ranges make the output easier to compare and reduce the risk of explaining noise as signal.',
  ),
  block('h3', 'Practical checks'),
  block('normal', 'Normalize entity names before aggregation.', 'bullet'),
  block(
    'normal',
    'Flag missing dismissals, overs, or venue metadata.',
    'bullet',
  ),
  block(
    'normal',
    'Keep source and reviewer notes attached to the insight.',
    'bullet',
  ),
  block('blockquote', 'If the identifier is wrong, the insight is wrong.'),
];

const editorialInsights: Array<Exclude<EditorialInsight, null>> = [
  {
    _id: 'insight-batting-average-context',
    title: 'Beyond batting average: building context into player evaluation',
    slug: {
      current: 'beyond-batting-average-building-context-into-player-evaluation',
    },
    excerpt:
      'Why role, opposition, venue, and innings state matter more than a raw average on their own.',
    centralQuestion:
      'How do we evaluate a batter without flattening the context that shaped the innings?',
    keyTakeawaySummary:
      'Averages are a starting point; role, opposition, conditions, and innings state explain the decision-making value.',
    author: editorialAuthor,
    category: editorialCategories[0],
    body: overviewBody,
    heroImage: null,
    sourceNotes:
      'Internal editorial analysis. No external dataset is claimed in this article.',
    limitations:
      'Examples are illustrative and are not presented as a published statistical study.',
    relatedProduct: {
      _id: 'product-statstrike',
      name: 'StatStrike',
      slug: { current: 'statstrike' },
      summary:
        'A cricket-intelligence platform for performance analysis, opposition preparation, scouting, and match review.',
      accent: 'statstrike',
    },
    relatedService: null,
    publishedAt: '2026-08-18T00:00:00.000Z',
    seo: null,
    approval: { status: 'approved' },
    _updatedAt: '2026-08-18T00:00:00.000Z',
  },
  {
    _id: 'insight-opposition-analysis-actionable',
    title: 'What makes opposition analysis actionable?',
    slug: { current: 'what-makes-opposition-analysis-actionable' },
    excerpt:
      'Turning descriptive numbers into preparation questions, matchup notes, and usable outputs.',
    centralQuestion:
      'What changes a collection of observations into something a team can act on?',
    keyTakeawaySummary:
      'Good opposition analysis starts with the decision and ends with a short, usable recommendation.',
    author: editorialAuthor,
    category: editorialCategories[1],
    body: oppositionBody,
    heroImage: null,
    sourceNotes:
      'Internal editorial analysis focused on preparation workflows rather than a single match dataset.',
    limitations:
      'The article is intentionally general and does not claim predictive performance or opponent-specific certainty.',
    relatedProduct: {
      _id: 'product-statstrike',
      name: 'StatStrike',
      slug: { current: 'statstrike' },
      summary:
        'A cricket-intelligence platform for performance analysis, opposition preparation, scouting, and match review.',
      accent: 'statstrike',
    },
    relatedService: null,
    publishedAt: '2026-08-20T00:00:00.000Z',
    seo: null,
    approval: { status: 'approved' },
    _updatedAt: '2026-08-20T00:00:00.000Z',
  },
  {
    _id: 'insight-data-quality-downstream-insight',
    title: 'Data quality changes every downstream cricket insight',
    slug: {
      current: 'data-quality-changes-every-downstream-cricket-insight',
    },
    excerpt:
      'Why duplicates, missing fields, and inconsistent identifiers change the meaning of an analysis before the chart is even drawn.',
    centralQuestion:
      'How do we keep analysis honest when the source data is incomplete or inconsistent?',
    keyTakeawaySummary:
      'A clean identifier and a visible limitation note are part of the insight, not an optional extra.',
    author: editorialAuthor,
    category: editorialCategories[2],
    body: dataQualityBody,
    heroImage: null,
    sourceNotes:
      'Internal editorial guidance based on common sports-data validation issues; no specific dataset is referenced.',
    limitations:
      'This is a conceptual article about data quality. It does not claim a particular system, league, or dataset.',
    relatedProduct: null,
    relatedService: {
      _id: 'service-custom-sports-software',
      title: 'Custom sports software',
      slug: { current: 'custom-sports-software' },
      summary:
        'Product design and development for specialised sports workflows that are not served by standard tools.',
      customer: 'Teams',
    },
    publishedAt: '2026-08-22T00:00:00.000Z',
    seo: null,
    approval: { status: 'approved' },
    _updatedAt: '2026-08-22T00:00:00.000Z',
  },
];

export function getDevelopmentCaseStudiesPageData(): CaseStudiesPageData {
  return {
    siteSettings: null,
    caseStudies: editorialCaseStudies,
  };
}

export function getDevelopmentCaseStudyPageData(
  slug: string,
): CaseStudyPageData {
  const caseStudy =
    editorialCaseStudies.find((item) => item.slug?.current === slug) ??
    editorialCaseStudies[0] ??
    null;

  return {
    siteSettings: null,
    caseStudy,
    relatedCaseStudies: editorialCaseStudies.filter(
      (item) => item.slug?.current !== slug,
    ),
  };
}

export function getDevelopmentInsightsPageData(): InsightsPageData {
  return {
    siteSettings: null,
    insights: editorialInsights,
    categories: editorialCategories,
    authors: [editorialAuthor],
  };
}

export function getDevelopmentInsightPageData(slug: string): InsightPageData {
  const insight =
    editorialInsights.find((item) => item.slug?.current === slug) ??
    editorialInsights[0] ??
    null;

  return {
    siteSettings: null,
    insight,
    relatedInsights: editorialInsights.filter(
      (item) => item.slug?.current !== slug,
    ),
    categories: editorialCategories,
    authors: [editorialAuthor],
  };
}
