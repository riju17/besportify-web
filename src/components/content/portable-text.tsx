import type { ReactNode } from 'react';
import { InlineLink } from '@/components/ui/link';
import { isSafeHref } from '@/lib/content-safety';

type PortableTextMarkDef = {
  _key: string;
  _type: 'link';
  href?: string;
};

type PortableTextSpan = {
  _type: 'span';
  text: string;
  marks?: string[];
};

type PortableTextBaseBlock = {
  _type: 'block';
  style?: 'normal' | 'h2' | 'h3' | 'blockquote';
  children: PortableTextSpan[];
  markDefs?: PortableTextMarkDef[];
  listItem?: never;
  level?: never;
};

type PortableTextListBlock = {
  _type: 'block';
  style?: 'normal';
  children: PortableTextSpan[];
  markDefs?: PortableTextMarkDef[];
  listItem: 'bullet' | 'number';
  level?: number;
};

type PortableTextUnknownBlock = {
  _type: string;
  [key: string]: unknown;
};

export type PortableTextBlock =
  PortableTextBaseBlock | PortableTextListBlock | PortableTextUnknownBlock;

export type PortableTextValue = PortableTextBlock[];

type PortableTextRendererProps = {
  value: PortableTextValue;
};

function isRenderableBlock(
  block: PortableTextBlock,
): block is PortableTextBaseBlock | PortableTextListBlock {
  return (
    block._type === 'block' &&
    Array.isArray((block as { children?: unknown }).children)
  );
}

function isListBlock(block: PortableTextBlock): block is PortableTextListBlock {
  return isRenderableBlock(block) && typeof block.listItem === 'string';
}

function renderMarks(
  children: PortableTextSpan[],
  markDefs: PortableTextMarkDef[] = [],
) {
  const markLookup = new Map(
    markDefs.map((mark) => [mark._key, mark] as const),
  );

  return children.map((span, index) => {
    let content: ReactNode = span.text;

    for (const mark of span.marks ?? []) {
      if (mark === 'strong') {
        content = (
          <strong className="font-semibold text-white-100">{content}</strong>
        );
        continue;
      }

      if (mark === 'em') {
        content = <em className="italic text-white-100">{content}</em>;
        continue;
      }

      const markDef = markLookup.get(mark);
      if (
        markDef?._type === 'link' &&
        typeof markDef.href === 'string' &&
        isSafeHref(markDef.href)
      ) {
        const external = /^https?:\/\//.test(markDef.href);
        content = (
          <InlineLink href={markDef.href} external={external}>
            {content}
          </InlineLink>
        );
      }
    }

    return <span key={`${index}-${span.text}`}>{content}</span>;
  });
}

function renderBlock(
  block: PortableTextBaseBlock | PortableTextListBlock,
  index: number,
) {
  const children = renderMarks(block.children, block.markDefs);

  switch (block.style) {
    case 'h2':
      return (
        <h2
          key={`block-${index}`}
          className="text-2xl font-semibold tracking-tight text-white-100 sm:text-3xl"
        >
          {children}
        </h2>
      );
    case 'h3':
      return (
        <h3
          key={`block-${index}`}
          className="text-xl font-semibold tracking-tight text-white-100"
        >
          {children}
        </h3>
      );
    case 'blockquote':
      return (
        <blockquote
          key={`block-${index}`}
          className="border-l-2 border-blue-500/40 pl-5 text-lg leading-8 text-white-100"
        >
          {children}
        </blockquote>
      );
    default:
      return (
        <p key={`block-${index}`} className="text-base leading-8 text-grey-300">
          {children}
        </p>
      );
  }
}

function renderListGroup(
  blocks: PortableTextListBlock[],
  startIndex: number,
): ReactNode {
  const ordered = blocks[0]?.listItem === 'number';
  const ListTag = ordered ? 'ol' : 'ul';

  return (
    <ListTag
      key={`list-${startIndex}`}
      className="space-y-3 pl-5 text-base leading-8 text-grey-300"
    >
      {blocks.map((block, index) => (
        <li key={`list-item-${startIndex + index}`} className="pl-1">
          {renderMarks(block.children, block.markDefs)}
        </li>
      ))}
    </ListTag>
  );
}

export function PortableTextRenderer({ value }: PortableTextRendererProps) {
  const nodes: ReactNode[] = [];

  for (let index = 0; index < value.length; index += 1) {
    const block = value[index];

    if (!isRenderableBlock(block)) {
      if (process.env.NODE_ENV !== 'production') {
        console.warn('PortableText warning', 'Unsupported block type', block);
      }
      continue;
    }

    if (isListBlock(block)) {
      const group = [block];
      let cursor = index + 1;

      while (cursor < value.length) {
        const nextBlock = value[cursor];

        if (
          !isListBlock(nextBlock) ||
          nextBlock.listItem !== block.listItem ||
          nextBlock.level !== block.level
        ) {
          break;
        }

        group.push(nextBlock);
        cursor += 1;
      }

      nodes.push(renderListGroup(group, index));
      index = cursor - 1;
      continue;
    }

    nodes.push(renderBlock(block, index));
  }

  return <div className="space-y-6">{nodes}</div>;
}
