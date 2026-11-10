"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { navItems } from "@/lib/site";
import { Logo } from "./Logo";

export function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#inicio");
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Destaca no menu a seção visível no centro da tela.
  useEffect(() => {
    const sections = navItems
      .map((item) => document.querySelector<HTMLElement>(item.href))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onResize = () => window.innerWidth >= 1024 && setOpen(false);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  return (
    <header className="on-dark fixed inset-x-0 top-0 z-50 border-b border-base/10 bg-espresso">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12">
        <a href="#inicio" className="-m-2 p-2 text-base" aria-label="Aguiler & Malta Advocacia, voltar ao início">
          <Logo tone="light" />
        </a>

        <nav aria-label="Navegação principal" className="hidden lg:block">
          <ul className="flex items-center gap-9">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  aria-current={active === item.href ? "location" : undefined}
                  className="group relative py-2 text-[0.8125rem] font-medium tracking-wide text-base/75 transition-colors duration-300 hover:text-base aria-[current]:text-base"
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-accent transition-transform duration-500 ease-soft group-hover:scale-x-100 group-aria-[current]:scale-x-100"
                  />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#contato"
            className="hidden min-h-11 items-center bg-base px-6 text-[0.8125rem] font-medium tracking-[0.06em] text-espresso transition-colors duration-300 hover:bg-accent active:bg-accent sm:inline-flex"
          >
            Fale Conosco
          </a>
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            className="-mr-2 inline-flex size-11 cursor-pointer items-center justify-center text-base lg:hidden"
          >
            {open ? <X aria-hidden="true" className="size-6" strokeWidth={1.5} /> : <Menu aria-hidden="true" className="size-6" strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      <div
        id="menu-mobile"
        hidden={!open}
        className="h-[calc(100dvh-4.5rem)] overflow-y-auto overscroll-contain bg-espresso lg:hidden"
      >
        <nav aria-label="Navegação principal (celular)" className="flex min-h-full flex-col px-5 pb-10 pt-6 sm:px-8">
          <ul className="flex flex-col">
            {navItems.map((item, i) => (
              <li key={item.href} className="animate-rise border-b border-base/10" style={{ animationDelay: `${i * 50}ms` }}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={active === item.href ? "location" : undefined}
                  className="flex items-center justify-between py-5 font-serif text-[1.75rem] leading-none text-base aria-[current]:text-accent"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#contato"
            onClick={() => setOpen(false)}
            className="mt-auto inline-flex min-h-12 items-center justify-center bg-base px-6 text-sm font-medium tracking-wide text-espresso transition-colors duration-300 active:bg-accent"
          >
            Fale Conosco
          </a>
        </nav>
      </div>
    </header>
  );
}
