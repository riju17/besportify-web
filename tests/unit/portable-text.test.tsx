import { render, screen } from '@testing-library/react';
import { createElement } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { PortableTextRenderer } from '@/components/content/portable-text';

describe('PortableTextRenderer', () => {
  it('logs unsupported block types without breaking rendering', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);

    render(
      createElement(PortableTextRenderer, {
        value: [
          {
            _type: 'block',
            style: 'normal',
            children: [{ _type: 'span', text: 'Approved block' }],
          },
          {
            _type: 'unsupportedThing',
            value: 'Unknown block',
          },
        ] as never,
      }),
    );

    expect(screen.getByText('Approved block')).toBeInTheDocument();
    expect(warn).toHaveBeenCalled();
    warn.mockRestore();
  });
});
