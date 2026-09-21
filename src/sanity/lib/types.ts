export type ApprovalStatus = 'draft' | 'needs-review' | 'approved' | 'rejected';
export type CapabilityStatus = 'live' | 'beta' | 'planned' | 'internal';

export type LinkValue =
  | {
      kind: 'internal';
      internalRoute: string;
      externalUrl?: never;
      label?: string;
    }
  | {
      kind: 'external';
      externalUrl: string;
      internalRoute?: never;
      label?: string;
    };

export type SanityImageValue = {
  asset?: unknown;
  alt: string;
  caption?: string;
  credit?: string;
  source?: string;
  permission?: string;
  rightsConfirmed?: boolean;
};
