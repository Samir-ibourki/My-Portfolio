import { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import emailjs from '@emailjs/browser';
import { 
  Send, 
  Check, 
  Mail, 
  Github, 
  Linkedin, 
  Sparkles,
  AlertCircle,
  Zap
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const Contact = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const iconsRef = useRef(null);
  const formRef = useRef(null);
  const submitBtnRef = useRef(null);
  const particlesRef = useRef(null);
  const successRef = useRef(null);
  const infoRef = useRef(null);
  
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useGSAP(() => {
    // Top-to-bottom entrance timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
        once: true,
      },
    });

    // 1. Header (Sparkles, Title, Description)
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
      }
    )
    // 2. Social Icons
    .fromTo(
      iconsRef.current?.children || [],
      { opacity: 0, scale: 0.5, y: 20 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.7)",
      },
      "-=0.4"
    )
    // 3. Form Container
    .fromTo(
      formRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
      },
      "-=0.4"
    );

    // 4. Form fields stagger (internal to form)
    const fields = formRef.current?.querySelectorAll('.form-field');
    if (fields) {
      tl.fromTo(
        fields,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
        },
        "-=0.8"
      );
    }

    // 5. Info Cards (Staggered at the end)
    if (infoRef.current) {
        tl.fromTo(
            infoRef.current.children,
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 0.6,
                stagger: 0.15,
                ease: "power2.out",
            },
            "-=0.5"
        );
    }

    // Floating contact icons (Looping animation)
    const icons = iconsRef.current?.querySelectorAll('.contact-icon');
    if (icons) {
      icons.forEach((icon, i) => {
        gsap.fromTo(icon, 
          { y: -10 },
          {
            y: 10,
            duration: 1.5 + i * 0.25,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          }
        );
      });
    }
  }, { scope: sectionRef });

  // focus animation
  const handleFocus = (field) => {
    const label = formRef.current?.querySelector(`[data-label="${field}"]`);
    if (label) {
      gsap.to(label, {
        y: -25,
        scale: 0.85,
        color: '#00d4ff',
        duration: 0.3,
        ease: 'power2.out',
      });
    }

    // Animate underline
    const underline = formRef.current?.querySelector(`[data-underline="${field}"]`);
    if (underline) {
      gsap.fromTo(
        underline,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.4, ease: 'power2.out' }
      );
    }
  };

  const handleBlur = (field) => {
    const value = formData[field];
    if (!value) {
      // Animate label back
      const label = formRef.current?.querySelector(`[data-label="${field}"]`);
      if (label) {
        gsap.to(label, {
          y: 0,
          scale: 1,
          color: 'rgba(255,255,255,0.5)',
          duration: 0.3,
          ease: 'power2.out',
        });
      }
    }

    // Hide underline
    const underline = formRef.current?.querySelector(`[data-underline="${field}"]`);
    if (underline && !value) {
      gsap.to(underline, {
        scaleX: 0,
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  };

  // magnetic effect
  const handleMagneticMove = (e) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(btn, {
      x: x * 0.4,
      y: y * 0.4,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleMagneticLeave = (e) => {
    gsap.to(e.currentTarget, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.3)',
    });
  };

  // particle burst
  const createParticleBurst = (x, y) => {
    if (!particlesRef.current) return;

    const colors = ['#00d4ff', '#ff00ff', '#00ffff', '#8b5cf6', '#ff1493'];
    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'absolute w-2 h-2 rounded-full pointer-events-none';
      particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;
      particlesRef.current.appendChild(particle);

      const angle = (Math.random() * Math.PI * 2);
      const velocity = 100 + Math.random() * 200;
      const tx = Math.cos(angle) * velocity;
      const ty = Math.sin(angle) * velocity;

      gsap.to(particle, {
        x: tx,
        y: ty,
        opacity: 0,
        scale: 0,
        duration: 0.8 + Math.random() * 0.4,
        ease: 'power2.out',
        onComplete: () => particle.remove(),
      });
    }
  };

  // validation
  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);

    // error shake
    if (Object.keys(newErrors).length > 0) {
      const errorFields = formRef.current?.querySelectorAll('.has-error');
      errorFields?.forEach((field) => {
        gsap.to(field, {
          x: 10,
          duration: 0.1,
          repeat: 3,
          yoyo: true,
          ease: 'power2.inOut',
          onComplete: () => gsap.set(field, { x: 0 }),
        });
      });
    }

    return Object.keys(newErrors).length === 0;
  };

  // submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);


    if (btnRect && particlesRef.current) {
      const sectionRect = sectionRef.current?.getBoundingClientRect();
      if (sectionRect) {
        createParticleBurst(
          btnRect.left + btnRect.width / 2 - sectionRect.left,
          btnRect.top + btnRect.height / 2 - sectionRect.top
        );
      }
    }

    // Animate button
    gsap.to(submitBtnRef.current, {
      scale: 0.9,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
    });

    try {
      const SERVICE_ID = 'service_gtbci29'; 
      const TEMPLATE_ID = 'template_2ve2p9d';
      const PUBLIC_KEY = 'XhXCx6l4W0iy9NnPp';

      const templateParams = {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        to_name: 'Samir Ibourki',
      };

      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);

      // Show success
      setIsSubmitting(false);
      setIsSuccess(true);

      // Animate form out, success in
      gsap.to(formRef.current, {
        opacity: 0,
        scale: 0.9,
        duration: 0.4,
        ease: 'power2.in',
      });

      gsap.fromTo(
        successRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.5, delay: 0.3, ease: 'back.out(1.7)' }
      );

      // Animate checkmark
      const checkmarkPath = successRef.current?.querySelector('.checkmark-path');
      if (checkmarkPath) {
        gsap.fromTo(checkmarkPath, 
          { strokeDasharray: 20, strokeDashoffset: 20, opacity: 0 },
          { strokeDashoffset: 0, opacity: 1, duration: 0.8, delay: 0.5, ease: 'power2.out' }
        );
      }

      // Type out success message
      const messageEl = successRef.current?.querySelector('.success-message');
      if (messageEl) {
        const text = "Message sent successfully! I'll get back to you soon.";
        messageEl.textContent = '';
        let i = 0;
        const typeInterval = setInterval(() => {
          if (i < text.length) {
            messageEl.textContent += text[i];
            i++;
          } else {
            clearInterval(typeInterval);
          }
        }, 30);
      }
    } catch (error) {
      console.error('EmailJS Error:', error);
      setIsSubmitting(false);
      setErrors((prev) => ({ ...prev, submit: 'Failed to send message. Please try again later.' }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
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
    <section
      ref={sectionRef}
      id="contact"
      className="relative min-h-screen md:min-h-0 w-full py-24 md:py-16 overflow-hidden"
    >

      {/* background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-cyber-dark via-cyber-card to-cyber-dark" />
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-neon-blue/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-neon-magenta/10 rounded-full blur-[150px]" />
      </div>

      {/* noise overlay */}
      <div className="absolute inset-0 z-[1] noise-overlay pointer-events-none" />

      {/* particle container */}
      <div ref={particlesRef} className="absolute inset-0 z-20 pointer-events-none overflow-hidden" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* header */}
        <div ref={headerRef} className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-4 h-4 text-neon-cyan" />
            <span className="text-xs font-mono text-muted-foreground tracking-wider uppercase">
              Get In Touch
            </span>
            <Sparkles className="w-4 h-4 text-neon-magenta" />
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="gradient-text">Let's Create Together</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Have a project in mind? Let's discuss how we can bring your vision to life.
          </p>
        </div>

        {/* social icons */}
        <div ref={iconsRef} className="flex justify-center gap-6 mb-12">
          {[
            { icon: Mail, label: 'Email', href: 'mailto:samiribourki7@gmail.com', color: '#00d4ff' },
            { icon: Github, label: 'GitHub', href: 'https://github.com/Samir-ibourki', color: '#ff00ff' },
            { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/samir-ibourki-500255199/', color: '#00ffff' },
            { 
              icon: () => (
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.438 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .004 5.412 0 12.048c0 2.123.554 4.197 1.604 6.046L0 24l6.095-1.599a11.804 11.804 0 005.945 1.599h.005c6.632 0 12.042-5.411 12.047-12.049 0-3.217-1.252-6.242-3.525-8.514z"/>
                </svg>
              ), 
              label: 'WhatsApp',
              href: 'https://wa.me/212689946687', 
              color: '#25D366' 
            },
          ].map((item, i) => (
            <a 
              key={i}
              href={item.href}
              target={item.href.startsWith('https') ? '_blank' : '_self'}
              onClick={(e) => {
                if (item.label === 'Email') {
                  handleEmailClick(e, 'samiribourki7@gmail.com');
                }
              }}
              rel="noopener noreferrer"
              className="contact-icon w-12 h-12 rounded-xl glass-card flex items-center justify-center transition-all duration-300 hover:scale-110"
              style={{
                '--hover-color': item.color,
              }}
              onMouseEnter={(e) => {
                gsap.to(e.currentTarget, {
                  boxShadow: `0 0 30px ${item.color}50`,
                  duration: 0.3,
                });
              }}
              onMouseLeave={(e) => {
                gsap.to(e.currentTarget, {
                  boxShadow: 'none',
                  duration: 0.3,
                });
              }}
              data-cursor-hover
            >
              {typeof item.icon === 'function' ? <item.icon /> : <item.icon className="w-5 h-5" style={{ color: item.color }} />}
            </a>
          ))}
        </div>

        {/* form container */}
        <div className="relative">
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className={`space-y-8 p-8 md:p-12 rounded-3xl glass-card transition-all duration-500 ${
              isSuccess ? 'pointer-events-none' : ''
            }`}
          >
            {/* Name Field */}
            <div className={`form-field relative ${errors.name ? 'has-error' : ''}`}>
              <label
                data-label="name"
                className="absolute left-0 top-3 text-muted-foreground pointer-events-none transition-all duration-300 origin-left"
              >
                Your Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onFocus={() => handleFocus('name')}
                onBlur={() => handleBlur('name')}
                className={`w-full bg-transparent border-b-2 py-3 text-white outline-none transition-colors duration-300 ${
                  errors.name ? 'border-red-500' : 'border-white/20 focus:border-neon-blue'
                }`}
              />
              <div
                data-underline="name"
                className="absolute bottom-0 left-0 w-full h-0.5 bg-neon-blue origin-left scale-x-0"
              />
              {errors.name && (
                <div className="flex items-center gap-1 mt-2 text-red-400 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  {errors.name}
                </div>
              )}
            </div>

            {/* Email Field */}
            <div className={`form-field relative ${errors.email ? 'has-error' : ''}`}>
              <label
                data-label="email"
                className="absolute left-0 top-3 text-muted-foreground pointer-events-none transition-all duration-300 origin-left"
              >
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onFocus={() => handleFocus('email')}
                onBlur={() => handleBlur('email')}
                className={`w-full bg-transparent border-b-2 py-3 text-white outline-none transition-colors duration-300 ${
                  errors.email ? 'border-red-500' : 'border-white/20 focus:border-neon-blue'
                }`}
              />
              <div
                data-underline="email"
                className="absolute bottom-0 left-0 w-full h-0.5 bg-neon-blue origin-left scale-x-0"
              />
              {errors.email && (
                <div className="flex items-center gap-1 mt-2 text-red-400 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  {errors.email}
                </div>
              )}
            </div>

            {/* Message Field */}
            <div className={`form-field relative ${errors.message ? 'has-error' : ''}`}>
              <label
                data-label="message"
                className="absolute left-0 top-3 text-muted-foreground pointer-events-none transition-all duration-300 origin-left"
              >
                Your Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                onFocus={() => handleFocus('message')}
                onBlur={() => handleBlur('message')}
                rows={4}
                className={`w-full bg-transparent border-b-2 py-3 text-white outline-none resize-none transition-colors duration-300 ${
                  errors.message ? 'border-red-500' : 'border-white/20 focus:border-neon-blue'
                }`}
              />
              <div
                data-underline="message"
                className="absolute bottom-0 left-0 w-full h-0.5 bg-neon-blue origin-left scale-x-0"
              />
              {errors.message && (
                <div className="flex items-center gap-1 mt-2 text-red-400 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  {errors.message}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              {errors.submit && (
                <div className="flex items-center gap-2 mb-4 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  {errors.submit}
                </div>
              )}

              <button
                ref={submitBtnRef}
                type="submit"
                disabled={isSubmitting}
                onMouseMove={handleMagneticMove}
                onMouseLeave={handleMagneticLeave}
                className="magnetic-btn relative w-full md:w-auto px-12 py-4 rounded-full overflow-hidden group disabled:opacity-70"
                data-cursor-hover
              >
                {/* Button background */}
                <div className="absolute inset-0 gradient-border rounded-full" />
                <div className="absolute inset-[1px] rounded-full bg-cyber-dark/90" />
                
                {/* Hover glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-neon-blue/20 to-neon-magenta/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Content */}
                <span className="relative z-10 flex items-center justify-center gap-2 text-white font-medium">
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </span>
              </button>
            </div>
          </form>

          {/* Success State */}
          <div
            ref={successRef}
            className="absolute inset-0 flex flex-col items-center justify-center opacity-0 pointer-events-none"
          >
            <div className="w-24 h-24 rounded-full glass-card flex items-center justify-center mb-6 relative">
              <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none">
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="#00d4ff"
                  strokeWidth="2"
                  fill="none"
                />
                <path
                  className="checkmark-path"
                  d="M8 12l3 3 5-6"
                  stroke="#00d4ff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  strokeDasharray="20"
                  strokeDashoffset="20"
                />
              </svg>
              {/* Glow */}
              <div className="absolute inset-0 rounded-full bg-neon-blue/20 blur-xl" />
            </div>
            <h3 className="text-2xl font-bold mb-2 gradient-text">Thank You!</h3>
            <p className="success-message text-muted-foreground text-center max-w-md" />
          </div>
        </div>

        {/* info */}
        <div ref={infoRef} className="mt-12 grid md:grid-cols-3 gap-6 text-center">
          {[
            { label: 'Response Time', value: '< 24 hours', icon: Zap },
            { label: 'Availability', value: 'Open for projects', icon: Check },
            { label: 'Location', value: 'Remote / Morocco', icon: Mail },
          ].map((item, i) => (
            <div key={i} className="p-4 rounded-xl glass-card">
              <item.icon className="w-5 h-5 mx-auto mb-2 text-neon-cyan" />
              <div className="text-sm text-muted-foreground">{item.label}</div>
              <div className="font-medium">{item.value}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};