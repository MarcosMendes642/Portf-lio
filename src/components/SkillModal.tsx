import type { CSSProperties } from "react";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { getLenis } from "../lib/useLenis";
import type { Skill } from "../data";

export type ActiveSkill = {
  skill: Skill;
  rect: DOMRect;
};

type SkillModalProps = {
  data: ActiveSkill;
  onClose: () => void;
};

/** Modal "lightbox" que voa do card clicado até o centro da tela. */
export default function SkillModal({ data, onClose }: SkillModalProps) {
  const { skill, rect } = data;
  const overlay = useRef<HTMLDivElement>(null);
  const card = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const closing = useRef(false);

  const reduced = () =>
    matchMedia("(prefers-reduced-motion: reduce)").matches;

  useLayoutEffect(() => {
    const overlayEl = overlay.current;
    const cardEl = card.current;
    if (!overlayEl || !cardEl) return;

    const lenis = getLenis();
    lenis?.stop();
    document.body.style.overflow = "hidden";
    closeBtn.current?.focus();

    const openTl = (() => {
      if (!reduced()) return null;
      return gsap
        .timeline()
        .fromTo(overlayEl, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.2 })
        .fromTo(
          cardEl.querySelectorAll("[data-modal-fade]"),
          { autoAlpha: 0, y: 10 },
          { autoAlpha: 1, y: 0, duration: 0.3, stagger: 0.05 },
          "0",
        );
    })();

    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") close();
    };

    if (openTl) {
      window.addEventListener("keydown", onKey);
      // cleanup imediato para o caso reduced-motion
      return () => {
        window.removeEventListener("keydown", onKey);
        document.body.style.overflow = "";
        lenis?.start();
        openTl.kill();
      };
    }

    // FLIP: mede o card final, posiciona sobre o card clicado e "vai" até o centro
    const m = cardEl.getBoundingClientRect();
    gsap.set(cardEl, {
      transformOrigin: "0% 0%",
      x: rect.left - m.left,
      y: rect.top - m.top,
      scaleX: rect.width / m.width,
      scaleY: rect.height / m.height,
    });

    const tl = gsap
      .timeline()
      .fromTo(overlayEl, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.25 }, 0)
      .to(
        cardEl,
        {
          x: 0,
          y: 0,
          scaleX: 1,
          scaleY: 1,
          duration: 0.55,
          ease: "expo.inOut",
        },
        0,
      )
      .from(
        cardEl.querySelectorAll("[data-modal-fade]"),
        { autoAlpha: 0, y: 14, duration: 0.4, stagger: 0.06 },
        0.25,
      );

    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      lenis?.start();
      tl.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** Fecha "voando" de volta para o card de origem. */
  const close = () => {
    if (closing.current) return;
    closing.current = true;

    const overlayEl = overlay.current;
    const cardEl = card.current;
    if (!overlayEl || !cardEl || reduced()) {
      onClose();
      return;
    }

    // card está sem transform (identidade), então o rect atual é o layout final
    const m = cardEl.getBoundingClientRect();
    gsap
      .timeline({ onComplete: onClose })
      .to(
        cardEl,
        {
          x: rect.left - m.left,
          y: rect.top - m.top,
          scaleX: rect.width / m.width,
          scaleY: rect.height / m.height,
          duration: 0.45,
          ease: "expo.inOut",
        },
        0,
      )
      .to(overlayEl, { autoAlpha: 0, duration: 0.25 }, 0.15);
  };

  const Icon = skill.icon;

  return (
    <div
      className="skillmodal"
      ref={overlay}
      data-skill-modal=""
      onClick={(e) => e.target === e.currentTarget && close()}
      style={{ "--skill-color": skill.color } as CSSProperties}
    >
      <div
        className="skillmodal__card"
        ref={card}
        role="dialog"
        aria-modal="true"
        aria-label={skill.name}
      >
        <header className="skillmodal__head">
          <span className="text-hud">
            SKILL:<strong>{skill.name}</strong>
          </span>
          <button
            className="skillmodal__close"
            ref={closeBtn}
            type="button"
            aria-label="Fechar"
            onClick={close}
          >
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </header>

        <div className="skillmodal__body">
          <div className="skillmodal__iconrow" data-modal-fade>
            <span className="skillmodal__iconwrap">
              <Icon className="skillmodal__icon" aria-hidden="true" />
            </span>
          </div>

          <p className="skillmodal__desc" data-modal-fade>
            {skill.description}
          </p>

          <div className="skillmodal__topics" data-modal-fade>
            {skill.topics.map((topic) => (
              <span className="skillmodal__topic text-hud" key={topic}>
                {topic}
              </span>
            ))}
          </div>
        </div>

        <footer className="skillmodal__foot text-hud" data-modal-fade>
          <span>
            DESDE:<strong>{skill.since}</strong>
          </span>
          {skill.category && (
            <span>
              ÁREA:<strong>{skill.category}</strong>
            </span>
          )}
        </footer>
      </div>
    </div>
  );
}
