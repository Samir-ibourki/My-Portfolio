import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROJECTS } from "../utils/data";
import { ProjectCard } from "./ProjectCard";
import { Sparkles } from "lucide-react";
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

        // Progress tracking for mobile
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
      className="relative overflow-hidden py-2 "
    >
      <div ref={wrapperRef} className="projects-pin-wrapper relative">
        <div
          ref={stickyRef}
          className="projects-sticky md:sticky top-0 md:h-screen md:overflow-hidden flex flex-col justify-center"
        >
          {/*header container */}
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center shrink-0 mb-8 md:mb-12">
            <div ref={headerRef}>
              <div className="flex items-center justify-center gap-2 mb-4">
                <Sparkles className="w-4 h-4 text-neon-cyan" />
                <span className="text-xs font-mono text-muted-foreground tracking-wider uppercase">
                  // 02 — SELECTED WORK
                </span>
                <Sparkles className="w-4 h-4 text-neon-magenta" />
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6">
                <span className="gradient-text">PROJECTS</span>
              </h2>

              {/* Scroll Progress Indicator */}
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
          </div>
        </div>
      </div>
    </section>
  );
}
