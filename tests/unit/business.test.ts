import { describe, expect, it } from 'vitest';
import { resolveBusinessDetails } from '@/lib/business';

describe('resolveBusinessDetails', () => {
  it('uses the approved public email when no CMS or environment email is configured', () => {
    const details = resolveBusinessDetails(null);

    expect(details.supportEmail).toBe('besportifyindia@gmail.com');
    expect(details.privacyEmail).toBe('besportifyindia@gmail.com');
  });
});
