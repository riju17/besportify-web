import { render, screen } from '@testing-library/react';
import { createElement } from 'react';
import { describe, expect, it } from 'vitest';
import { MediaFrame } from '@/components/ui/media-frame';

describe('MediaFrame', () => {
  it('shows a fallback when no media is provided', () => {
    render(createElement(MediaFrame, { title: 'Demo' }));

    expect(screen.getByText(/product overview/i)).toBeInTheDocument();
    expect(screen.getByText('Demo')).toBeInTheDocument();
  });
});
