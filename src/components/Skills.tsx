import type {
  CSSProperties,
  KeyboardEvent as ReactKeyboardEvent,
  PointerEvent as ReactPointerEvent,
} from "react";
import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { skills, type Skill } from "../data";
import SkillModal, { type ActiveSkill } from "./SkillModal";

gsap.registerPlugin(ScrollTrigger);

function SkillCard({
  skill,
  onOpen,
}: {
  skill: Skill;
  onOpen: (skill: Skill, el: HTMLElement) => void;
}) {
  const card = useRef<HTMLElement>(null);
  const tilt = useRef<{
    rotationY: (v: number) => void;
    rotationX: (v: number) => void;
  } | null>(null);

  const initTilt = () => {
    if (tilt.current || !card.current) return;
    tilt.current = {
      rotationY: gsap.quickTo(card.current, "rotationY", {
        duration: 0.6,
        ease: "power3.out",
      }),
      rotationX: gsap.quickTo(card.current, "rotationX", {
        duration: 0.6,
        ease: "power3.out",
      }),
    };
  };

  const onMove = (e: ReactPointerEvent<HTMLElement>) => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    initTilt();
    const el = card.current;
    if (!el || !tilt.current) return;
    const r = el.getBoundingClientRect();
    tilt.current.rotationY(((e.clientX - r.left) / r.width - 0.5) * 12);
    tilt.current.rotationX((0.5 - (e.clientY - r.top) / r.height) * 12);
  };

  const onLeave = () => {
    tilt.current?.rotationY(0);
    tilt.current?.rotationX(0);
  };

  const open = () => {
    const el = card.current;
    if (el) onOpen(skill, el);
  };

  const onKeyDown = (e: ReactKeyboardEvent<HTMLElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      open();
    }
  };

  const Icon = skill.icon;

  return (
    <article
      className="skill"
      ref={card}
      style={
        {
          "--skill-color": skill.color,
          "--icon-scale": skill.opticalScale ?? 1,
        } as CSSProperties
      }
      title={skill.name}
      role="button"
      tabIndex={0}
      aria-haspopup="dialog"
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      onClick={open}
      onKeyDown={onKeyDown}
    >
      <Icon className="skill__icon" aria-hidden="true" />
      <span className="skill__name text-hud">{skill.name}</span>
    </article>
  );
}

export default function Skills() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState<ActiveSkill | null>(null);

  useLayoutEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".skills .section-head",
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: "left",
          duration: 1,
          ease: "expo.out",
          immediateRender: false,
          scrollTrigger: { trigger: ".skills", start: "top 88%", once: true },
        },
      );

      // todos os cards entram em cascata, de uma vez
      gsap.fromTo(
        ".skills__grid .skill",
        { y: 22, autoAlpha: 0, scale: 0.92 },
        {
          y: 0,
          autoAlpha: 1,
          scale: 1,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.06,
          immediateRender: false,
          scrollTrigger: { trigger: ".skills__grid", start: "top 88%", once: true },
        },
      );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section className="section container skills" id="habilidades" ref={root}>
      <div className="section-head skills-head">
        <span className="section-head__index">02</span>
        <h2 className="section-head__title">Minhas Habilidades</h2>
      </div>

      <div className="skills__grid">
        {skills.map((skill) => (
          <SkillCard
            key={skill.name}
            skill={skill}
            onOpen={(skill, el) =>
              setActive({ skill, rect: el.getBoundingClientRect() })
            }
          />
        ))}
      </div>

      {active && (
        <SkillModal data={active} onClose={() => setActive(null)} />
      )}
    </section>
  );
}
