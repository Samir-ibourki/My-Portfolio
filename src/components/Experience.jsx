import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Sparkles, Briefcase, MapPin, Calendar, ChevronRight } from "lucide-react";
import { EXPERIENCES } from "../utils/experienceData";

gsap.registerPlugin(ScrollTrigger);

export const Experience = () => {
  const isDark = true;
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const timelineRef = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
      });

      tl.fromTo(headerRef.current?.children || [], { opacity: 0, y: 30, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.2, ease: "expo.out" });
      const items = timelineRef.current?.querySelectorAll(".exp-item");
      if (items) {
        tl.fromTo(items, { opacity: 0, x: -40, scale: 0.95 }, { opacity: 1, x: 0, scale: 1, duration: 0.7, stagger: 0.2, ease: "power3.out" }, "-=0.4");
      }
      const line = timelineRef.current?.querySelector(".timeline-line-fill");
      if (line) {
        tl.fromTo(line, { scaleY: 0 }, { scaleY: 1, duration: 1, ease: "power2.out" }, "-=0.8");
      }
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} id="experience" className="relative py-20 md:py-24 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 right-1/4 w-80 h-80 rounded-full blur-[140px]" style={{ background: "rgba(0, 212, 255, 0.08)" }} />
        <div className="absolute bottom-0 left-1/3 w-72 h-72 rounded-full blur-[120px]" style={{ background: "rgba(255, 0, 255, 0.06)" }} />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={headerRef} className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-4 h-4 text-accent-primary" />
            <span className="section-label">Experience</span>
            <Sparkles className="w-4 h-4 text-accent-secondary" />
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"><span className="gradient-text">Where I've Worked</span></h2>
          <p className="text-base text-muted max-w-xl mx-auto">Real-world experience building production applications and delivering solutions for businesses.</p>
        </div>

        <div ref={timelineRef} className="relative">
          <div className="absolute left-6 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-[2px]">
            <div className="w-full h-full rounded-full bg-white/5" />
            <div className="timeline-line-fill absolute inset-0 w-full rounded-full origin-top bg-linear-to-b from-cyan-400 to-magenta-500" style={{ background: "linear-gradient(180deg, #00d4ff, #ff00ff)" }} />
          </div>

          <div className="space-y-12 md:space-y-16">
            {EXPERIENCES.map((exp, idx) => (
              <div key={exp.id} className={`exp-item relative flex flex-col md:flex-row gap-6 md:gap-12 ${idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full z-10 border-[3px] bg-cyber-dark" style={{ borderColor: exp.color, boxShadow: `0 0 20px ${exp.color}40` }} />
                <div className="hidden md:block w-1/2" />
                <div className="ml-14 md:ml-0 md:w-1/2">
                  <div className="group relative p-6 md:p-8 rounded-2xl border border-white/10 transition-all duration-500 hover:scale-[1.02] bg-white/5 backdrop-blur-3xl shadow-card"
                    onMouseEnter={(e) => { gsap.to(e.currentTarget, { boxShadow: `0 0 40px ${exp.color}20, 0 8px 32px rgba(0,0,0,0.3)`, borderColor: `${exp.color}50`, duration: 0.3 }); }}
                    onMouseLeave={(e) => { gsap.to(e.currentTarget, { boxShadow: "0 8px 32px rgba(0,0,0,0.3)", borderColor: "rgba(255,255,255,0.08)", duration: 0.3 }); }}>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="px-3 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase" style={{ background: `${exp.color}15`, color: exp.color, border: `1px solid ${exp.color}30` }}>{exp.type}</span>
                      <div className="flex items-center gap-1 text-xs text-muted"><Calendar className="w-3 h-3" />{exp.period}</div>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold mb-1 text-white">{exp.role}</h3>
                    <div className="flex items-center gap-2 mb-4 text-sm text-muted"><Briefcase className="w-4 h-4 text-accent-primary" /><span className="font-medium">{exp.company}</span><span className="mx-1">•</span><MapPin className="w-3 h-3" /><span>{exp.location}</span></div>
                    <p className="text-sm text-muted leading-relaxed mb-4">{exp.description}</p>
                    <div className="space-y-2 mb-5">
                      {exp.achievements.map((item, i) => (
                        <div key={i} className="flex items-start gap-2"><ChevronRight className="w-4 h-4 mt-0.5 shrink-0" style={{ color: exp.color }} /><span className="text-sm text-muted">{item}</span></div>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {exp.tech.map((t) => (
                        <span key={t} className="px-2.5 py-1 text-[10px] font-mono rounded-md bg-white/5 border border-white/10 text-white/60">{t}</span>
                      ))}
                    </div>
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: `radial-gradient(circle at 50% 0%, ${exp.color}12 0%, transparent 70%)` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
