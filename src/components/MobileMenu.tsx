import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { navItems, profile, socials } from "../data";
import Roll from "./Roll";

type MobileMenuProps = {
  onNavigate: (href: string) => void;
  onClose: () => void;
};

/** Menu fullscreen mobile — itens grandes com indices HUD. */
export default function MobileMenu({ onNavigate, onClose }: MobileMenuProps) {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  useLayoutEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap
        .timeline()
        .fromTo(".drawer", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.25 }, 0)
        .from(
          ".drawer [data-drawer-item]",
          {
            y: 22,
            autoAlpha: 0,
            duration: 0.55,
            ease: "power3.out",
            stagger: 0.07,
          },
          0.08,
        );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      className="drawer"
      id="drawer"
      ref={root}
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
    >
      <div className="drawer__inner">
        <nav aria-label="Menu mobile">
          <ul className="drawer__list">
            {navItems.map((item, i) => (
              <li className="drawer__item" data-drawer-item key={item.href}>
                <a
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    onClose();
                    onNavigate(item.href);
                  }}
                >
                  <span className="drawer__index text-hud">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <Roll>{item.label}</Roll>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="drawer__foot" data-drawer-item>
          <a className="drawer__email" href={`mailto:${profile.email}`}>
            <Roll>{profile.email}</Roll>
          </a>

          <div className="drawer__socials text-hud">
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
          </div>
        </div>
      </div>
    </section>
  );
}
