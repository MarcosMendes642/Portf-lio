import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { trajectory } from "../data";

gsap.registerPlugin(ScrollTrigger);

export default function Trajectory() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      gsap.from(".trajectory .section-head", {
        scaleY: 0,
        transformOrigin: "left",
        duration: 1,
        ease: "expo.out",
        scrollTrigger: { trigger: ".trajectory", start: "top 88%", once: true },
      });

      gsap.from(".trajectory .row", {
        y: 26,
        autoAlpha: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: { trigger: ".trajectory .rows", start: "top 85%", once: true },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section className="section container trajectory" id="trajetoria" ref={root}>
      <div className="section-head">
        <span className="section-head__index">03</span>
        <h2 className="section-head__title">Formação &amp; experiência</h2>
      </div>

      <ul className="rows">
        {trajectory.map((entry) => (
          <li key={`${entry.kind}-${entry.title}`}>
            <div className="row row--static">
              <div className="traj__main">
                <span className="row__label traj__title">{entry.title}</span>
                <p className="traj__desc">{entry.desc}</p>
              </div>
              <span className="row__line" aria-hidden="true" />
              <span className="row__tags">
                {entry.period && (
                  <span className="text-hud row__tag">{entry.period}</span>
                )}
                {entry.tags.map((tag) => (
                  <span className="text-hud row__tag" key={tag}>
                    {tag}
                  </span>
                ))}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
