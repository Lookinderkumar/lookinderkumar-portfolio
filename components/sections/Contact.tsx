'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, MapPin, Send, CheckCircle } from 'lucide-react'
import { FaLinkedin } from 'react-icons/fa'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '', email: '', projectType: '', subject: '', message: ''
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch(`https://formspree.io/f/${process.env.NEXT_PUBLIC_FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(formData),
      })
      if (res.ok) setStatus('success')
      else setStatus('error')
    } catch {
      setStatus('error')
    }
  }

  const inputClass = "w-full bg-[#0D1424] border border-[#1E2D40] rounded-xl px-4 py-3 text-[#F1F5F9] text-sm placeholder-[#4B5563] focus:outline-none focus:border-[#0EA5E9]/60 transition-colors"

  return (
    <section id="contact" className="py-20 sm:py-24 bg-[#080D1A]">
      <div className="max-w-[1600px] mx-auto px-5 sm:px-8 lg:px-10">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl sm:text-5xl font-bold font-display bg-gradient-to-r from-[#0EA5E9] to-[#8B5CF6] bg-clip-text text-transparent">
            Get in Touch
          </h2>
          <p className="text-[#94A3B8] text-sm sm:text-base mt-3">
            Whether you&apos;re a recruiter, a PhD supervisor, or building something in AI — I&apos;d love to connect.
          </p>
        </motion.div>

        {/* Two column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-8 items-start">

          {/* LEFT — Info panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-4"
          >
            {/* Email card */}
            <div className="bg-[#0D1424] rounded-2xl border border-[#1E2D40] p-5 flex items-center gap-4 hover:border-[#0EA5E9]/50 transition-all duration-300">
              <div className="w-11 h-11 rounded-xl bg-[#0EA5E9]/10 border border-[#0EA5E9]/20 flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-[#0EA5E9]" />
              </div>
              <div>
                <p className="text-[#94A3B8] text-xs mb-0.5">Email</p>
                <a href="mailto:lookinderkumar2011@gmail.com" className="text-[#F1F5F9] text-sm font-medium hover:text-[#0EA5E9] transition-colors">
                  lookinderkumar2011@gmail.com
                </a>
              </div>
            </div>

            {/* Location card */}
            <div className="bg-[#0D1424] rounded-2xl border border-[#1E2D40] p-5 flex items-center gap-4 hover:border-[#0EA5E9]/50 transition-all duration-300">
              <div className="w-11 h-11 rounded-xl bg-[#0EA5E9]/10 border border-[#0EA5E9]/20 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-[#0EA5E9]" />
              </div>
              <div>
                <p className="text-[#94A3B8] text-xs mb-0.5">Location</p>
                <p className="text-[#F1F5F9] text-sm font-medium">Dublin, Ireland</p>
              </div>
            </div>

            {/* LinkedIn card */}
            <div className="bg-[#0D1424] rounded-2xl border border-[#1E2D40] p-5 flex items-center gap-4 hover:border-[#0EA5E9]/50 transition-all duration-300">
              <div className="w-11 h-11 rounded-xl bg-[#0EA5E9]/10 border border-[#0EA5E9]/20 flex items-center justify-center flex-shrink-0">
                <FaLinkedin className="w-5 h-5 text-[#0EA5E9]" />
              </div>
              <div>
                <p className="text-[#94A3B8] text-xs mb-0.5">LinkedIn</p>
                <a href="https://linkedin.com/in/lookinder-kumar" target="_blank" rel="noopener noreferrer"
                  className="text-[#F1F5F9] text-sm font-medium hover:text-[#0EA5E9] transition-colors">
                  /in/lookinder-kumar
                </a>
              </div>
            </div>

            {/* Status badge card */}
            <div className="bg-[#0D1424] rounded-2xl border border-[#1E2D40] p-5 flex items-center justify-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#0EA5E9]/30 bg-[#0EA5E9]/10 px-5 py-2">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-[#0EA5E9] text-sm font-medium">Open to Opportunities</span>
              </div>
            </div>
          </motion.div>

          {/* RIGHT — Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-[#0D1424] rounded-2xl border border-[#1E2D40] p-8"
          >
            {status === 'success' ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <CheckCircle className="w-16 h-16 text-green-400 mb-4" />
                <h3 className="text-xl font-bold font-display text-[#F1F5F9] mb-2">Message Sent!</h3>
                <p className="text-[#94A3B8] text-sm">I&apos;ll get back to you within 48 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name + Email row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[#94A3B8] text-xs mb-1.5 block">Name *</label>
                    <input name="name" required placeholder="Your name" value={formData.name} onChange={handleChange} className={inputClass} />
                  </div>
                  <div>
                    <label className="text-[#94A3B8] text-xs mb-1.5 block">Email *</label>
                    <input name="email" type="email" required placeholder="your@email.com" value={formData.email} onChange={handleChange} className={inputClass} />
                  </div>
                </div>

                {/* Project Type + Organisation row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[#94A3B8] text-xs mb-1.5 block">Enquiry Type</label>
                    <select name="projectType" value={formData.projectType} onChange={handleChange}
                      className={`${inputClass} appearance-none cursor-pointer`}>
                      <option value="" disabled>Select type</option>
                      <option value="Job Opportunity">Job Opportunity</option>
                      <option value="PhD Inquiry">PhD Inquiry</option>
                      <option value="Collaboration">Collaboration</option>
                      <option value="General">General</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[#94A3B8] text-xs mb-1.5 block">Organisation (optional)</label>
                    <input name="organisation" placeholder="Your company or university" className={inputClass} onChange={handleChange} />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="text-[#94A3B8] text-xs mb-1.5 block">Subject</label>
                  <input name="subject" placeholder="What's this about?" value={formData.subject} onChange={handleChange} className={inputClass} />
                </div>

                {/* Message */}
                <div>
                  <label className="text-[#94A3B8] text-xs mb-1.5 block">Message *</label>
                  <textarea name="message" required placeholder="Tell me about your project or enquiry..." value={formData.message} onChange={handleChange} rows={5}
                    className={`${inputClass} resize-y min-h-[120px]`} />
                </div>

                {status === 'error' && (
                  <p className="text-red-400 text-sm">Something went wrong. Please try again or email me directly.</p>
                )}

                {/* Submit button */}
                <button type="submit" disabled={status === 'loading'}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-white text-sm transition-all duration-300 disabled:opacity-60"
                  style={{ background: 'linear-gradient(90deg, #0EA5E9 0%, #8B5CF6 100%)' }}>
                  {status === 'loading' ? (
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
