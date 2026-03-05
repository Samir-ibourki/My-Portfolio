import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Sparkles, Zap } from "lucide-react";
import { SKILLS, SKILL_CATEGORIES } from "../utils/skillsData";

gsap.registerPlugin(ScrollTrigger);

export const Skills = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const orbsRef = useRef(null);
  const chartRef = useRef(null);
  const cardsRef = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
      });

      tl.fromTo(
        headerRef.current?.children || [],
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.12,
          ease: "expo.out",
        },
      )
        .fromTo(
          ".skill-orb",
          { opacity: 0, scale: 0.8 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            stagger: 0.08,
            ease: "power3.out",
          },
          "-=0.2",
        )
        .fromTo(
          ".radar-grid",
          { opacity: 0 },
          { opacity: 0.4, duration: 0.6, ease: "power2.out" },
          "-=0.3",
        )
        .fromTo(
          ".radar-fill",
          { opacity: 0, scale: 0.7, transformOrigin: "center center" },
          { opacity: 0.35, scale: 1, duration: 0.7, ease: "power3.out" },
          "-=0.4",
        )
        .fromTo(
          ".radar-point",
          { opacity: 0, scale: 0 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            stagger: 0.08,
            ease: "back.out(1.7)",
          },
          "-=0.4",
        )
        .fromTo(
          cardsRef.current?.children || [],
          { opacity: 0, y: 26, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            stagger: 0.05,
            ease: "power3.out",
          },
          "-=0.25",
        );

      if (orbsRef.current) {
        gsap.to(orbsRef.current.querySelectorAll(".skill-orb-inner"), {
          y: 10,
          duration: 2.4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          stagger: { each: 0.15, from: "random" },
        });
      }
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative py-20 md:py-16 overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-10 left-1/3 w-72 h-72 rounded-full bg-neon-blue/15 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-neon-magenta/10 blur-[140px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* header */}
        <div ref={headerRef} className="text-center mb-14">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-4 h-4 text-neon-cyan" />
            <span className="text-xs font-mono text-muted-foreground tracking-wider uppercase">
              Skills & Stack
            </span>
            <Sparkles className="w-4 h-4 text-neon-magenta" />
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3">
            <span className="gradient-text">What I use everyday</span>
          </h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
            From frontend and mobile to backend, databases and DevOps — a
            compact toolset for shipping full‑stack products.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center mb-14">
          <div
            ref={orbsRef}
            className="relative h-[340px] sm:h-[380px] md:h-[420px] hidden lg:block"
          >
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="w-20 h-20 rounded-full glass-card flex items-center justify-center">
                <Zap className="w-10 h-10 text-neon-cyan" />
              </div>
            </div>

            {SKILLS.slice(0, 6).map((skill, idx) => {
              const angle = (idx / 6) * Math.PI * 2;
              const radius = 120 + (idx % 2) * 40;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius * 0.7;
              return (
                <div
                  key={skill.name}
                  className="skill-orb absolute left-1/2 top-1/2"
                  style={{
                    transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                  }}
                >
                  <div className="skill-orb-inner relative w-16 h-16 rounded-full glass-card flex items-center justify-center overflow-hidden border border-white/10">
                    <div
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: `radial-gradient(circle, ${skill.color}36 0%, transparent 70%)`,
                      }}
                    />
                    <img
                      src={skill.iconUrl}
                      alt={skill.name}
                      className="relative z-10 w-8 h-8 object-contain"
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="relative flex items-center justify-center">
            <svg
              ref={chartRef}
              viewBox="0 0 200 200"
              className="w-full max-w-[340px] h-auto"
            >
              {[25, 50, 75, 100].map((radius) => (
                <polygon
                  key={radius}
                  className="radar-grid"
                  points={SKILL_CATEGORIES.map((_, i) => {
                    const angle =
                      (i * 2 * Math.PI) / SKILL_CATEGORIES.length -
                      Math.PI / 2;
                    const x = 100 + radius * 0.7 * Math.cos(angle);
                    const y = 100 + radius * 0.7 * Math.sin(angle);
                    return `${x},${y}`;
                  }).join(" ")}
                  fill="none"
                  stroke="rgba(255,255,255,0.12)"
                  strokeWidth="0.6"
                />
              ))}

              {SKILL_CATEGORIES.map((_, i) => {
                const angle =
                  (i * 2 * Math.PI) / SKILL_CATEGORIES.length - Math.PI / 2;
                const x = 100 + 80 * Math.cos(angle);
                const y = 100 + 80 * Math.sin(angle);
                return (
                  <line
                    key={i}
                    x1="100"
                    y1="100"
                    x2={x}
                    y2={y}
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="0.5"
                  />
                );
              })}

              <polygon
                className="radar-fill"
                points={SKILL_CATEGORIES.map((cat, i) => {
                  const angle =
                    (i * 2 * Math.PI) / SKILL_CATEGORIES.length - Math.PI / 2;
                  const inCat = SKILLS.filter((s) => s.category === cat);
                  const avg =
                    inCat.reduce((sum, s) => sum + s.level, 0) /
                    (inCat.length || 1);
                  const r = (avg / 100) * 80;
                  const x = 100 + r * Math.cos(angle);
                  const y = 100 + r * Math.sin(angle);
                  return `${x},${y}`;
                }).join(" ")}
                fill="url(#radarGradient)"
                stroke="#00d4ff"
                strokeWidth="2"
                opacity="0.3"
              />

              {SKILL_CATEGORIES.map((cat, i) => {
                const angle =
                  (i * 2 * Math.PI) / SKILL_CATEGORIES.length - Math.PI / 2;
                const inCat = SKILLS.filter((s) => s.category === cat);
                const avg =
                  inCat.reduce((sum, s) => sum + s.level, 0) /
                  (inCat.length || 1);
                const r = (avg / 100) * 80;
                const x = 100 + r * Math.cos(angle);
                const y = 100 + r * Math.sin(angle);
                return (
                  <circle
                    key={cat}
                    className="radar-point"
                    cx={x}
                    cy={y}
                    r="4"
                    fill="#00d4ff"
                    opacity="0"
                  />
                );
              })}

              <defs>
                <linearGradient
                  id="radarGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#ff00ff" stopOpacity="0.4" />
                </linearGradient>
              </defs>
            </svg>

            <div className="absolute inset-0 pointer-events-none">
              {SKILL_CATEGORIES.map((cat, i) => {
                const angle =
                  (i * 2 * Math.PI) / SKILL_CATEGORIES.length - Math.PI / 2;
                const x = 50 + 50 * Math.cos(angle);
                const y = 50 + 50 * Math.sin(angle);
                return (
                  <span
                    key={cat}
                    className="absolute text-[10px] font-mono text-muted-foreground"
                    style={{
                      left: `${x}%`,
                      top: `${y}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    {cat}
                  </span>
                );
              })}
            </div>
          </div>
        </div>

        {/* skill cards */}
        <div
          ref={cardsRef}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-5"
        >
          {SKILLS.map((skill) => (
            <div
              key={skill.name}
              className="group relative p-6 rounded-2xl glass-card border border-white/10 hover:border-neon-cyan/40 transition-colors duration-300 overflow-hidden flex flex-col items-center text-center"
            >
              <div className="relative flex flex-col items-center gap-4 mb-3">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center bg-white/5 border border-white/10 overflow-hidden"
                  style={{ boxShadow: `0 0 20px ${skill.color}25` }}
                >
                  <img
                    src={skill.iconUrl}
                    alt={skill.name}
                    className="w-7 h-7 object-contain"
                  />
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">
                    {skill.category}
                  </span>
                  <span className="text-base font-bold text-white">
                    {skill.name}
                  </span>
                </div>
              </div>

              <p className="text-xs text-muted-foreground leading-relaxed max-w-[200px]">
                {skill.description}
              </p>

              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at 50% 0%, ${skill.color}18 0%, transparent 70%)`,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

