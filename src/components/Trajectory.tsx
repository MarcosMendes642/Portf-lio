import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { trajectory } from "../data";

gsap.registerPlugin(ScrollTrigger);

export default function Trajectory() {
  const root = useRef<HTMLElement>(null);
  // se o arquivo do logo não existir (ex.: antes do primeiro deploy), cai pro monograma
  const [logoBroken, setLogoBroken] = useState(false);

  useLayoutEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".trajectory-head",
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: "left",
          duration: 1,
          ease: "expo.out",
          immediateRender: false, // visível por padrão; anima quando o trigger dispara
          scrollTrigger: { trigger: ".trajectory-head", start: "top 88%", once: true },
        },
      );

      // CSN: o wordmark desce de dentro do próprio clip (padrão do hero)
      gsap.fromTo(
        ".traj-exp__company",
        { yPercent: 120 },
        {
          yPercent: 0,
          duration: 1.1,
          ease: "expo.out",
          immediateRender: false,
          scrollTrigger: { trigger: ".traj-exp", start: "top 85%", once: true },
        },
      );

      gsap.fromTo(
        ".traj-exp__rule",
        { scaleX: 0 },
        {
          scaleX: 1,
          transformOrigin: "left",
          duration: 1.1,
          ease: "expo.out",
          immediateRender: false,
          scrollTrigger: { trigger: ".traj-exp", start: "top 85%", once: true },
        },
      );

      gsap.fromTo(
        "[data-traj-fade]",
        { y: 18, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.08,
          immediateRender: false,
          scrollTrigger: { trigger: ".traj-exp", start: "top 85%", once: true },
        },
      );

      // formação: reveal sutil, sem roubar a cena
      gsap.fromTo(
        ".traj-rows .row",
        { y: 22, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
          immediateRender: false,
          scrollTrigger: { trigger: ".traj-rows", start: "top 90%", once: true },
        },
      );
    }, root);

    return () => ctx.revert();
  }, []);

  const exp = trajectory.find((e) => e.kind === "Experiência");
  const education = trajectory.filter((e) => e.kind !== "Experiência");

  if (!exp) return null;

  return (
    <section className="section container trajectory" id="trajetoria" ref={root}>
      <div className="section-head trajectory-head">
        <span className="section-head__index">03</span>
        <h2 className="section-head__title">Formação &amp; experiência</h2>
      </div>

      {/* ===== Experiência: destaque editorial ===== */}
      <article className="traj-exp">
        <div className="traj-exp__top">
          <div className="traj-exp__ident">
            <p className="traj-exp__eyebrow text-hud" data-traj-fade>
              {[exp.orgFull, exp.location].filter(Boolean).join(" — ")}
            </p>
            <div className="traj-exp__clip">
              <h3 className="traj-exp__company">{exp.org}</h3>
            </div>
          </div>

          <div className="traj-exp__side" data-traj-fade>
            {/* logo institucional (com fallback pro monograma tipográfico) */}
            <span className="traj-exp__mark" aria-hidden="true">
              {exp.logo && !logoBroken ? (
                <img
                  src={exp.logo}
                  alt=""
                  loading="lazy"
                  onError={() => setLogoBroken(true)}
                />
              ) : (
                exp.org
              )}
            </span>
            <span className="traj-exp__period text-hud">
              <strong>{exp.period}</strong>
            </span>
          </div>
        </div>

        {/* régua fina: entra animada, preenche no hover */}
        <div className="traj-exp__rule" aria-hidden="true" />

        <div className="traj-exp__grid">
          <div className="traj-exp__rolewrap" data-traj-fade>
            <p className="traj-exp__label text-hud">Cargo</p>
            <h4 className="traj-exp__role">{exp.title}</h4>
          </div>

          <div className="traj-exp__detail" data-traj-fade>
            <p className="traj-exp__desc">{exp.desc}</p>
            <div className="traj-exp__tags">
              {exp.tags.map((tag) => (
                <span className="row__tag text-hud" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </article>

      {/* ===== Formação: hierarquia menor ===== */}
      <p className="traj-label text-hud" data-traj-fade>
        Formação
      </p>

      <ul className="rows traj-rows">
        {education.map((entry) => (
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
