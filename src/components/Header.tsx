import { useEffect, useState } from "react";
import { profile } from "../data";
import { scrollToId, scrollToTop } from "../lib/useLenis";
import LogoMark from "./Logo";
import Roll from "./Roll";

const nav = [
  { label: "Sobre", href: "#sobre" },
  { label: "Trabalhos", href: "#trabalhos" },
  { label: "Habilidades", href: "#habilidades" },
  { label: "Trajetória", href: "#trajetoria" },
  { label: "Contato", href: "#contato" },
];

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

  const onNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (e.currentTarget.hash) {
      scrollToId(e.currentTarget.hash);
    } else {
      scrollToTop();
    }
  };

  return (
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
            {nav.map((item) => (
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
        </div>
      </div>
    </header>
  );
}
