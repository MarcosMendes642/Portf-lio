import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { profile } from "../data";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".about .section-head",
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: "left",
          duration: 1,
          ease: "expo.out",
          immediateRender: false,
          scrollTrigger: { trigger: ".about", start: "top 88%", once: true },
        },
      );

      gsap.fromTo(
        ".about__para",
        { y: 24, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 1,
          ease: "power3.out",
          stagger: 0.12,
          immediateRender: false,
          scrollTrigger: { trigger: ".about__text", start: "top 88%", once: true },
        },
      );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section className="section container" id="sobre" ref={root}>
      <div className="about">
        <div className="section-head">
          <span className="section-head__index">04</span>
          <h2 className="section-head__title">Sobre</h2>
        </div>

        <div className="about__text">
          {profile.bio.map((paragraph, i) => (
            <p className="about__para" key={i}>
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
