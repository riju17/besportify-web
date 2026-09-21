export const editorialTemplates = [
  {
    id: 'caseStudy-editorial-starter',
    title: 'Case Study: editorial starter',
    description: 'Prefilled structure for an approved case study.',
    schemaType: 'caseStudy',
    value: {
      title: 'Untitled approved case study',
      client: 'Client or organisation',
      relationship: 'Approved relationship wording',
      competitionContext: 'Competition / date / context',
      challenge: 'What problem did they need to solve?',
      whyItMattered: 'Why did this matter to the client?',
      approach: 'What did BeSportify do?',
      dataAndScope: 'What data and scope were included?',
      intelligenceDelivered: 'What was delivered?',
      application: 'How was the output applied?',
      outcome: 'What changed or was verified?',
      limitations: 'Confidentiality or scope limitations',
      approval: {
        status: 'draft',
        owner: 'Content owner',
      },
      seo: {
        noIndex: true,
      },
    },
  },
  {
    id: 'insight-editorial-starter',
    title: 'Insight: editorial starter',
    description: 'Prefilled structure for a substantive Insight article.',
    schemaType: 'insight',
    value: {
      title: 'Untitled insight',
      excerpt: 'Short summary of the article’s focus.',
      centralQuestion: 'What question does this article answer?',
      keyTakeawaySummary: 'What should the reader remember?',
      sourceNotes: 'Source notes and scope',
      limitations: 'Limitations and caveats',
      body: [
        {
          _type: 'block',
          style: 'h2',
          children: [{ _type: 'span', text: 'Heading' }],
        },
        {
          _type: 'block',
          style: 'normal',
          children: [{ _type: 'span', text: 'Add approved analysis here.' }],
        },
      ],
      approval: {
        status: 'draft',
        owner: 'Content owner',
      },
      seo: {
        noIndex: true,
      },
    },
  },
] as const;
