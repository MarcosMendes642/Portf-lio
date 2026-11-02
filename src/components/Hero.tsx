import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { scrollToId } from "../lib/useLenis";
import Roll from "./Roll";

// Linhas do título fixadas manualmente (componsem a marcação da referência:
// 1º verso com régua fina à direita, 2º verso com onda no início).
// Cada verso continua quebrável em telas estreitas — nada é cortado.
const TITLE_LINES: string[][] = [
  ["Desenvolvedor", "Full Stack"],
  ["Construindo","experiências", "digitais"],
  
];

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    let ctx: gsap.Context | null = null;
    let cancelled = false;

    // Espera as fontes carregarem: as linhas do título são medidas
    // com a fonte final (evita quebra de linha torta em mobile).
    const run = () => {
      if (cancelled) return;

      ctx = gsap.context(() => {
        const tl = gsap.timeline({ delay: 0.2 });
        // cada palavra anima DENTRO do próprio .hero__clip (overflow: clip),
        // então linhas que quebram em 2+ rows no mobile não vazam umas nas outras
        tl.from(".hero__word", {
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
            ".hero__rule",
            { scaleX: 0, transformOrigin: "left center", duration: 1, ease: "expo.out" },
            0.55,
          )
          .from(
            ".hero__wave",
            { autoAlpha: 0, x: -10, duration: 0.7, ease: "power3.out" },
            0.65,
          )
          .from(
            ".hero__meta",
            { y: 10, autoAlpha: 0, duration: 0.8, ease: "power3.out" },
            0.7,
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
          Marcos Mendes
        </p>

        <h1 className="hero__title">
          {TITLE_LINES.map((words, i) => (
            <span
              key={i}
              className={`hero__line${i === 0 ? " hero__line--rule" : i === 1 ? " hero__line--wave" : ""}`}
            >
              {i === 1 && (
                <svg
                  className="hero__wave"
                  viewBox="0 0 54 18"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M2 12C7 3.5 13 3.5 18 10c5 6.5 11 6.5 16 0 5-6.5 11-6.5 16 0"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>
              )}
              {words.map((word, j) => (
                // clip por palavra: o GSAP anima o word de dentro do clip
                // (sem depender do overflow da linha, que quebra em 2+ rows no mobile)
                <span className="hero__clip" key={j}>
                  <span className="hero__word">{word}</span>
                </span>
              ))}
              {i === 0 && <span className="hero__rule" aria-hidden="true" />}
            </span>
          ))}
        </h1>

        <div className="hero__cta" data-hero-fade>
          <button
            className="btn btn--solid"
            type="button"
            onClick={() => scrollToId("#trabalhos")}
          >
            <Roll>Ver projetos</Roll>
          </button>
          <a className="btn btn--ghost" href="#contato" onClick={goContact}>
            <Roll>Contato</Roll>
          </a>
        </div>
      </div>

      <div className="hero__meta text-hud">
        <span>Scroll para explorar ↓</span>
      </div>
    </section>
  );
}
