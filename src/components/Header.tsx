import { useEffect, useState } from "react";
import { navItems, profile } from "../data";
import { getLenis, scrollToId, scrollToTop } from "../lib/useLenis";
import LogoMark from "./Logo";
import MobileMenu from "./MobileMenu";
import Roll from "./Roll";

/** Destaca no nav a seção visível (scroll-spy por posição do viewport). */
function useActiveSection() {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const ids = [...new Set(navItems.map((item) => item.href.replace(/^#/, "")))];
    let raf = 0;

    const update = () => {
      raf = 0;
      const line = window.innerHeight * 0.42;
      let current = "";

      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }

      // fundo de página: última seção vira ativa
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 4
      ) {
        current = ids[ids.length - 1];
      }

      setActiveId(current);
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return activeId;
}

const MoonIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const SunIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="4.6" stroke="currentColor" strokeWidth="1.6" />
    <path
      d="M12 1.8v2.2M12 20v2.2M4.2 4.2l1.6 1.6M18.2 18.2l1.6 1.6M1.8 12h2.2M20 12h2.2M4.2 19.8l1.6-1.6M18.2 5.8l1.6-1.6"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  </svg>
);

function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">(
    () => (document.documentElement.dataset.theme as "light" | "dark") || "dark",
  );

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem("theme", theme);
    } catch {
      /* noop */
    }
  }, [theme]);

  return (
    <button
      className="themetoggle"
      type="button"
      aria-label={`Alternar para tema ${theme === "dark" ? "claro" : "escuro"}`}
      title={theme === "dark" ? "Tema claro" : "Tema escuro"}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? <MoonIcon /> : <SunIcon />}
    </button>
  );
}

export default function Header() {
  const activeId = useActiveSection();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // estado "rolado" para dar fundo ao header (legibilidade sobre o conteúdo)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // trava o scroll enquanto o menu está aberto
  useEffect(() => {
    const lenis = getLenis();
    if (menuOpen) {
      lenis?.stop();
      document.body.style.overflow = "hidden";
    } else {
      lenis?.start();
      document.body.style.overflow = "";
    }
  }, [menuOpen]);

  const onNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (e.currentTarget.hash) {
      scrollToId(e.currentTarget.hash);
    } else {
      scrollToTop();
    }
  };

  /** Navegação a partir do drawer: fecha depois rola. */
  const onMenuNavigate = (href: string) => {
    setTimeout(() => scrollToId(href), 80);
  };

  return (
    <>
      <header className={`header${scrolled ? " is-scrolled" : ""}`}>
        <div className="header__bar">
          <a className="logo" href="#" onClick={onNavClick} aria-label="Início">
            <LogoMark className="logo__mark" />
            <span className="visually-hidden">{profile.name}</span>
          </a>

          <nav className="navpill" aria-label="Principal">
            <ul className="navpill__list">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    className={`navpill__link${activeId === item.href.replace(/^#/, "") ? " is-active" : ""}`}
                    href={item.href}
                    onClick={onNavClick}
                    aria-current={activeId === item.href.replace(/^#/, "") ? "true" : undefined}
                  >
                    <Roll>{item.label}</Roll>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <button
            className={menuOpen ? "navtrigger is-open" : "navtrigger"}
            type="button"
            aria-label="Menu"
            aria-expanded={menuOpen}
            aria-controls="drawer"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span className="navtrigger__bars" aria-hidden="true" />
          </button>
        </div>
      </header>

      {/* fixo no canto inferior direito, fora do header (garante o clique) */}
      <ThemeToggle />

      {menuOpen && (
        <MobileMenu onClose={() => setMenuOpen(false)} onNavigate={onMenuNavigate} />
      )}
    </>
  );
}
