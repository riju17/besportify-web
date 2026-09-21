import type { StructureResolver } from 'sanity/structure';

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Website')
    .items([
      S.listItem()
        .title('Homepage')
        .child(S.document().schemaType('homepage').documentId('homepage')),
      S.listItem()
        .title('Site settings')
        .child(
          S.document().schemaType('siteSettings').documentId('siteSettings'),
        ),
      S.divider(),
      S.documentTypeListItem('product').title('Products'),
      S.documentTypeListItem('productCapability').title('Capabilities'),
      S.documentTypeListItem('service').title('Services'),
      S.documentTypeListItem('partner').title('Partners'),
      S.listItem()
        .title('Case studies')
        .child(
          S.documentTypeList('caseStudy')
            .title('Case studies')
            .initialValueTemplates([
              S.initialValueTemplateItem('caseStudy'),
              S.initialValueTemplateItem('caseStudy-editorial-starter'),
            ]),
        ),
      S.listItem()
        .title('Insights')
        .child(
          S.documentTypeList('insight')
            .title('Insights')
            .initialValueTemplates([
              S.initialValueTemplateItem('insight'),
              S.initialValueTemplateItem('insight-editorial-starter'),
            ]),
        ),
      S.documentTypeListItem('author').title('Authors'),
      S.documentTypeListItem('category').title('Categories'),
      S.documentTypeListItem('teamMember').title('Team'),
      S.documentTypeListItem('career').title('Careers'),
      S.documentTypeListItem('testimonial').title('Testimonials'),
      S.documentTypeListItem('metric').title('Metrics'),
      S.documentTypeListItem('callToAction').title('Reusable CTAs'),
    ]);
