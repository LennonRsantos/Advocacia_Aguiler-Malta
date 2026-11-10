// Adaptado do Circular Testimonials (21st.dev): estilos em Tailwind, next/image, teclado restrito ao carrossel.
"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image, { type StaticImageData } from "next/image";
import { useCallback, useEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";

export interface Testimonial {
  quote: string;
  name: string;
  designation: string;
  src: StaticImageData;
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

export function CircularTestimonials({ testimonials, autoplay = true }: CircularTestimonialsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [containerWidth, setContainerWidth] = useState(1200);
  const [paused, setPaused] = useState(false);
  const [stopped, setStopped] = useState(false);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const reduceMotion = useReducedMotion();

  const length = testimonials.length;
  const active = testimonials[activeIndex];

  useEffect(() => {
    const handleResize = () => {
      if (imageContainerRef.current) setContainerWidth(imageContainerRef.current.offsetWidth);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Para no hover/foco, após navegação manual e com movimento reduzido.
  const running = autoplay && !paused && !stopped && !reduceMotion;
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
    <div
      role="region"
      aria-roledescription="carrossel"
      aria-label="Advogadas do escritório"
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
      <div className="grid gap-20 md:grid-cols-2">
        <div ref={imageContainerRef} className="relative h-96 w-full perspective-[1000px]">
          {testimonials.map((t, index) => (
            <div
              key={t.name}
              aria-hidden={index !== activeIndex}
              className="absolute inset-0 overflow-hidden bg-espresso shadow-[0_10px_30px_rgba(0,0,0,0.2)]"
              style={getImageStyle(index)}
            >
              <Image
                src={t.src}
                alt={t.name}
                fill
                placeholder="blur"
                sizes="(min-width: 768px) 28rem, 100vw"
                className="object-cover filter-[sepia(0.22)_saturate(0.75)]"
              />
            </div>
          ))}
        </div>

        <div className="flex flex-col justify-between">
          <div aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <h3 className="mb-1 font-serif font-semibold text-[1.75rem] text-primary">{active.name}</h3>
                <p className="mb-8 text-sm font-medium tracking-wide text-bronze">{active.designation}</p>
                <p className="text-lg leading-[1.75] text-primary/85">
                  {active.quote.split(" ").map((word, i) => (
                    <motion.span
                      key={i}
                      initial={reduceMotion ? false : { filter: "blur(10px)", opacity: 0, y: 5 }}
                      animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
                      transition={{ duration: 0.22, ease: "easeInOut", delay: 0.025 * i }}
                      className="inline-block"
                    >
                      {word}&nbsp;
                    </motion.span>
                  ))}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="hidden gap-6 md:flex">
            {[
              { label: "Advogada anterior", onClick: handlePrev, Icon: ArrowLeft },
              { label: "Próxima advogada", onClick: handleNext, Icon: ArrowRight },
            ].map(({ label, onClick, Icon }) => (
              <button
                key={label}
                type="button"
                onClick={onClick}
                aria-label={label}
                className="flex size-11 cursor-pointer items-center justify-center rounded-full bg-primary text-base transition-colors duration-300 hover:bg-terracotta focus-visible:bg-terracotta focus-visible:outline-none"
              >
                <Icon aria-hidden="true" className="size-5" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
