import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowDown, Sparkles } from "lucide-react";

export const Hero = () => {
  const containerRef = useRef(null);
  const pillRef = useRef(null);
  const headlineRef = useRef(null);
  const subheadRef = useRef(null);
  const descRef = useRef(null);
  const ctaRef = useRef(null);
  const chipsRef = useRef(null);
  const scrollHintRef = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      tl.fromTo(
        containerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.1 },
      )
        .fromTo(
          pillRef.current,
          { y: 14, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          "-=0.6",
        )
        .fromTo(
          headlineRef.current,
          { y: 42, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.95 },
          "-=0.25",
        )
        .fromTo(
          subheadRef.current,
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.65, ease: "power3.out" },
          "-=0.55",
        )
        .fromTo(
          descRef.current,
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.65, ease: "power3.out" },
          "-=0.5",
        )
        .fromTo(
          ctaRef.current,
          { y: 18, opacity: 0, scale: 0.98 },
          { y: 0, opacity: 1, scale: 1, duration: 0.65, ease: "back.out(1.8)" },
          "-=0.45",
        )
        .fromTo(
          chipsRef.current?.children || [],
          { y: 12, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.06,
            ease: "power2.out",
          },
          "-=0.4",
        )
        .fromTo(
          scrollHintRef.current,
          { y: 10, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
          "-=0.35",
        );

      gsap.to(scrollHintRef.current, {
        y: 8,
        duration: 1.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 0.2,
      });
    },
    { scope: containerRef },
  );

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden bg-cyber-dark pt-20 md:pt-24"
    >
      {/* Glows */}
      <div className="absolute inset-0 z-0">
        <div className="absolute -top-10 -left-10 w-72 h-72 bg-neon-blue/15 rounded-full blur-[120px] animate-pulse-glow" />
        <div
          className="absolute bottom-0 right-0 w-96 h-96 bg-neon-magenta/15 rounded-full blur-[140px] animate-pulse-glow"
          style={{ animationDelay: "1s" }}
        />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-size-[40px_40px] mask-[radial-gradient(ellipse_60%_50%_at_50%_50%,#000_65%,transparent_100%)]" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <div
            ref={pillRef}
            className="mx-auto w-fit inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-[11px] font-mono tracking-[0.25em] uppercase text-white/70"
          >
            <Sparkles className="w-3.5 h-3.5 text-neon-cyan" />
            Full‑Stack Developer — Web & Mobile
          </div>

          <h1
            ref={headlineRef}
            className="mt-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.02] tracking-tight"
          >
            <span className="block text-white">Samir Ibourki</span>
            <span className="block gradient-text">
              Building products end‑to‑end
            </span>
          </h1>

          <h2
            ref={subheadRef}
            className="mt-5 text-sm sm:text-base md:text-lg text-white/70"
          >
            I develop modern web apps, mobile apps, and backend systems — fast,
            clean, and scalable.
          </h2>

          <p
            ref={descRef}
            className="mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed"
          >
            From React interfaces to React Native experiences, with Node.js APIs
            and PostgreSQL behind the scenes.
          </p>

          <div
            ref={ctaRef}
            className="mt-8 flex flex-wrap justify-center gap-4"
          >
            <a
              href="#projects"
              onClick={(e) => scrollToSection(e, "#projects")}
              className="px-7 py-3.5 rounded-full gradient-border text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-white hover:scale-[1.03] transition-transform"
            >
              View projects
            </a>
            <button
              type="button"
              onClick={(e) => scrollToSection(e, "#about")}
              className="px-6 py-3 rounded-full glass border border-white/10 text-xs sm:text-sm font-medium text-white/80 hover:text-white hover:bg-white/5 transition-all"
            >
              About me
            </button>
          </div>

          <div
            ref={chipsRef}
            className="mt-8 flex flex-wrap justify-center gap-2 text-[11px]"
          >
            {[
              "React.js",
              "Node.js",
              "React Native",
              "Express",
              "PostgreSQL",
            ].map((t) => (
              <span
                key={t}
                className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/60"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
