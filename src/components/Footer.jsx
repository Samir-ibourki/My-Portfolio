import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { 
  Github, 
  Linkedin, 
  Mail,
  Heart,
  ArrowUp,
} from 'lucide-react';
import logo from '../assets/logo.png';

gsap.registerPlugin(ScrollTrigger);

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.438 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .004 5.412 0 12.048c0 2.123.554 4.197 1.604 6.046L0 24l6.095-1.599a11.804 11.804 0 005.945 1.599h.005c6.632 0 12.042-5.411 12.047-12.049 0-3.217-1.252-6.242-3.525-8.514z" />
  </svg>
);

const socialLinks = [
  { icon: Mail, href: 'mailto:samiribourki7@gmail.com', label: 'Email', color: '#00d4ff' },
  { icon: Github, href: 'https://github.com/Samir-ibourki', label: 'GitHub', color: '#ff00ff' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/samir-ibourki-500255199/', label: 'LinkedIn', color: '#00ffff' },
  { icon: WhatsAppIcon, href: 'https://wa.me/212689946687', label: 'WhatsApp', color: '#25D366' },
];

export const Footer = () => {
  const footerRef = useRef(null);
  const socialsRef = useRef(null);

  useGSAP(() => {
    // footer entrance animation
    gsap.fromTo(
      footerRef.current,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.8,
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 90%',
          once: true,
        },
      }
    );

    // social icons stagger animation
    const icons = socialsRef.current?.querySelectorAll('.social-icon');
    if (icons) {
      gsap.fromTo(
        icons,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          delay: 0.2,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%',
            once: true,
          },
        }
      );
    }
  }, { scope: footerRef });

  // social icon hover animation (gsap only)
  const handleSocialHover = (e, entering, color) => {
    const icon = e.currentTarget.querySelector('.icon-wrapper');
    
    if (entering) {
      gsap.to(icon, {
        scale: 1.2,
        rotation: 360,
        duration: 0.5,
        ease: 'elastic.out(1, 0.5)',
      });
      
      gsap.to(e.currentTarget, {
        boxShadow: `0 0 30px ${color}50`,
        duration: 0.3,
      });
    } else {
      gsap.to(icon, {
        scale: 1,
        rotation: 0,
        duration: 0.3,
        ease: 'power2.out',
      });
      
      gsap.to(e.currentTarget, {
        boxShadow: 'none',
        duration: 0.3,
      });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // handle email click based on device
  const handleEmailClick = (e, email) => {
    e.preventDefault();
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
      window.location.href = `mailto:${email}`;
    } else {
      window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${email}`, '_blank');
    }
  };

  return (
    <footer
      ref={footerRef}
      className="relative w-full py-16 md:py-12 overflow-hidden"
    >
      {/* background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-t from-cyber-darker to-cyber-dark" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-neon-blue/5 rounded-full blur-[150px]" />
      </div>

      {/* noise overlay */}
      <div className="absolute inset-0 z-[1] noise-overlay pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* main footer content — single row on desktop */}
        <div className="flex flex-col md:flex-row items-center md:items-center justify-between gap-8">
          {/* logo */}
          <a
            href="#hero"
            className="transition-transform duration-300 hover:scale-105 shrink-0"
            data-cursor-hover
          >
            <img
              src={logo}
              alt="Samir Ibourki Logo"
              className="h-20 md:h-26 w-auto object-contain drop-shadow-[0_0_8px_rgba(0,212,255,0.3)]"
            />
          </a>

          {/* quick links */}
          <nav className="flex flex-wrap justify-center gap-6 md:gap-8">
            {[
              { label: 'Home', href: '#hero' },
              { label: 'About', href: '#about' },
              { label: 'Projects', href: '#projects' },
              { label: 'Skills', href: '#skills' },
              { label: 'Contact', href: '#contact' },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-white transition-colors duration-300"
                data-cursor-hover
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* social links */}
          <div
            ref={socialsRef}
            className="flex gap-4 shrink-0"
          >
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target={social.href.startsWith('https') ? '_blank' : '_self'}
                onClick={(e) => {
                    if (social.label === 'Email') {
                        handleEmailClick(e, 'samiribourki7@gmail.com');
                    }
                }}
                rel="noopener noreferrer"
                className="social-icon w-12 h-12 rounded-xl glass-card flex items-center justify-center transition-all duration-300"
                onMouseEnter={(e) => handleSocialHover(e, true, social.color)}
                onMouseLeave={(e) => handleSocialHover(e, false, social.color)}
                aria-label={social.label}
                data-cursor-hover
              >
                <div className="icon-wrapper">
                  {typeof social.icon === 'function' ? <social.icon /> : <social.icon className="w-5 h-5" style={{ color: social.color }} />}
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
