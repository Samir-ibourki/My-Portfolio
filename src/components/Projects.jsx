import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROJECTS } from "../utils/data";
import { ProjectCard } from "./ProjectCard";
import { Sparkles, ExternalLink, Github } from "lucide-react";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export function Projects() {
  const sectionRef = useRef(null);
  const wrapperRef = useRef(null);
  const stickyRef = useRef(null);
  const trackRef = useRef(null);
  const fillRef = useRef(null);
  const counterRef = useRef(null);
  const headerRef = useRef(null);

  const burstParticles = () => {};

  useGSAP(() => {
    const ctx = gsap.context(() => {
      const isMobile = window.matchMedia("(max-width: 768px)").matches;
      const track = trackRef.current;
      const wrapper = wrapperRef.current;
      const cards = gsap.utils.toArray(".proj-card");

      const entranceTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: isMobile ? "top 80%" : "top 70%",
          once: true,
        },
      });
      entranceTl.fromTo(
        headerRef.current?.children || [],
        { opacity: 0, y: 30, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.15,
          ease: "expo.out",
        },
      );

      if (isMobile) {
        entranceTl.fromTo(
          cards,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
          },
          "-=0.2",
        );

        // progress tracking for mobile
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top center",
          end: "bottom center",
          onUpdate: (self) => {
            if (fillRef.current)
              fillRef.current.style.width = `${self.progress * 100}%`;
            if (counterRef.current) {
              const idx = Math.min(
                Math.floor(self.progress * cards.length),
                cards.length - 1,
              );
              counterRef.current.textContent = String(idx + 1).padStart(2, "0");
            }
          },
        });
        return;
      }

      const CARD_W = cards[0].offsetWidth;
      const GAP = 40;
      const PAD = parseFloat(getComputedStyle(track).paddingLeft);
      const scrollX = cards.length * (CARD_W + GAP) + PAD - window.innerWidth;

      wrapper.style.height = `calc(100vh + ${scrollX}px)`;

      // horizontal scroll animation
      gsap.to(track, {
        x: -scrollX,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${scrollX}`,
          pin: ".projects-sticky",
          scrub: 1.2,
          anticipatePin: 1,
          onUpdate: (self) => {
            if (fillRef.current)
              fillRef.current.style.width = `${self.progress * 100}%`;
            if (counterRef.current) {
              const idx = Math.min(
                Math.floor(self.progress * cards.length),
                cards.length - 1,
              );
              counterRef.current.textContent = String(idx + 1).padStart(2, "0");
            }
          },
        },
      });

      // sequential card reveal
      entranceTl.fromTo(
        cards,
        {
          opacity: 0,
          scale: 0.88,
          y: 40,
          rotation: () => Math.random() * 6 - 3,
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          rotation: 0,
          duration: 0.9,
          ease: "elastic.out(1, 0.6)",
          stagger: 0.12,
        },
        "-=0.3",
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative overflow-hidden py-2 md:mt-4 "
    >
      <div ref={wrapperRef} className="projects-pin-wrapper relative">
        <div
          ref={stickyRef}
          className="projects-sticky md:sticky top-0 md:h-screen md:overflow-hidden flex flex-col justify-center"
        >
          {/* header container */}
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center shrink-0 mb-8 md:mb-12">
            <div ref={headerRef}>
              <div className="flex items-center justify-center gap-2 mb-4">
                <Sparkles className="w-4 h-4 text-neon-cyan" />
                <span className="text-xs font-mono text-muted-foreground tracking-wider uppercase">
                  SELECTED WORK
                </span>
                <Sparkles className="w-4 h-4 text-neon-magenta" />
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6">
                <span className="gradient-text">PROJECTS</span>
              </h2>

              {/* scroll progress indicator */}
              <div className="flex flex-col items-center gap-2">
                <div className="w-48 h-0.5 bg-white/5 rounded-full relative overflow-hidden">
                  <div
                    ref={fillRef}
                    className="absolute left-0 top-0 h-full w-0 rounded-full
                               bg-linear-to-r from-neon-cyan to-neon-magenta
                               shadow-[0_0_10px_rgba(0,255,255,0.5)]"
                    style={{ transition: "none" }}
                  />
                </div>
                <p className="font-mono text-[10px] tracking-widest text-white/20">
                  <span ref={counterRef} className="text-neon-cyan">
                    01
                  </span>{" "}
                  / 0{PROJECTS.length}
                </p>
              </div>
            </div>
          </div>

          <div
            ref={trackRef}
            className="flex flex-col md:flex-row gap-8 md:gap-10 px-4 md:px-[clamp(2rem,6vw,6rem)] items-center md:items-start will-change-transform shrink-0 pb-8 md:pb-0"
          >
            {PROJECTS.map((proj) => (
              <ProjectCard
                key={proj.id}
                project={proj}
                onBurst={burstParticles}
              />
            ))}

            {/* view all projects cta */}
            <a
              href="https://github.com/Samir-ibourki"
              target="_blank"
              rel="noopener noreferrer"
              className="proj-card shrink-0 w-full max-w-[320px] md:w-[clamp(320px,38vw,480px)] h-auto md:h-[clamp(440px,55vh,560px)] rounded-2xl md:rounded-3xl glass-card gradient-border flex flex-col items-center justify-center gap-4 md:gap-6 p-6 md:p-8 group transition-all duration-500 hover:scale-[1.02]"
              data-cursor-hover
              onMouseEnter={(e) => {
                gsap.to(e.currentTarget, {
                  boxShadow:
                    "0 0 40px rgba(0,212,255,0.15), 0 0 80px rgba(255,0,255,0.08)",
                  duration: 0.4,
                });
              }}
              onMouseLeave={(e) => {
                gsap.to(e.currentTarget, {
                  boxShadow: "none",
                  duration: 0.4,
                });
              }}
            >
              <div className="hidden md:flex w-20 h-20 rounded-2xl glass-card items-center justify-center mb-2 group-hover:neon-glow transition-all duration-500">
                <Github className="w-10 h-10 text-neon-blue group-hover:text-neon-cyan transition-colors duration-300" />
              </div>

              <div className="flex flex-col items-center gap-2">
                <h3 className="text-xl md:text-2xl font-bold gradient-text text-center">
                  View All Projects
                </h3>
                <p className="hidden md:block text-sm text-muted-foreground text-center max-w-62.5">
                  Explore more of my work and open-source contributions on
                  GitHub
                </p>
              </div>

              <div className="flex items-center gap-2 px-6 py-3 rounded-full border border-neon-blue/30 bg-neon-blue/5 group-hover:border-neon-blue/60 group-hover:bg-neon-blue/10 transition-all duration-300">
                <Github className="md:hidden w-4 h-4 text-neon-blue" />
                <span className="text-sm font-medium text-neon-blue">
                  Visit GitHub
                </span>
                <ExternalLink className="w-4 h-4 text-neon-blue group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
