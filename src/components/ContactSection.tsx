import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import FadeIn from './FadeIn';

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'Web Development',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill out all required fields.');
      return;
    }
    setIsSubmitting(true);
    
    // Simulate high-end server-side database submission
    setTimeout(() => {
      setIsSubmitting(false);
      
      // WhatsApp redirect with form details
      const whatsappNumber = "8143124242";
      const text = `*New Request from Orange Quantum Hub*\n\n*Name:* ${formData.name}\n*Email:* ${formData.email}\n*Requested Service:* ${formData.service}\n*Description:* ${formData.message}`;
      const whatsappUrl = `https://api.whatsapp.com/send?phone=91${whatsappNumber}&text=${encodeURIComponent(text)}`;
      
      // Open in new window or redirect in parent frame if blocked
      try {
        const opened = window.open(whatsappUrl, '_blank');
        if (!opened) {
          window.location.href = whatsappUrl;
        }
      } catch (err) {
        window.location.href = whatsappUrl;
      }

      setSubmitSuccess(true);
      setFormData({ name: '', email: '', service: 'Web Development', message: '' });
    }, 1500);
  };

  return (
    <AnimatePresence mode="wait">
      {!submitSuccess ? (
        <motion.form
          key="contact-form"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          onSubmit={handleSubmit}
          className="flex flex-col gap-6 text-left"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Name input */}
            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase tracking-widest text-white font-black">
                Your Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Pathan Gousay"
                className="bg-[#1A1A1A] border border-white/5 focus:border-[#B600A8]/40 rounded-2xl px-4 py-3 sm:py-4 text-sm text-white placeholder-white/20 outline-none transition-all duration-300 focus:bg-[#1E1E1E]"
              />
            </div>

            {/* Email input */}
            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase tracking-widest text-white font-black">
                Your Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="name@company.com"
                className="bg-[#1A1A1A] border border-white/5 focus:border-[#B600A8]/40 rounded-2xl px-4 py-3 sm:py-4 text-sm text-white placeholder-white/20 outline-none transition-all duration-300 focus:bg-[#1E1E1E]"
              />
            </div>
          </div>

          {/* Service Requested Dropdown */}
          <div className="flex flex-col gap-2">
            <label className="text-xs uppercase tracking-widest text-white font-black">
              Select Requested Service
            </label>
            <select
              value={formData.service}
              onChange={(e) => setFormData({ ...formData, service: e.target.value })}
              className="bg-[#1A1A1A] border border-white/5 focus:border-[#B600A8]/40 rounded-2xl px-4 py-3 sm:py-4 text-sm text-white outline-none transition-all duration-300 focus:bg-[#1E1E1E] appearance-none cursor-pointer"
              style={{
                backgroundImage: `url("data:image/svg+xml;utf8,<svg fill='white' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/></svg>")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 16px center',
              }}
            >
              <option value="Web Development">Web Development</option>
              <option value="App Development">App Development</option>
              <option value="Digital Marketing">Digital Marketing</option>
              <option value="Graphic Designing">Graphic Designing</option>
              <option value="Content Writing">Content Writing</option>
              <option value="SEO Optimization">SEO Optimization</option>
              <option value="Social Media (SMM)">Social Media (SMM)</option>
              <option value="PPC Advertising">PPC Advertising</option>
              <option value="Email Marketing">Email Marketing</option>
              <option value="Logo Designing">Logo Designing</option>
            </select>
          </div>

          {/* Message */}
          <div className="flex flex-col gap-2">
            <label className="text-xs uppercase tracking-widest text-white font-black">
              Project Description <span className="text-red-500">*</span>
            </label>
            <textarea
              required
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Tell us about your project requirements..."
              className="bg-[#1A1A1A] border border-white/5 focus:border-[#B600A8]/40 rounded-3xl px-4 py-4 text-sm text-white placeholder-white/20 outline-none transition-all duration-300 focus:bg-[#1E1E1E] resize-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-white hover:bg-[#D7E2EA] text-black font-black uppercase py-4 rounded-full text-xs tracking-widest transition-all duration-300 shadow-lg relative overflow-hidden group flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <span>{isSubmitting ? 'SENDING INQUIRY...' : 'SUBMIT REQUEST'}</span>
            {!isSubmitting && (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            )}
          </button>
        </motion.form>
      ) : (
        <motion.div
          key="success-message"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center justify-center py-10 text-center gap-5"
        >
          <div className="h-16 w-16 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center text-green-400 mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-xl sm:text-2xl font-black uppercase text-white">
            INQUIRY RECEIVED
          </h3>
          <p className="text-sm sm:text-base text-white max-w-md leading-relaxed font-medium">
            Thank you for contacting Orange Quantum Hub. Our Managing Director, <span className="font-semibold text-white">Pathan Gousay Azam Khan</span>, and our technical architects have been notified and will respond to you directly via your email within 24 hours.
          </p>
          <button
            onClick={() => setSubmitSuccess(false)}
            className="mt-4 px-6 py-2.5 rounded-full border border-white/10 text-xs tracking-widest uppercase font-semibold text-white/75 hover:text-white hover:border-white/30 transition-all duration-200 cursor-pointer"
          >
            Send Another Message
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function ContactSection() {
  return (
    <section
      id="contact-section"
      className="relative bg-[#0C0C0C] py-24 sm:py-28 md:py-36 text-white border-t border-white/5 overflow-hidden z-30 w-full"
    >
      {/* Visual neon background grids */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#111111_1px,transparent_1px),linear-gradient(to_bottom,#111111_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none opacity-20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#B600A8]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-none px-6 sm:px-12 md:px-20 lg:px-28 grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 relative z-10">
        
        {/* Left Side: Copy and Details */}
        <div className="lg:col-span-5 flex flex-col justify-between text-left">
          <div className="flex flex-col">
            <FadeIn delay={0.1} y={35}>
              <span className="text-xs uppercase tracking-[0.25em] text-orange-400 font-black block mb-4">
                Let&apos;s Connect
              </span>
            </FadeIn>
            <FadeIn delay={0.2} y={35}>
              <h2 className="hero-heading font-black uppercase text-[clamp(2.5rem,6vw,80px)] leading-none tracking-tight mb-6">
                GET IN TOUCH
              </h2>
            </FadeIn>
            <FadeIn delay={0.3} y={35}>
              <p className="text-sm sm:text-base text-white font-medium leading-relaxed mb-8 max-w-md">
                Have a project or a bold digital vision in mind? Tell us what you are building. Our Managing Director and development leads will review your inquiry and connect with you directly.
              </p>
            </FadeIn>
          </div>

          {/* Connect Details Card */}
          <FadeIn delay={0.4} y={35} className="w-full">
            <div className="bg-[#141414]/90 border border-orange-500/50 shadow-[0_0_25px_rgba(249,115,22,0.25),0_10px_30px_rgba(0,0,0,0.5)] rounded-[2rem] p-6 sm:p-8 backdrop-blur-md relative overflow-hidden group">
              <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-[#B600A8]/5 rounded-full blur-2xl group-hover:bg-[#B600A8]/10 transition-colors duration-500" />
              
              <div className="flex flex-col gap-5">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-orange-400 font-black block mb-1">
                    Managing Director
                  </span>
                  <span className="text-base sm:text-lg font-black uppercase tracking-wide text-white">
                    Pathan Gousay Azam Khan
                  </span>
                </div>

                <div className="border-t border-white/5 pt-4">
                  <span className="text-[10px] uppercase tracking-widest text-orange-400 font-black block mb-1">
                    Direct Email
                  </span>
                  <a
                    href="mailto:pathanazamkhan09@gmail.com?subject=Project Inquiry"
                    className="text-sm sm:text-base font-mono tracking-widest text-white hover:text-orange-400 transition-colors"
                  >
                    pathanazamkhan09@gmail.com
                  </a>
                </div>

                <div className="border-t border-white/5 pt-4">
                  <span className="text-[10px] uppercase tracking-widest text-orange-400 font-black block mb-1">
                    Direct Line
                  </span>
                  <a
                    href="tel:8143124242"
                    className="text-sm sm:text-base font-mono tracking-widest text-white hover:text-orange-400 transition-colors"
                  >
                    +91 8143124242
                  </a>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Right Side: High-End Contact Form */}
        <div className="lg:col-span-7">
          <FadeIn delay={0.3} y={40} className="h-full">
            <div className="bg-[#121212]/95 border border-orange-500/50 rounded-[2.5rem] p-6 sm:p-10 backdrop-blur-md shadow-[0_0_30px_rgba(249,115,22,0.25),0_30px_70px_rgba(0,0,0,0.85)] relative overflow-hidden h-full flex flex-col justify-center">
              <ContactForm />
            </div>
          </FadeIn>
        </div>

      </div>
    </section>
  );
}
