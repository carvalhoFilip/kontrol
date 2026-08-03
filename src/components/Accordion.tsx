'use client';

import { useState, type ReactNode } from 'react';

export type AccordionItem = {
  id: string;
  title: string;
  content: ReactNode;
};

type Props = {
  items: AccordionItem[];
  className?: string;
};

export function Accordion({ items, className = '' }: Props) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className={`accordion ${className}`.trim()}>
      {items.map((item) => {
        const open = openId === item.id;
        return (
          <div key={item.id} className="accordion-item">
            <button
              type="button"
              className="accordion-trigger"
              aria-expanded={open}
              onClick={() => setOpenId(open ? null : item.id)}
            >
              <span>{item.title}</span>
              <span aria-hidden="true">{open ? '−' : '+'}</span>
            </button>
            {open && <div className="accordion-panel">{item.content}</div>}
          </div>
        );
      })}
    </div>
  );
}
