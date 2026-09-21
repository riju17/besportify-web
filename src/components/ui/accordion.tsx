'use client';

import { useId, useState } from 'react';
import { cx } from '@/lib/utils';

export type AccordionItem = {
  title: string;
  content: string;
};

type AccordionProps = {
  items: AccordionItem[];
  allowMultiple?: boolean;
};

export function Accordion({ items, allowMultiple = false }: AccordionProps) {
  const baseId = useId();
  const [openItems, setOpenItems] = useState<number[]>([0]);

  function toggle(index: number) {
    setOpenItems((current) => {
      if (allowMultiple) {
        return current.includes(index)
          ? current.filter((item) => item !== index)
          : [...current, index];
      }

      return current.includes(index) ? [] : [index];
    });
  }

  return (
    <div className="space-y-3">
      {items.map((item, index) => {
        const open = openItems.includes(index);
        const buttonId = `${baseId}-button-${index}`;
        const panelId = `${baseId}-panel-${index}`;

        return (
          <div
            key={item.title}
            className="overflow-hidden rounded-[1rem] border border-slate-700/70 bg-slate-800/60 backdrop-blur-xl transition-colors duration-300 hover:border-slate-600/80"
          >
            <h3>
              <button
                aria-controls={panelId}
                aria-expanded={open}
                className={cx(
                  'flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-base font-semibold text-white-100 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 cursor-pointer select-none',
                  'motion-reduce:transition-none',
                )}
                id={buttonId}
                onClick={() => toggle(index)}
                type="button"
              >
                <span>{item.title}</span>
                <span
                  aria-hidden="true"
                  className={cx(
                    'flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-slate-700 bg-slate-800/80 text-sm font-bold text-grey-300 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]',
                    open && 'rotate-180 border-blue-500/50 text-blue-500',
                  )}
                >
                  {open ? '−' : '+'}
                </span>
              </button>
            </h3>
            <div
              hidden={!open}
              aria-labelledby={buttonId}
              className={cx(
                'grid transition-[grid-template-rows] duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none',
                open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
              )}
              id={panelId}
              role="region"
            >
              <div className="overflow-hidden px-5 pb-5">
                <p className="text-sm leading-6 text-grey-300">
                  {item.content}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
