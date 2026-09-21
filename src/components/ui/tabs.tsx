'use client';

import { useId, useState } from 'react';
import { cx } from '@/lib/utils';

export type TabItem = {
  title: string;
  content: string;
};

type TabsProps = {
  items: TabItem[];
};

export function Tabs({ items }: TabsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const baseId = useId();

  return (
    <div className="space-y-4">
      <div
        aria-label="Tabbed content"
        role="tablist"
        className="flex flex-wrap gap-2"
      >
        {items.map((item, index) => {
          const selected = index === activeIndex;
          return (
            <button
              aria-controls={`${baseId}-panel-${index}`}
              aria-selected={selected}
              className={cx(
                'rounded-full border px-4 py-2 font-mono text-xs font-semibold tracking-wider transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 motion-reduce:transition-none cursor-pointer',
                selected
                  ? 'border-blue-500 bg-blue-500/15 text-blue-500 shadow-[0_0_16px_rgba(237,28,36,0.22)]'
                  : 'border-slate-700/80 bg-slate-800/60 text-grey-300 hover:border-slate-600 hover:text-white-100',
              )}
              id={`${baseId}-tab-${index}`}
              key={item.title}
              tabIndex={selected ? 0 : -1}
              onKeyDown={(event) => {
                const next =
                  event.key === 'ArrowRight'
                    ? (index + 1) % items.length
                    : event.key === 'ArrowLeft'
                      ? (index - 1 + items.length) % items.length
                      : event.key === 'Home'
                        ? 0
                        : event.key === 'End'
                          ? items.length - 1
                          : null;
                if (next === null) return;
                event.preventDefault();
                setActiveIndex(next);
                document.getElementById(`${baseId}-tab-${next}`)?.focus();
              }}
              onClick={() => setActiveIndex(index)}
              role="tab"
              type="button"
            >
              {item.title}
            </button>
          );
        })}
      </div>
      {items.map((item, index) => {
        const selected = index === activeIndex;
        return (
          <div
            aria-labelledby={`${baseId}-tab-${index}`}
            hidden={!selected}
            id={`${baseId}-panel-${index}`}
            key={item.title}
            role="tabpanel"
            tabIndex={0}
          >
            <p className="max-w-2xl text-sm leading-6 text-grey-300">
              {item.content}
            </p>
          </div>
        );
      })}
    </div>
  );
}
