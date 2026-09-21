import { defineQuery } from 'next-sanity';

// These checks also apply to referenced proof; approval alone is not evidence.
const testimonialEvidenceFilter =
  ' && verifiedExperience == true && length(source) > 1 && source match "*" && length(permissionEvidence) > 1 && permissionEvidence match "*"';
const metricEvidenceFilter =
  ' && length(source) > 1 && source match "*" && length(evidenceNote) > 1 && evidenceNote match "*" && (!defined(validFrom) || dateTime(validFrom + "T00:00:00Z") <= dateTime(now())) && (!defined(validTo) || dateTime(validTo + "T23:59:59Z") >= dateTime(now()))';
const caseEvidenceFilter = (draft: boolean) =>
  draft ? '' : ' && length(evidenceSource) > 1 && evidenceSource match "*"';

const homepageApprovalFilter = (draft: boolean) =>
  draft ? '' : ' && approval.status == "approved"';

const editorialApprovalFilter = (draft: boolean) =>
  draft ? '' : ' && approval.status == "approved"';

const approvedSiteSettingsProjection = `{
  _id,
  companyName,
  description,
  legalName,
  businessAddress,
  businessCountry,
  privacyEmail,
  registrationNumber,
  grievanceContact,
  contactEmail,
  contactPhone,
  socialLinks[]{label, kind, internalRoute, externalUrl},
  seo{
    title,
    description,
    canonical,
    noIndex,
    socialImage{
      alt,
      asset
    }
  }
}`;

export const siteSettingsQuery = defineQuery(`*[_type == "siteSettings"][0]{
  _id,
  companyName,
  description,
  legalName,
  businessAddress,
  businessCountry,
  privacyEmail,
  registrationNumber,
  grievanceContact,
  contactEmail,
  contactPhone,
  socialLinks[]{label, kind, internalRoute, externalUrl}
}`);

export const approvedSiteSettingsQuery = defineQuery(
  `*[_type == "siteSettings" && approval.status == "approved"][0]${approvedSiteSettingsProjection}`,
);

export const approvedProductQuery = defineQuery(
  `*[_type == "product" && slug.current == "statstrike" && approval.status == "approved"][0]{
    _id,
    name,
    slug,
    summary,
    accent,
    heroMedia{
      alt,
      caption,
      credit,
      source,
      permission,
      rightsConfirmed,
      asset
    },
    cta{
      label,
      supportingCopy,
      placement,
      approved,
      link{
        label,
        kind,
        internalRoute,
        externalUrl
      }
    },
    seo{
      title,
      description,
      canonical,
      noIndex,
      socialImage{
        alt,
        asset
      }
    }
  }`,
);

export const approvedServicesPageQuery = defineQuery(
  `{
    "siteSettings": *[_type == "siteSettings" && approval.status == "approved"][0]${approvedSiteSettingsProjection},
    "services": *[_type == "service" && approval.status == "approved"] | order(order asc, title asc) {
      _id,
      title,
      slug,
      summary,
      customer,
      problem,
      deliverable,
      outcome,
      order,
      approval
    }
  }`,
);

export const approvedTeamPageQuery = defineQuery(
  `{
    "siteSettings": *[_type == "siteSettings" && approval.status == "approved"][0]${approvedSiteSettingsProjection},
    "team": *[_type == "teamMember" && approval.status == "approved" && consent == true] | order(displayOrder asc, name asc) {
      _id,
      name,
      slug,
      role,
      bio,
      photo{
        alt,
        caption,
        credit,
        source,
        permission,
      rightsConfirmed,
        asset
      },
      profileLink{
        label,
        kind,
        internalRoute,
        externalUrl
      },
      consent,
      displayOrder
    }
  }`,
);

export const visibleCapabilitiesQuery =
  defineQuery(`*[_type == "productCapability" && approval.status == "approved" && status == "live"] | order(order asc, title asc) {
  _id,
  title,
  slug,
  summary,
  audience,
  details,
  evidence,
  status,
  order
}`);

export const visibleServicesQuery =
  defineQuery(`*[_type == "service" && approval.status == "approved"] | order(order asc, title asc) {
  _id,
  title,
  slug,
  summary,
  customer,
  problem,
  deliverable,
  outcome,
  order
}`);

export const visiblePartnersQuery =
  defineQuery(`*[_type == "partner" && publicVisible == true && length(relationshipEvidence) > 1 && relationshipEvidence match "*" && approval.status == "approved"] | order(order asc, name asc) {
  _id,
  name,
  slug,
  relationshipType,
  relationshipWording,
  logo
}`);

export const visibleTestimonialQuery =
  defineQuery(`*[_type == "testimonial" && approval.status == "approved" && permission == true${testimonialEvidenceFilter}] | order(order asc, _createdAt desc) {
  _id,
  quote,
  authorName,
  authorRole,
  organisation,
  displayOrder
}`);

export const visibleMetricsQuery =
  defineQuery(`*[_type == "metric" && approval.status == "approved" && approved == true${metricEvidenceFilter}] | order(displayOrder asc, label asc) {
  _id,
  label,
  value,
  unit,
  evidenceNote,
  source,
  validFrom,
  validTo,
  approved,
  displayOrder
}`);

export function caseStudiesPageQuery(draft: boolean) {
  const approvalFilter = editorialApprovalFilter(draft);

  return defineQuery(`{
    "siteSettings": *[_type == "siteSettings"${approvalFilter}][0]${approvedSiteSettingsProjection},
    "caseStudies": *[_type == "caseStudy"${approvalFilter}${caseEvidenceFilter(draft)}] | order(order asc, publishedAt desc, title asc) {
      _id,
      title,
      slug,
      client,
      relationship,
      competitionContext,
      challenge,
      whyItMattered,
      approach,
      dataAndScope,
      intelligenceDelivered,
      application,
      outcome,
      limitations,
      "approvedTestimonial": approvedTestimonial-> {
        ...select(approval.status == "approved" && permission == true${testimonialEvidenceFilter} => {
        _id,
        quote,
        authorName,
        authorRole,
        organisation,
        displayOrder,
        approval
        })
      },
      relatedProduct->{
        _id,
        name,
        slug,
        summary,
        accent
      },
      relatedService->{
        _id,
        title,
        slug,
        summary,
        customer
      },
      media[]{
        alt,
        caption,
        credit,
        source,
        permission,
      rightsConfirmed,
        asset
      },
      publishedAt,
      seo{
        title,
        description,
        canonical,
        noIndex,
        socialImage{
          alt,
          asset
        }
      },
      order,
      approval
    }
  }`);
}

export function caseStudyQuery(draft: boolean) {
  const approvalFilter = editorialApprovalFilter(draft);

  return defineQuery(`{
    "siteSettings": *[_type == "siteSettings"${approvalFilter}][0]${approvedSiteSettingsProjection},
    "caseStudy": *[_type == "caseStudy" && slug.current == $slug${approvalFilter}${caseEvidenceFilter(draft)}][0]{
      _id,
      title,
      slug,
      client,
      relationship,
      competitionContext,
      challenge,
      whyItMattered,
      approach,
      dataAndScope,
      intelligenceDelivered,
      application,
      outcome,
      limitations,
      "approvedTestimonial": approvedTestimonial-> {
        ...select(approval.status == "approved" && permission == true${testimonialEvidenceFilter} => {
        _id,
        quote,
        authorName,
        authorRole,
        organisation,
        displayOrder,
        approval
        })
      },
      relatedProduct->{
        _id,
        name,
        slug,
        summary,
        accent
      },
      relatedService->{
        _id,
        title,
        slug,
        summary,
        customer
      },
      media[]{
        alt,
        caption,
        credit,
        source,
        permission,
      rightsConfirmed,
        asset
      },
      publishedAt,
      seo{
        title,
        description,
        canonical,
        noIndex,
        socialImage{
          alt,
          asset
        }
      },
      order,
      approval
    }
  }`);
}

export function insightsPageQuery(draft: boolean) {
  const approvalFilter = editorialApprovalFilter(draft);

  return defineQuery(`{
    "siteSettings": *[_type == "siteSettings"${approvalFilter}][0]${approvedSiteSettingsProjection},
    "insights": *[_type == "insight"${approvalFilter}] | order(publishedAt desc, title asc) {
      _id,
      title,
      slug,
      excerpt,
      centralQuestion,
      keyTakeawaySummary,
      author->{
        _id,
        name,
        slug,
        role,
        bio,
        photo{
          alt,
          caption,
          credit,
          source,
          permission,
      rightsConfirmed,
          asset
        },
        profileLink{
          label,
          kind,
          internalRoute,
          externalUrl
        },
        approval
      },
      category->{
        _id,
        title,
        slug,
        description,
        displayOrder,
        approval
      },
      body,
      heroImage{
        alt,
        caption,
        credit,
        source,
        permission,
      rightsConfirmed,
        asset
      },
      sourceNotes,
      limitations,
      relatedProduct->{
        _id,
        name,
        slug,
        summary,
        accent
      },
      relatedService->{
        _id,
        title,
        slug,
        summary,
        customer
      },
      publishedAt,
      seo{
        title,
        description,
        canonical,
        noIndex,
        socialImage{
          alt,
          asset
        }
      },
      approval,
      _updatedAt
    },
    "categories": *[_type == "category"${approvalFilter}] | order(displayOrder asc, title asc) {
      _id,
      title,
      slug,
      description,
      displayOrder,
      approval
    },
    "authors": *[_type == "author"${approvalFilter}] | order(name asc) {
      _id,
      name,
      slug,
      role,
      bio,
      photo{
        alt,
        caption,
        credit,
        source,
        permission,
      rightsConfirmed,
        asset
      },
      profileLink{
        label,
        kind,
        internalRoute,
        externalUrl
      },
      approval
    }
  }`);
}

export function insightQuery(draft: boolean) {
  const approvalFilter = editorialApprovalFilter(draft);

  return defineQuery(`{
    "siteSettings": *[_type == "siteSettings"${approvalFilter}][0]${approvedSiteSettingsProjection},
    "insight": *[_type == "insight" && slug.current == $slug${approvalFilter}][0]{
      _id,
      title,
      slug,
      excerpt,
      centralQuestion,
      keyTakeawaySummary,
      author->{
        _id,
        name,
        slug,
        role,
        bio,
        photo{
          alt,
          caption,
          credit,
          source,
          permission,
      rightsConfirmed,
          asset
        },
        profileLink{
          label,
          kind,
          internalRoute,
          externalUrl
        },
        approval
      },
      category->{
        _id,
        title,
        slug,
        description,
        displayOrder,
        approval
      },
      body,
      heroImage{
        alt,
        caption,
        credit,
        source,
        permission,
      rightsConfirmed,
        asset
      },
      sourceNotes,
      limitations,
      relatedProduct->{
        _id,
        name,
        slug,
        summary,
        accent
      },
      relatedService->{
        _id,
        title,
        slug,
        summary,
        customer
      },
      publishedAt,
      seo{
        title,
        description,
        canonical,
        noIndex,
        socialImage{
          alt,
          asset
        }
      },
      approval,
      _updatedAt
    }
  }`);
}

export function homepageDataQuery(draft: boolean) {
  const approvalFilter = homepageApprovalFilter(draft);

  return defineQuery(`{
    "siteSettings": *[_type == "siteSettings"${approvalFilter}][0]{
      _id,
      companyName,
      description,
      socialLinks[]{label, kind, internalRoute, externalUrl},
      seo{
        title,
        description,
        canonical,
        noIndex,
        socialImage{
          alt,
          asset
        }
      }
    },
    "homepage": *[_type == "homepage"${approvalFilter}][0]{
      _id,
      heroEyebrow,
      heroTitle,
      heroBody,
      heroPrimaryCta{
        label,
        kind,
        internalRoute,
        externalUrl
      },
      heroSecondaryCta{
        label,
        kind,
        internalRoute,
        externalUrl
      },
      philosophyTitle,
      philosophyBody,
      seo{
        title,
        description,
        canonical,
        noIndex,
        socialImage{
          alt,
          asset
        }
      }
    },
    "product": *[_type == "product" && slug.current == "statstrike"${approvalFilter}][0]{
      _id,
      name,
      slug,
      summary,
      accent,
      heroMedia{
        alt,
        caption,
        credit,
        source,
        permission,
      rightsConfirmed,
        asset
      },
      cta{
        label,
        supportingCopy,
        placement,
        approved,
        link{
          label,
          kind,
          internalRoute,
          externalUrl
        }
      },
      seo{
        title,
        description,
        canonical,
        noIndex,
        socialImage{
          alt,
          asset
        }
      }
    },
    "partners": *[_type == "partner" && publicVisible == true && length(relationshipEvidence) > 1 && relationshipEvidence match "*"${approvalFilter}] | order(order asc, name asc)[0...8]{
      _id,
      name,
      relationshipWording
    },
    "metrics": *[_type == "metric" && approved == true${metricEvidenceFilter}${approvalFilter}] | order(displayOrder asc, label asc)[0...4]{
      _id,
      label,
      value,
      unit,
      evidenceNote
    },
    "testimonial": *[_type == "testimonial" && permission == true${testimonialEvidenceFilter}${approvalFilter}] | order(displayOrder asc, _createdAt desc)[0]{
      _id,
      quote,
      authorName,
      authorRole,
      organisation
    },
    "caseStudies": *[_type == "caseStudy"${approvalFilter}${caseEvidenceFilter(draft)}] | order(order asc, publishedAt desc, title asc)[0...1]{
      _id,
      title,
      slug,
      client,
      challenge,
      outcome
    },
    "insights": *[_type == "insight"${approvalFilter}] | order(publishedAt desc, title asc)[0...3]{
      _id,
      title,
      slug,
      excerpt,
      keyTakeawaySummary,
      publishedAt,
      category->{title}
    }
  }`);
}
