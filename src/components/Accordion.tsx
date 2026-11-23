"use client";

import { Plus } from "lucide-react";
import { useId, useState, type ReactNode } from "react";

type Item = { question: string; answer: ReactNode };

export function Accordion({
  items,
  dark = false,
  defaultOpen = 0,
}: {
  items: Item[];
  dark?: boolean;
  defaultOpen?: number | null;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpen);
  const baseId = useId();
  const border = dark ? "border-base/15" : "border-primary/15";

  return (
    <div className={`border-t ${border}`}>
      {items.map((item, i) => {
        const open = openIndex === i;
        const buttonId = `${baseId}-q${i}`;
        const panelId = `${baseId}-a${i}`;
        return (
          <div key={item.question} className={`border-b ${border}`}>
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenIndex(open ? null : i)}
                className="group flex w-full cursor-pointer items-start justify-between gap-6 py-6 text-left sm:py-7"
              >
                <span
                  className={`font-serif text-xl leading-snug transition-colors duration-300 sm:text-[1.375rem] ${
                    dark ? "text-white group-hover:text-accent" : "text-primary group-hover:text-terracotta"
                  }`}
                >
                  {item.question}
                </span>
                <span
                  aria-hidden="true"
                  className={`mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full border transition-[transform,background-color,border-color] duration-500 ease-soft ${
                    dark
                      ? open
                        ? "rotate-45 border-accent bg-accent text-primary"
                        : "border-base/30 text-white group-hover:border-accent"
                      : open
                        ? "rotate-45 border-primary bg-primary text-base"
                        : "border-primary/30 text-primary group-hover:border-primary"
                  }`}
                >
                  <Plus className="size-4" strokeWidth={1.5} />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              inert={!open}
              className={`grid transition-[grid-template-rows,opacity] duration-500 ease-soft ${
                open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <div
                  className={`max-w-2xl space-y-3 pb-7 sm:pr-14 leading-relaxed ${dark ? "text-base/80" : "text-primary/80"}`}
                >
                  {item.answer}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
