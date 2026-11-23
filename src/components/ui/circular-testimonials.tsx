// Adaptado do Circular Testimonials (21st.dev): estilos em Tailwind, next/image, teclado restrito ao carrossel.
"use client";

import { AnimatePresence, LazyMotion, m, useReducedMotion } from "framer-motion";
import Image, { type StaticImageData } from "next/image";
import { useCallback, useEffect, useId, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";

export interface Testimonial {
  quote: string;
  name: string;
  designation: string;
  src: StaticImageData;
  /** CSS object-position, ex. "50% 15%" para não cortar a cabeça. */
  position?: string;
}

interface CircularTestimonialsProps {
  testimonials: Testimonial[];
  autoplay?: boolean;
}

function calculateGap(width: number) {
  const minWidth = 1024;
  const maxWidth = 1456;
  const minGap = 60;
  const maxGap = 86;
  if (width <= minWidth) return minGap;
  if (width >= maxWidth) return Math.max(minGap, maxGap + 0.06018 * (width - maxWidth));
  return minGap + (maxGap - minGap) * ((width - minWidth) / (maxWidth - minWidth));
}

const transition = "all 0.8s cubic-bezier(.4,2,.3,1)";
const loadFeatures = () => import("@/lib/motion-features").then((r) => r.default);

export function CircularTestimonials({ testimonials, autoplay = true }: CircularTestimonialsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [containerWidth, setContainerWidth] = useState(1200);
  const [paused, setPaused] = useState(false);
  const [stopped, setStopped] = useState(false);
  const [visible, setVisible] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const hintId = useId();
  const touchStartX = useRef<number | null>(null);
  const reduceMotion = useReducedMotion();

  const length = testimonials.length;
  const active = testimonials[activeIndex];

  // ResizeObserver entrega a largura sem forçar layout síncrono (offsetWidth forçava reflow).
  useEffect(() => {
    const el = imageContainerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setContainerWidth(entry.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Autoplay só com o carrossel na tela: evita trabalho na main thread fora da vista.
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Para no hover/foco, após navegação manual, fora da tela e com movimento reduzido.
  const running = autoplay && visible && !paused && !stopped && !reduceMotion;
  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setActiveIndex((prev) => (prev + 1) % length), 5000);
    return () => clearInterval(id);
  }, [running, length]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % length);
    setStopped(true);
  }, [length]);
  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + length) % length);
    setStopped(true);
  }, [length]);

  const handleKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") handlePrev();
    if (e.key === "ArrowRight") handleNext();
  };

  function getImageStyle(index: number): CSSProperties {
    const gap = calculateGap(containerWidth);
    const maxStickUp = gap * 0.8;
    if (index === activeIndex) {
      return { zIndex: 3, opacity: 1, transform: "translateX(0px) translateY(0px) scale(1) rotateY(0deg)", transition };
    }
    if ((activeIndex - 1 + length) % length === index) {
      return {
        zIndex: 2,
        opacity: 1,
        transform: `translateX(-${gap}px) translateY(-${maxStickUp}px) scale(0.85) rotateY(15deg)`,
        transition,
      };
    }
    if ((activeIndex + 1) % length === index) {
      return {
        zIndex: 2,
        opacity: 1,
        transform: `translateX(${gap}px) translateY(-${maxStickUp}px) scale(0.85) rotateY(-15deg)`,
        transition,
      };
    }
    return { zIndex: 1, opacity: 0, transition };
  }

  return (
    <LazyMotion features={loadFeatures} strict>
    <div
      ref={rootRef}
      role="region"
      aria-roledescription="carrossel"
      aria-label="Advogadas do escritório"
      aria-describedby={hintId}
      tabIndex={0}
      onKeyDown={handleKey}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onTouchStart={(e) => (touchStartX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchStartX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchStartX.current;
        touchStartX.current = null;
        if (Math.abs(dx) > 50) (dx < 0 ? handleNext : handlePrev)();
      }}
      className="touch-pan-y w-full max-w-4xl outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-8 focus-visible:ring-offset-sand"
    >
      <p id={hintId} className="sr-only">
        Use as setas esquerda e direita do teclado para ver as outras advogadas.
      </p>
      <div className="grid gap-20 md:grid-cols-2">
        <div ref={imageContainerRef} className="relative h-96 w-full perspective-[1000px]">
          {testimonials.map((t, index) => {
            const isPrev = index !== activeIndex && index === (activeIndex - 1 + length) % length;
            const isNext = index !== activeIndex && index === (activeIndex + 1) % length;
            return (
            <div
              key={t.name}
              aria-hidden={index !== activeIndex}
              onPointerUp={(e) => {
                if (e.pointerType !== "mouse") return; // celular segue só com swipe
                if (isPrev) handlePrev();
                else if (isNext) handleNext();
              }}
              className={`absolute inset-0 overflow-hidden bg-espresso shadow-[0_10px_30px_rgba(0,0,0,0.2)] ${isPrev || isNext ? "cursor-pointer" : ""}`}
              style={getImageStyle(index)}
            >
              <Image
                src={t.src}
                alt={t.name}
                fill
                placeholder="blur"
                quality={90}
                style={{ objectPosition: t.position }}
                sizes="(min-width: 768px) 26rem, 90vw"
                className="object-cover filter-[sepia(0.22)_saturate(0.75)]"
              />
            </div>
            );
          })}
        </div>

        <div className="flex flex-col justify-center">
          <div aria-live="polite">
            <AnimatePresence mode="wait" initial={false}>
              <m.div
                key={activeIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <h3 className="mb-1 font-serif font-semibold text-[1.75rem] text-primary">{active.name}</h3>
                <p className="mb-8 text-sm font-medium tracking-wide text-bronze">{active.designation}</p>
                <m.p
                  initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
                  className="text-lg leading-[1.75] text-primary/85"
                >
                  {active.quote}
                </m.p>
              </m.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
    </LazyMotion>
  );
}
