import { useState, useRef } from "react";
import gsap from "gsap";
import { Menu, X } from "lucide-react";
import { useGSAP } from "@gsap/react";
import logo from "../assets/logo.png";

const navItems = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

function NavLink({ item, isActive, onClick }) {
  const linkRef = useRef(null);
  const topRef = useRef(null);
  const botRef = useRef(null);
  const glowRef = useRef(null);
  const activeColor = "#00f0ff";

  useGSAP(() => {
    const link = linkRef.current;
    const top = topRef.current;
    const bot = botRef.current;
    const glow = glowRef.current;

    const enter = () => {
      gsap.to(top, { y: "-100%", duration: 0.35, ease: "power3.in" });
      gsap.to(bot, { y: "0%", duration: 0.35, ease: "power3.out", delay: 0.05 });
      gsap.to(glow, { opacity: 1, scale: 1, duration: 0.3, ease: "power2.out" });
      gsap.to(link, { y: -2, duration: 0.3, ease: "power2.out" });
    };

    const leave = () => {
      gsap.to(top, { y: "0%", duration: 0.35, ease: "power3.out" });
      gsap.to(bot, { y: "100%", duration: 0.35, ease: "power3.in" });
      gsap.to(glow, { opacity: 0, scale: 0.6, duration: 0.25 });
      gsap.to(link, { y: 0, duration: 0.4, ease: "elastic.out(1,0.5)" });
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
      onClick={(e) => { e.preventDefault(); onClick(item.href); }}
      className="relative px-3 py-1.5 overflow-hidden inline-block"
    >
      <span ref={glowRef} className="pointer-events-none absolute inset-0 rounded-lg opacity-0 scale-60" style={{ background: `radial-gradient(ellipse at center, ${activeColor}1e 0%, transparent 70%)` }} />
      {isActive && <span className="absolute inset-0 rounded-lg bg-white/7 border border-white/10" />}
      <span className="relative block overflow-hidden h-[1.2em] leading-[1.2em]">
        <span ref={topRef} className="block text-sm font-medium tracking-wide" style={{ color: isActive ? "var(--text-primary)" : "var(--text-muted)" }}>{item.label}</span>
        <span ref={botRef} aria-hidden="true" className="absolute inset-0 block text-sm font-medium tracking-wide translate-y-full" style={{ color: activeColor, textShadow: `0 0 12px ${activeColor}e6` }}>{item.label}</span>
      </span>
      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-px transition-all duration-300 ease-out" style={{ width: isActive ? "70%" : "0%", background: `linear-gradient(90deg, transparent, ${activeColor}, transparent)`, boxShadow: `0 0 6px ${activeColor}cc` }} />
    </a>
  );
}

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const hireBtnRef = useRef(null);
  const logoRef = useRef(null);
  const burgerRef = useRef(null);

  useGSAP(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
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

  useGSAP(() => {
    const tl = gsap.timeline({ delay: 0.5, defaults: { ease: "expo.out" } });
    tl.fromTo(logoRef.current, { x: -10, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8 })
      .fromTo(burgerRef.current, { x: 30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8 }, 0)
      .fromTo(navRef.current.querySelectorAll(".nav-link-wrap"), { y: -24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.07, ease: "back.out(1.6)" }, 0.25)
      .fromTo(hireBtnRef.current, { x: 24, opacity: 0, scale: 0.8 }, { x: 0, opacity: 1, scale: 1, duration: 0.6, ease: "back.out(2)" }, 0.4);
  }, []);

  if (isMobileMenuOpen && mobileMenuRef.current) {
    gsap.fromTo(mobileMenuRef.current, { opacity: 0, y: -10, scale: 0.98 }, { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: "power2.out" });
  }

  const scrollToSection = (href) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav ref={navRef} className="fixed top-0 left-0 w-full z-50 transition-all duration-500" style={{ padding: isScrolled ? "0.75rem 0" : "1rem 0", background: isScrolled ? "rgba(10, 12, 20, 0.85)" : "transparent", borderBottom: isScrolled ? "1px solid rgba(255,255,255,0.08)" : "1px solid transparent", backdropFilter: isScrolled ? "blur(40px)" : "none" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <a ref={logoRef} href="#hero" onClick={(e) => { e.preventDefault(); scrollToSection("#hero"); }} className="flex items-center group transition-transform duration-300 hover:scale-105" style={{ opacity: 0 }}>
              <img src={logo} alt="Samir Ibourki Logo" className="h-10 md:h-13 w-auto object-contain drop-shadow-[0_0_8px_rgba(0,212,255,0.3)]" />
            </a>
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <div key={item.href} className="nav-link-wrap" style={{ opacity: 0 }}>
                  <NavLink item={item} isActive={activeSection === item.href.slice(1)} onClick={scrollToSection} />
                </div>
              ))}
            </div>
            <div className="hidden md:flex items-center gap-3">
              <div style={{ opacity: 0 }} ref={hireBtnRef}>
                <a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection("#contact"); }} className="relative overflow-hidden inline-flex items-center gap-1.5 px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 group bg-cyan-500/10 border border-cyan-500/40 text-white">
                  <span className="relative z-10">Hire Me</span>
                  <span className="relative z-10 w-1.5 h-1.5 rounded-full animate-pulse bg-cyan-400 shadow-[0_0_6px_#00f0ff]" />
                </a>
              </div>
            </div>
            <div className="md:hidden flex items-center gap-2">
              <button ref={burgerRef} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="w-9 h-9 rounded-xl glass flex items-center justify-center border border-white/10" style={{ opacity: 0 }}>
                {isMobileMenuOpen ? <X className="w-5 h-5 text-accent-primary" /> : <Menu className="w-5 h-5 text-white/70" />}
              </button>
            </div>
          </div>
        </div>
      </nav>
      {isMobileMenuOpen && (
        <div ref={mobileMenuRef} className="fixed inset-x-4 top-[74px] z-40 md:hidden bg-cyber-dark/95 backdrop-blur-3xl rounded-2xl p-3 border border-white/10 shadow-2xl">
          <div className="space-y-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.slice(1);
              return (
                <a key={item.href} href={item.href} onClick={(e) => { e.preventDefault(); scrollToSection(item.href); }} className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors duration-200 ${isActive ? "bg-white/8 text-white" : "text-white/40"}`}>
                  <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${isActive ? "bg-cyan-400 shadow-[0_0_6px_#00f0ff]" : "bg-white/20"}`} />
                  {item.label}
                </a>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};
