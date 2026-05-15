import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import emailjs from "@emailjs/browser";
import { Send, Mail, Github, Linkedin, Sparkles, AlertCircle, Zap, Check } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export const Contact = () => {
  const isDark = true;
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const iconsRef = useRef(null);
  const formRef = useRef(null);
  const submitBtnRef = useRef(null);
  const particlesRef = useRef(null);
  const successRef = useRef(null);
  const infoRef = useRef(null);

  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useGSAP(() => {
    const tl = gsap.timeline({ scrollTrigger: { trigger: sectionRef.current, start: "top 95%", once: true } });
    tl.fromTo(headerRef.current?.children || [], { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" })
      .fromTo(iconsRef.current?.children || [], { opacity: 0, scale: 0.9, y: 10 }, { opacity: 1, scale: 1, y: 0, duration: 0.3, stagger: 0.05, ease: "power2.out" }, "-=0.1")
      .fromTo(formRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }, "-=0.2");
    const fields = formRef.current?.querySelectorAll(".form-field");
    if (fields) tl.fromTo(fields, { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" }, "-=0.8");
    if (infoRef.current) tl.fromTo(infoRef.current.children, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: "power2.out" }, "-=0.5");
    const icons = iconsRef.current?.querySelectorAll(".contact-icon");
    if (icons) icons.forEach((icon, i) => { gsap.fromTo(icon, { y: -10 }, { y: 10, duration: 1.5 + i * 0.25, repeat: -1, yoyo: true, ease: "sine.inOut" }); });
  }, { scope: sectionRef });

  const handleFocus = (field) => {
    const label = formRef.current?.querySelector(`[data-label="${field}"]`);
    if (label) gsap.to(label, { y: -25, scale: 0.85, color: "#00d4ff", duration: 0.3, ease: "power2.out" });
    const underline = formRef.current?.querySelector(`[data-underline="${field}"]`);
    if (underline) gsap.fromTo(underline, { scaleX: 0 }, { scaleX: 1, duration: 0.4, ease: "power2.out" });
  };

  const handleBlur = (field) => {
    if (!formData[field]) {
      const label = formRef.current?.querySelector(`[data-label="${field}"]`);
      if (label) gsap.to(label, { y: 0, scale: 1, color: "rgba(255, 255, 255, 0.45)", duration: 0.3, ease: "power2.out" });
    }
    const underline = formRef.current?.querySelector(`[data-underline="${field}"]`);
    if (underline && !formData[field]) gsap.to(underline, { scaleX: 0, duration: 0.3, ease: "power2.out" });
  };

  const handleMagneticMove = (e) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    gsap.to(btn, { x: (e.clientX - rect.left - rect.width / 2) * 0.4, y: (e.clientY - rect.top - rect.height / 2) * 0.4, duration: 0.3, ease: "power2.out" });
  };
  const handleMagneticLeave = (e) => { gsap.to(e.currentTarget, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" }); };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Invalid email format";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    else if (formData.message.length < 10) newErrors.message = "Message must be at least 10 characters";
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      formRef.current?.querySelectorAll(".has-error")?.forEach((field) => {
        gsap.to(field, { x: 10, duration: 0.1, repeat: 3, yoyo: true, ease: "power2.inOut", onComplete: () => gsap.set(field, { x: 0 }) });
      });
    }
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    gsap.to(submitBtnRef.current, { scale: 0.9, duration: 0.1, yoyo: true, repeat: 1 });
    try {
      await emailjs.send("service_gtbci29", "template_2ve2p9d", { name: formData.name, email: formData.email, message: formData.message, to_name: "Samir Ibourki" }, "XhXCx6l4W0iy9NnPp");
      setIsSubmitting(false);
      setIsSuccess(true);
      gsap.to(formRef.current, { opacity: 0, scale: 0.9, duration: 0.4, ease: "power2.in" });
      gsap.fromTo(successRef.current, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.5, delay: 0.3, ease: "back.out(1.7)" });
    } catch (error) {
      console.error("EmailJS Error:", error);
      setIsSubmitting(false);
      setErrors((prev) => ({ ...prev, submit: "Failed to send message. Please try again later." }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleEmailClick = (e, email) => {
    e.preventDefault();
    if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) window.location.href = `mailto:${email}`;
    else window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${email}`, "_blank");
  };

  return (
    <section ref={sectionRef} id="contact" className="relative min-h-screen md:min-h-0 w-full py-24 md:py-16 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-linear-to-b from-[#0a0c14] via-[#11131a] to-[#0a0c14]" />
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full blur-[150px] bg-cyan-500/10" />
        <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] rounded-full blur-[150px] bg-magenta-500/10" />
      </div>
      <div className="absolute inset-0 z-[1] noise-overlay pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={headerRef} className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4"><Sparkles className="w-4 h-4 text-accent-tertiary" /><span className="section-label">Get In Touch</span><Sparkles className="w-4 h-4 text-accent-secondary" /></div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"><span className="gradient-text">Let's Create Together</span></h2>
          <p className="text-lg max-w-xl mx-auto text-muted">Have a project in mind? Let's discuss how we can bring your vision to life.</p>
        </div>

        <div ref={iconsRef} className="flex justify-center gap-6 mb-12">
          {[
            { icon: Mail, label: "Email", href: "mailto:samiribourki7@gmail.com", color: "#00d4ff" },
            { icon: Github, label: "GitHub", href: "https://github.com/Samir-ibourki", color: "#ff00ff" },
            { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/samir-ibourki-500255199/", color: "#00ffff" },
            { icon: () => (<svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.438 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .004 5.412 0 12.048c0 2.123.554 4.197 1.604 6.046L0 24l6.095-1.599a11.804 11.804 0 005.945 1.599h.005c6.632 0 12.042-5.411 12.047-12.049 0-3.217-1.252-6.242-3.525-8.514z" /></svg>), label: "WhatsApp", href: "https://wa.me/212689946687", color: "#25D366" },
          ].map((item, i) => (
            <a key={i} href={item.href} target={item.href.startsWith("https") ? "_blank" : "_self"} onClick={(e) => { if (item.label === "Email") handleEmailClick(e, "samiribourki7@gmail.com"); }} rel="noopener noreferrer" className="contact-icon w-12 h-12 rounded-xl glass-card flex items-center justify-center transition-all duration-300 hover:scale-110" data-cursor-hover onMouseEnter={(e) => { gsap.to(e.currentTarget, { boxShadow: `0 0 30px ${item.color}50`, duration: 0.3 }); }} onMouseLeave={(e) => { gsap.to(e.currentTarget, { boxShadow: "none", duration: 0.3 }); }}>{typeof item.icon === "function" ? <item.icon /> : <item.icon className="w-5 h-5" style={{ color: item.color }} />}</a>
          ))}
        </div>

        <div className="relative">
          <form ref={formRef} onSubmit={handleSubmit} className={`space-y-8 p-8 md:p-12 rounded-3xl glass-card transition-all duration-500 ${isSuccess ? "pointer-events-none" : ""}`}>
            {["name", "email", "message"].map((field) => (
              <div key={field} className={`form-field relative ${errors[field] ? "has-error" : ""}`}>
                <label data-label={field} className="absolute left-0 top-3 pointer-events-none transition-all duration-300 origin-left text-muted">{field === "name" ? "Your Name" : field === "email" ? "Email Address" : "Your Message"}</label>
                {field !== "message" ? (
                  <input type={field === "email" ? "email" : "text"} name={field} value={formData[field]} onChange={handleChange} onFocus={() => handleFocus(field)} onBlur={() => handleBlur(field)} className="w-full bg-transparent border-b-2 py-3 outline-none transition-colors duration-300 text-primary" style={{ borderColor: errors[field] ? "#ef4444" : "rgba(255, 255, 255, 0.12)" }} />
                ) : (
                  <textarea name={field} value={formData[field]} onChange={handleChange} onFocus={() => handleFocus(field)} onBlur={() => handleBlur(field)} rows={4} className="w-full bg-transparent border-b-2 py-3 outline-none resize-none transition-colors duration-300 text-primary" style={{ borderColor: errors[field] ? "#ef4444" : "rgba(255, 255, 255, 0.12)" }} />
                )}
                <div data-underline={field} className="absolute bottom-0 left-0 w-full h-0.5 origin-left scale-x-0 bg-accent-primary" />
                {errors[field] && <div className="flex items-center gap-1 mt-2 text-red-400 text-sm"><AlertCircle className="w-4 h-4" />{errors[field]}</div>}
              </div>
            ))}
            <div className="pt-4">
              {errors.submit && <div className="flex items-center gap-2 mb-4 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm"><AlertCircle className="w-5 h-5 flex-shrink-0" />{errors.submit}</div>}
              <button ref={submitBtnRef} type="submit" disabled={isSubmitting} onMouseMove={handleMagneticMove} onMouseLeave={handleMagneticLeave} className="magnetic-btn relative w-full md:w-auto px-12 py-4 rounded-full overflow-hidden group disabled:opacity-70" data-cursor-hover>
                <div className="absolute inset-0 gradient-border rounded-full" />
                <div className="absolute inset-[1px] rounded-full bg-cyber-dark/90" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-linear-to-r from-cyan-500/20 to-magenta-500/20" />
                <span className="relative z-10 flex items-center justify-center gap-2 font-medium text-primary">{isSubmitting ? (<><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />Sending...</>) : (<><Send className="w-5 h-5" />Send Message</>)}</span>
              </button>
            </div>
          </form>
          <div ref={successRef} className="absolute inset-0 flex flex-col items-center justify-center opacity-0 pointer-events-none">
            <div className="w-24 h-24 rounded-full glass-card flex items-center justify-center mb-6 relative"><svg className="w-12 h-12" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="#00d4ff" strokeWidth="2" fill="none" /><path d="M8 12l3 3 5-6" stroke="#00d4ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" /></svg></div>
            <h3 className="text-2xl font-bold mb-2 gradient-text">Thank You!</h3>
            <p className="text-center max-w-md text-muted">Your message has been sent. I'll get back to you soon!</p>
          </div>
        </div>

        <div ref={infoRef} className="mt-12 grid md:grid-cols-3 gap-6 text-center">
          {[{ label: "Response Time", value: "< 24 hours", icon: Zap }, { label: "Availability", value: "Open for projects", icon: Check }, { label: "Location", value: "Remote / Morocco", icon: Mail }].map((item, i) => (
            <div key={i} className="p-4 rounded-xl glass-card"><item.icon className="w-5 h-5 mx-auto mb-2 text-accent-primary" /><div className="text-sm text-muted">{item.label}</div><div className="font-medium text-primary">{item.value}</div></div>
          ))}
        </div>
      </div>
    </section>
  );
};
