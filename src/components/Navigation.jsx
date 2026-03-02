import { useState, useRef } from "react";
import gsap from "gsap";
import { Menu, X } from "lucide-react";
import { useGSAP } from "@gsap/react";
import logo from "../assets/logo.png";

const navItems = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

function NavLink({ item, isActive, onClick }) {
  const linkRef = useRef(null);
  const topRef = useRef(null);
  const botRef = useRef(null);
  const glowRef = useRef(null);

  useGSAP(() => {
    const link = linkRef.current;
    const top = topRef.current;
    const bot = botRef.current;
    const glow = glowRef.current;

    const enter = () => {
      gsap.to(top, {
        y: "-100%",
        duration: 0.35,
        ease: "power3.in",
      });

      gsap.to(bot, {
        y: "0%",
        duration: 0.35,
        ease: "power3.out",
        delay: 0.05,
      });

      gsap.to(glow, {
        opacity: 1,
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });

      gsap.to(link, {
        y: -2,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const leave = () => {
      gsap.to(top, {
        y: "0%",
        duration: 0.35,
        ease: "power3.out",
      });
      gsap.to(bot, {
        y: "100%",
        duration: 0.35,
        ease: "power3.in",
      });
      gsap.to(glow, {
        opacity: 0,
        scale: 0.6,
        duration: 0.25,
      });
      gsap.to(link, {
        y: 0,
        duration: 0.4,
        ease: "elastic.out(1,0.5)",
      });
    };

    link.addEventListener("mouseenter", enter);
    link.addEventListener("mouseleave", leave);
    return () => {
      link.removeEventListener("mouseenter", enter);
      link.removeEventListener("mouseleave", leave);
    };
  }, []);

  return (
    <a
      ref={linkRef}
      href={item.href}
      onClick={(e) => {
        e.preventDefault();
        onClick(item.href);
      }}
      data-cursor-hover
      className="relative px-3 py-1.5 overflow-hidden"
      style={{ display: "inline-block" }}
    >
      {/* ambient glow behind the text */}
      <span
        ref={glowRef}
        className="pointer-events-none absolute inset-0 rounded-lg"
        style={{
          background: isActive
            ? "radial-gradient(ellipse at center, rgba(0,240,255,0.18) 0%, transparent 70%)"
            : "radial-gradient(ellipse at center, rgba(0,240,255,0.12) 0%, transparent 70%)",
          opacity: isActive ? 1 : 0,
          scale: isActive ? 1 : 0.6,
        }}
      />

      {/* active pill */}
      {isActive && (
        <span className="absolute inset-0 rounded-lg bg-white/[0.07] border border-white/10" />
      )}

      {/* text wrapper — clips the sliding labels */}
      <span
        className="relative block overflow-hidden"
        style={{ height: "1.2em", lineHeight: "1.2em" }}
      >
        {/* TOP label (visible by default) */}
        <span
          ref={topRef}
          className="block text-sm font-medium tracking-wide"
          style={{
            color: isActive ? "#fff" : "rgba(255,255,255,0.5)",
            willChange: "transform",
          }}
        >
          {item.label}
        </span>

        {/* BOTTOM label (cyan, slides up on hover) */}
        <span
          ref={botRef}
          aria-hidden="true"
          className="absolute inset-0 block text-sm font-medium tracking-wide"
          style={{
            color: "#00f0ff",
            textShadow: "0 0 12px rgba(0,240,255,0.9)",
            transform: "translateY(100%)",
            willChange: "transform",
          }}
        >
          {item.label}
        </span>
      </span>

      {/* bottom line */}
      <span
        className="absolute bottom-0 left-1/2 -translate-x-1/2 h-px
                   transition-all duration-300 ease-out
                   group-hover:w-4/5"
        style={{
          width: isActive ? "70%" : "0%",
          background:
            "linear-gradient(90deg, transparent, #00f0ff, transparent)",
          boxShadow: "0 0 6px rgba(0,240,255,0.8)",
        }}
      />
    </a>
  );
}

/* main navigation*/
export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const hireBtnRef = useRef(null);
  const logoRef = useRef(null);
  const burgerRef = useRef(null);

  /* ── scroll detection ── */
  useGSAP(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
      const sections = navItems.map((i) => i.href.slice(1));
      for (const section of [...sections].reverse()) {
        const el = document.getElementById(section);
        if (el && el.getBoundingClientRect().top <= window.innerHeight / 2) {
          setActiveSection(section);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ── entrance animation ── */
  useGSAP(() => {
    const tl = gsap.timeline({ delay: 1.2, defaults: { ease: "expo.out" } });

    tl.fromTo(
      logoRef.current,
      { x: -10, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.1 },
    )
      .fromTo(
        burgerRef.current,
        { x: 30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8 },
        0,
      )
      .fromTo(
        navRef.current.querySelectorAll(".nav-link-wrap"),
        { y: -24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.07,
          ease: "back.out(1.6)",
        },
        0.25,
      )
      .fromTo(
        hireBtnRef.current,
        { x: 24, opacity: 0, scale: 0.8 },
        { x: 0, opacity: 1, scale: 1, duration: 0.6, ease: "back.out(2)" },
        0.4,
      );
  }, []);

  /* hire-me  */
  useGSAP(() => {
    const btn = hireBtnRef.current;
    if (!btn) return;

    const onMove = (e) => {
      const r = btn.getBoundingClientRect();
      gsap.to(btn, {
        x: (e.clientX - r.left - r.width / 2) * 0.36,
        y: (e.clientY - r.top - r.height / 2) * 0.36,
        duration: 0.3,
        ease: "power2.out",
      });
    };
    const onLeave = () =>
      gsap.to(btn, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.5)" });

    btn.addEventListener("mousemove", onMove);
    btn.addEventListener("mouseleave", onLeave);
    return () => {
      btn.removeEventListener("mousemove", onMove);
      btn.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  /* ─ mobile menu animation  */
  useGSAP(() => {
    if (!mobileMenuRef.current) return;
    if (isMobileMenuOpen) {
      gsap.fromTo(
        mobileMenuRef.current,
        { opacity: 0, y: -16, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: "expo.out" },
      );
      gsap.fromTo(
        mobileMenuRef.current.querySelectorAll(".mob-item"),
        { opacity: 0, x: -14 },
        { opacity: 1, x: 0, duration: 0.3, stagger: 0.055, delay: 0.1 },
      );
    }
  }, [isMobileMenuOpen]);

  const scrollToSection = (href) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* navBAr */}
      <nav
        ref={navRef}
        className={` z-50 transition-all duration-500 ${
          isScrolled ? "py-3 glass-strong" : "py-2 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/*logo*/}
            <a
              ref={logoRef}
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("#hero");
              }}
              className="flex items-center group transition-transform duration-300 hover:scale-105"
              data-cursor-hover
              style={{ opacity: 0 }}
            >
              <img
                src={logo}
                alt="Samir Ibourki Logo"
                className="h-13 md:h-19 w-auto object-contain drop-shadow-[0_0_8px_rgba(0,212,255,0.3)]"
              />
            </a>

            {/* desktop nav*/}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <div
                  key={item.href}
                  className="nav-link-wrap"
                  style={{ opacity: 0 }}
                >
                  <NavLink
                    item={item}
                    isActive={activeSection === item.href.slice(1)}
                    onClick={scrollToSection}
                  />
                </div>
              ))}
            </div>

            {/*hire me*/}
            <div
              className="hidden md:block"
              style={{ opacity: 0 }}
              ref={hireBtnRef}
            >
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("#contact");
                }}
                data-cursor-hover
                className="relative overflow-hidden inline-flex items-center gap-1.5
                           px-5 py-2 rounded-full text-sm font-medium text-white
                           border border-cyan-400/40 bg-cyan-400/6
                           transition-[border-color,background] duration-300
                           hover:border-cyan-400/80 hover:bg-cyan-400/12
                           group will-change-transform"
              >
                {/* moving shimmer */}
                <span
                  className="absolute inset-0 rounded-full
                             bg-linear-to-rrom-transparent via-cyan-400/10 to-transparent
                             -translate-x-full group-hover:translate-x-full
                             transition-transform duration-700 ease-in-out"
                />
                <span className="relative z-10">Hire Me</span>
                {/* dot that pulses */}
                <span
                  className="relative z-10 w-1.5 h-1.5 rounded-full bg-cyan-400
                             shadow-[0_0_6px_rgba(0,240,255,1)]
                             animate-pulse"
                />
              </a>
            </div>

            {/* ── BURGER ── */}
            <button
              ref={burgerRef}
              onClick={() => setIsMobileMenuOpen((o) => !o)}
              className="md:hidden w-9 h-9 rounded-xl glass-card flex items-center justify-center"
              data-cursor-hover
              style={{ opacity: 0 }}
            >
              {isMobileMenuOpen ? (
                <X className="w-4 h-4 text-cyan-400" />
              ) : (
                <Menu className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* mobile menu*/}
      {isMobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="fixed inset-x-4 top-18 z-40 md:hidden"
          style={{ opacity: 0 }}
        >
          <div
            className="glass-strong rounded-2xl p-3 space-y-1
                       border border-white/8"
          >
            {navItems.map((item) => {
              const isActive = activeSection === item.href.slice(1);
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.href);
                  }}
                  className={`mob-item flex items-center gap-3 px-4 py-3 rounded-xl
                               text-sm font-medium transition-colors duration-200 ${
                                 isActive
                                   ? "bg-white/8 text-white"
                                   : "text-white/50 hover:text-white hover:bg-white/5"
                               }`}
                >
                  {/* colored dot */}
                  <span
                    className="w-1.5 h-1.5 rounded-full shrink-0 transition-colors duration-300"
                    style={{
                      background: isActive
                        ? "#00f0ff"
                        : "rgba(255,255,255,0.2)",
                      boxShadow: isActive
                        ? "0 0 6px rgba(0,240,255,0.9)"
                        : "none",
                    }}
                  />
                  {item.label}
                </a>
              );
            })}

            {/* mobile hire me */}
            <div className="mob-item pt-2 mt-1 border-t border-white/[0.07]">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("#contact");
                }}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl
                           text-sm font-medium text-cyan-950
                           bg-linear-to-r from-cyan-400 to-cyan-300
                           hover:from-cyan-300 hover:to-cyan-200 transition-all duration-300"
              >
                Hire Me
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-900 opacity-60" />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
