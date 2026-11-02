import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SiGithub } from "react-icons/si";
import { projects } from "../data";
import LogoMark from "./Logo";

gsap.registerPlugin(ScrollTrigger);

const ArrowUpRight = (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M18.25 15.25V5.75M18.25 5.75H8.75M18.25 5.75L6 18"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ChevronLeft = (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M14.5 5.5L8 12l6.5 6.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ChevronRight = (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M9.5 5.5L16 12l-6.5 6.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
;

const pad = (n: number) => String(n).padStart(2, "0");

export default function Work() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLUListElement>(null);
  const [index, setIndex] = useState(0);
  const [scrollable, setScrollable] = useState(false);

  /** medida do passo de scroll = largura do 1º card + gap */
  const cardStep = useCallback(() => {
    const el = track.current;
    if (!el) return 0;
    const card = el.querySelector<HTMLElement>(".projects__item");
    if (!card) return 0;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    return card.getBoundingClientRect().width + gap;
  }, []);

  const syncState = useCallback(() => {
    const el = track.current;
    if (!el) return;
    setScrollable(el.scrollWidth > el.clientWidth + 4);
    const step = cardStep();
    setIndex(step ? Math.min(projects.length - 1, Math.max(0, Math.round(el.scrollLeft / step))) : 0);
  }, [cardStep]);

  // estado do contador/setas reage a scroll, resize e load de imagens
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    el.addEventListener("scroll", syncState, { passive: true });
    el.addEventListener("load", syncState, true); // imgs dentro do track
    window.addEventListener("resize", syncState);
    syncState();
    return () => {
      el.removeEventListener("scroll", syncState);
      el.removeEventListener("load", syncState, true);
      window.removeEventListener("resize", syncState);
    };
  }, [syncState]);

  // depois do paint (imagens/fontes podem mudar a largura) reavalia se há scroll
  useLayoutEffect(() => {
    const id = requestAnimationFrame(syncState);
    return () => cancelAnimationFrame(id);
  }, [syncState]);

  useLayoutEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".work-head",
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: "left",
          duration: 1,
          ease: "expo.out",
          immediateRender: false, // visível por padrão; anima quando o trigger dispara
          scrollTrigger: { trigger: ".work-head", start: "top 88%", once: true },
        },
      );

      gsap.fromTo(
        ".projects__track .projcard",
        { y: 26, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.09,
          immediateRender: false,
          scrollTrigger: { trigger: ".projects", start: "top 88%", once: true },
        },
      );
    }, root);

    return () => ctx.revert();
  }, []);

  const go = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    el.scrollBy({ left: dir * cardStep(), behavior: "smooth" });
  };

  const canPrev = scrollable && index > 0;
  const canNext = scrollable && index < projects.length - 1;

  return (
    <section className="section container" id="trabalhos" ref={root}>
      <div className="section-head work-head">
        <span className="section-head__index">01</span>
        <h2 className="section-head__title">Projetos</h2>
      </div>

      <div className="projects">
        {scrollable && (
          <div className="projects__bar">
            <span className="text-hud" aria-live="polite">
              {pad(index + 1)} / {pad(projects.length)}
            </span>

            <div className="projects__arrows">
              <button
                className="projects__arrow"
                type="button"
                onClick={() => go(-1)}
                disabled={!canPrev}
                aria-label="Projeto anterior"
              >
                {ChevronLeft}
              </button>
              <button
                className="projects__arrow"
                type="button"
                onClick={() => go(1)}
                disabled={!canNext}
                aria-label="Próximo projeto"
              >
                {ChevronRight}
              </button>
            </div>
          </div>
        )}

        <ul className="projects__track" ref={track} data-lenis-prevent>
          {projects.map((project, i) => (
            <li className="projects__item" key={`${project.name}-${i}`}>
              <article className="projcard">
                <div className="projcard__media">
                  {project.image ? (
                    <img className="projcard__img" src={project.image} alt={`Screenshot de ${project.name}`} loading="lazy" />
                  ) : (
                    <div className="projcard__ph" aria-hidden="true">
                      <LogoMark className="projcard__phlogo" />
                      <span className="text-hud">screenshot em breve</span>
                    </div>
                  )}
                </div>

                <div className="projcard__body">
                  <h3 className="projcard__title">{project.name}</h3>

                  <div className="projcard__tags">
                    <span className="row__tag text-hud">{project.meta}</span>
                    <span className="row__tag text-hud">{project.year}</span>
                  </div>

                  <div className="projcard__actions">
                    <a
                      className="btn btn--solid btn--sm"
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.name} — abrir site`}
                    >
                      Ver site {ArrowUpRight}
                    </a>

                    {project.repo && (
                      <a
                        className="btn btn--ghost btn--sm"
                        href={project.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${project.name} — repositório no GitHub`}
                      >
                        <SiGithub aria-hidden="true" /> GitHub
                      </a>
                    )}
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
