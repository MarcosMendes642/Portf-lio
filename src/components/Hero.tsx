import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { profile } from "../data";
import { scrollToId } from "../lib/useLenis";
import Roll from "./Roll";

gsap.registerPlugin(SplitText);

const CURRENT_YEAR = new Date().getFullYear();

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    let ctx: gsap.Context | null = null;
    let split: SplitText | null = null;
    let cancelled = false;

    // Espera as fontes carregarem: as linhas do SplitText são medidas
    // com a fonte final (evita quebra de linha torta em mobile).
    const run = () => {
      if (cancelled) return;

      ctx = gsap.context(() => {
        // Título: cada linha/word sobe de dentro da própria linha
        split = new SplitText(".hero__title", {
          type: "lines,words",
          linesClass: "hero__line",
          wordsClass: "hero__word",
        });

        const tl = gsap.timeline({ delay: 0.2 });
        tl.from(split.words, {
          yPercent: 120,
          duration: 1,
          ease: "expo.out",
          stagger: 0.025,
        })
          .from(
            "[data-hero-fade]",
            { y: 14, autoAlpha: 0, duration: 0.8, ease: "power3.out", stagger: 0.09 },
            0.35,
          )
          .from(
            ".hero__meta",
            { y: 10, autoAlpha: 0, duration: 0.8, ease: "power3.out" },
            0.6,
          );
      }, root);
    };

    if (document.fonts?.ready) {
      document.fonts.ready.then(run);
    } else {
      run();
    }

    return () => {
      cancelled = true;
      ctx?.revert();
      split?.revert();
    };
  }, []);

  const goContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    scrollToId("#contato");
  };

  return (
    <section className="hero" ref={root}>
      <div className="hero__inner">
        <p className="hero__eyebrow" data-hero-fade>
          {profile.role} — {profile.location}
        </p>

        <h1 className="hero__title">
         Crio aplicações full stack com alma, lógica sólida e um gosto por originalidade.
        </h1>

        <div className="hero__cta" data-hero-fade>
          <button
            className="btn btn--solid"
            type="button"
            onClick={() => scrollToId("#trabalhos")}
          >
            <Roll>Ver trabalhos</Roll>
          </button>
          <a className="btn btn--ghost" href="#contato" onClick={goContact}>
            <Roll>Contato</Roll>
          </a>
        </div>
      </div>

      <div className="hero__meta text-hud">
        <span>Portfolio:{CURRENT_YEAR}</span>
        <span>Scroll para explorar ↓</span>
      </div>
    </section>
  );
}
