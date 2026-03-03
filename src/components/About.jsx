import me from "../assets/me.png";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { MapPin, Code2, Sparkles } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);
export const About = () => {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);
  const headerRef = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          once: true,
        },
      });

      //header reveal
      tl.fromTo(
        headerRef.current?.children || [],
        { opacity: 0, y: 30, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "expo.out",
        },
      )
        //content & image reveal
        .fromTo(
          [contentRef.current, imageRef.current],
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.15,
            ease: "power3.out",
          },
          "-=0.4",
        )
        // stagger
        .fromTo(
          contentRef.current?.children || [],
          { opacity: 0, x: -20 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: "power2.out",
          },
          "-=0.6",
        );
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative min-h-screen w-full md:w-[95vw] md:mx-auto py-5 mb-12 md:mb-0  overflow-hidden"
    >
      <div className="absolute inset-0 noise-overlay pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/*  header */}
        <div ref={headerRef} className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-4 h-4 text-neon-cyan" />
            <span className="text-xs font-mono text-muted-foreground tracking-wider uppercase">
              About Me
            </span>
            <Sparkles className="w-4 h-4 text-neon-magenta" />
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="gradient-text">Who Am I?</span>
          </h2>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-36 items-center">
          {/* Content Section */}
          <div ref={contentRef} className="space-y-6">
            <h3 className="text-2xl md:text-3xl font-bold">
              I'm <span className="text-neon-blue">Samir Ibourki</span>
            </h3>

            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="w-4 h-4 text-neon-magenta" />
              <span>Morocco</span>
              <span className="mx-2">•</span>
              <span>Full Stack Developer</span>
            </div>

            <p className="text-lg text-muted-foreground leading-relaxed">
              Passionate developer specializing in building modern web and
              mobile applications. I love turning ideas into reality through
              clean code and creative solutions.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              With expertise in React ecosystem and mobile development using
              React Native, I create seamless user experiences across all
              platforms. Always eager to learn new technologies and take on
              challenging projects.
            </p>

            {/* Tech Stack Pills */}
            <div className="pt-4">
              <p className="text-sm text-muted-foreground mb-3">Tech Stack:</p>
              <div className="flex flex-wrap gap-2">
                {[
                  "Javascript",
                  "HTML",
                  "CSS",
                  "React JS",
                  "React Native",
                  "Expo",
                  "Tailwind CSS",
                  "Express JS",
                  "Node JS",
                  "PostgreSQL",
                ].map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 text-sm rounded-full glass text-neon-cyan border-neon-cyan/30"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <a
                href="#projects"
                className="px-6 py-3 rounded-full glass-card text-white font-medium hover:neon-glow transition-all"
                data-cursor-hover
              >
                View Projects
              </a>
              <a
                href="/Samir-Ibourki-CV.pdf"
                download
                className="px-6 py-3 rounded-full gradient-border text-white font-medium hover:opacity-90 transition-opacity"
                data-cursor-hover
              >
                Download CV
              </a>
            </div>
          </div>
          <div
            ref={imageRef}
            className="relative flex justify-center lg:justify-start"
          >
            <div className="relative">
              {/* glow effect */}
              <div className="absolute -inset-4 bg-linear-to-r from-neon-blue via-neon-magenta to-neon-cyan rounded-3xl opacity-30 blur-2xl animate-pulse-glow" />

              {/* photo Contaner */}
              <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-3xl overflow-hidden glass-card">
                <div className="w-full h-full flex flex-col items-center justify-center bg-cyber-card">
                  <img className="w-full" src={me} alt="me" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
