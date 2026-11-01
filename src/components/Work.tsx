import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "../data";

gsap.registerPlugin(ScrollTrigger);

const ArrowIcon = (
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

export default function Work() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      gsap.from(".rows .row", {
        y: 28,
        autoAlpha: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: { trigger: ".rows", start: "top 85%", once: true },
      });

      gsap.from(".work-head", {
        scaleY: 0,
        transformOrigin: "left",
        duration: 1,
        ease: "expo.out",
        scrollTrigger: { trigger: ".work-head", start: "top 88%", once: true },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section className="section container" id="trabalhos" ref={root}>
      <div className="section-head work-head">
        <span className="section-head__index">01</span>
        <h2 className="section-head__title">Projetos</h2>
      </div>

      <ul className="rows">
        {projects.map((project) => (
          <li key={project.name}>
            <a
              className="row"
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="row__label">{project.name}</span>
              <span className="row__line" aria-hidden="true" />
              <span className="row__tags">
                <span className="text-hud row__tag">{project.meta}</span>
                <span className="text-hud row__tag">{project.year}</span>
              </span>
              <span className="row__go" aria-hidden="true">
                {ArrowIcon}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
