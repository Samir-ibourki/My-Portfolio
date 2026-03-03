import { useRef } from "react";
import { gsap } from "gsap";
import { ExternalLink, Github } from "lucide-react";

export function ProjectCard({ project }) {
  const cardRef = useRef(null);
  // const btnRef = useRef(null);

  const onMove = (e) => {
    const card = cardRef.current;
    const r = card.getBoundingClientRect();
    const xN = (e.clientX - r.left) / r.width - 0.5;
    const yN = (e.clientY - r.top) / r.height - 0.5;

    gsap.to(card, {
      rotateY: xN * 15,
      rotateX: -yN * 10,
      transformPerspective: 1000,
      ease: "power2.out",
      duration: 0.4,
    });
  };

  const onLeave = () => {
    gsap.to(cardRef.current, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.9,
      ease: "elastic.out(1, 0.5)",
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="proj-card group relative flex-none rounded-3xl overflow-hidden cursor-pointer
                 border border-white/10 glass-card preserve-3d
                 hover:border-neon-cyan/50 transition-colors duration-500
                 w-[90vw] md:w-[clamp(320px,38vw,480px)] 
                 h-120 md:h-[clamp(440px,55vh,560px)]"
      onClick={() => window.open(project.link, "_blank")}
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className="w-full h-full object-cover scale-110
                     brightness-[0.4] saturate-[0.7]
                     transition-all duration-700 ease-out
                     group-hover:scale-100 group-hover:brightness-[0.2] group-hover:blur-[2px]"
        />
      </div>

      {/* Overlays */}
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-black/80 z-1" />
      <div className="absolute inset-0 bg-neon-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-1" />

      {/* Content */}
      <div className="relative z-10 h-full p-6 md:p-8 flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <span
            className="px-3 py-1 rounded-full bg-white/5 border border-white/10 
                         backdrop-blur-md text-[10px] font-mono tracking-widest uppercase text-white/70"
          >
            {project.category}
          </span>
          <div className="flex gap-2">
            <Github className="w-5 h-5 text-white/40 group-hover:text-neon-cyan transition-colors" />
            <ExternalLink className="w-5 h-5 text-white/40 group-hover:text-neon-magenta transition-colors" />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-3xl font-bold leading-tight">
            <span className="block group-hover:gradient-text transition-all duration-300">
              {project.title}
            </span>
          </h3>

          <p className="text-sm text-white/60 line-clamp-3 group-hover:text-white/90 transition-colors">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 text-[10px] font-mono rounded-md bg-white/5 border border-white/10 text-white/50"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Click Indicator */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                    opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20"
      >
        <div className="px-4 py-2 rounded-full glass border border-neon-cyan/30 text-xs font-mono text-neon-cyan">
          VIEW ON GITHUB
        </div>
      </div>
    </div>
  );
}
