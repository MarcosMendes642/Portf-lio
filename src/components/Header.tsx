import { useEffect, useState } from "react";
import { navItems, profile } from "../data";
import { getLenis, scrollToId, scrollToTop } from "../lib/useLenis";
import LogoMark from "./Logo";
import MobileMenu from "./MobileMenu";
import Roll from "./Roll";

function useClock() {
  const [time, setTime] = useState("--:--");
  useEffect(() => {
    const tick = () =>
      setTime(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    tick();
    const id = setInterval(tick, 10_000);
    return () => clearInterval(id);
  }, []);
  return time;
}

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
    <div className="themetoggle" role="group" aria-label="Tema">
      <button
        className="themetoggle__seg"
        type="button"
        aria-label="Tema claro"
        aria-pressed={theme === "light"}
        onClick={() => setTheme("light")}
      >
        ○
      </button>
      <button
        className="themetoggle__seg"
        type="button"
        aria-label="Tema escuro"
        aria-pressed={theme === "dark"}
        onClick={() => setTheme("dark")}
      >
        ●
      </button>
    </div>
  );
}

export default function Header() {
  const time = useClock();
  const [menuOpen, setMenuOpen] = useState(false);

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

  /** Navegação a partir do drawer: fecha depois rola (Lenis já retomado). */
  const onMenuNavigate = (href: string) => {
    setTimeout(() => scrollToId(href), 80);
  };

  return (
    <>
      <header className="header">
        {/* HUD — leitura técnica no topo (relógio, status) */}
        <div className="hud" aria-hidden="true">
          <span className="text-hud">
            {profile.timezoneLabel}:<strong>{time}</strong>
          </span>
          <span className="text-hud">
            STATUS:<strong>ONLINE</strong>
          </span>
        </div>

        <div className="header__bar">
          <a className="logo" href="#" onClick={onNavClick} aria-label="Início">
            <LogoMark className="logo__mark" />
            <span className="visually-hidden">{profile.name}</span>
          </a>

          <nav className="navpill" aria-label="Principal">
            <ul className="navpill__list">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a className="navpill__link" href={item.href} onClick={onNavClick}>
                    <Roll>{item.label}</Roll>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="header__actions">
            <ThemeToggle />
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
        </div>
      </header>

      {menuOpen && (
        <MobileMenu onClose={() => setMenuOpen(false)} onNavigate={onMenuNavigate} />
      )}
    </>
  );
}
