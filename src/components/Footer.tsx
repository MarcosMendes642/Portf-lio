import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { profile, socials } from "../data";
import Roll from "./Roll";

gsap.registerPlugin(ScrollTrigger);

const CURRENT_YEAR = new Date().getFullYear();

export default function Footer() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".footer__hello, .footer__title, .footer__email",
        { y: 30, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 1,
          ease: "power3.out",
          stagger: 0.1,
          immediateRender: false,
          scrollTrigger: { trigger: ".footer__cta", start: "top 88%", once: true },
        },
      );

      // leve parallax no bloco do CTA conforme o rodapé entra
      gsap.to(".footer__cta", {
        yPercent: 6,
        ease: "none",
        scrollTrigger: {
          trigger: ".footer",
          start: "top bottom",
          end: "bottom bottom",
          scrub: true,
        },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <footer className="footer" id="contato" ref={root}>
      <div className="container footer__cta">
        <p className="footer__hello">DISPONÍVEL PARA OPORTUNIDADES</p>

        <h2 className="footer__title">Vamos construir algo juntos.</h2>

        <a className="footer__email" href={`mailto:${profile.email}`}>
          <Roll>{profile.email}</Roll>
        </a>
      </div>

      <div className="container footer__bottom text-hud">
        <span>
          © {CURRENT_YEAR} {profile.name} — Todos os direitos
        </span>

        <span className="footer__socials">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Roll>{social.label}</Roll>
            </a>
          ))}
        </span>

        <span>Feito com Vite + GSAP</span>
      </div>
    </footer>
  );
}
