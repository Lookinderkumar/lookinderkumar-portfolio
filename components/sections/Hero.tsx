'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { ChevronDown } from 'lucide-react'
import ParticleCanvas from '@/components/ui/ParticleCanvas'

const roles = [
  'AI Engineer',
  'MSc Big Data @ Griffith Dublin',
  'LLM Systems Builder',
  'Research Practitioner',
]

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [phase, setPhase] = useState<'typing' | 'pausing' | 'deleting'>('typing')

  useEffect(() => {
    const current = roles[roleIndex]
    let timeout: NodeJS.Timeout

    if (phase === 'typing') {
      if (displayed.length < current.length) {
        timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80)
      } else {
        timeout = setTimeout(() => setPhase('pausing'), 2000)
      }
    } else if (phase === 'pausing') {
      timeout = setTimeout(() => setPhase('deleting'), 200)
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40)
      } else {
        setRoleIndex((i) => (i + 1) % roles.length)
        setPhase('typing')
      }
    }
    return () => clearTimeout(timeout)
  }, [displayed, phase, roleIndex])

  const fadeUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center pt-24 overflow-hidden bg-[#080D1A]"
    >
      <ParticleCanvas />

      <motion.div
        className="relative z-10 max-w-3xl mx-auto text-center flex flex-col items-center gap-10 px-6"
        initial="initial"
        animate="animate"
        transition={{ staggerChildren: 0.15 }}
      >
        {/* Status badge */}
        <motion.div variants={fadeUp} transition={{ duration: 0.5 }}>
          <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#0EA5E9]/40 bg-[#0EA5E9]/10 text-[#94A3B8] text-base md:text-lg">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Open to Opportunities
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          variants={fadeUp}
          transition={{ duration: 0.5 }}
          className="font-bold leading-tight whitespace-nowrap text-5xl md:text-6xl lg:text-7xl"
        >
          <span className="text-white">Hi, I&apos;m </span>
          <span className="bg-gradient-to-r from-[#0EA5E9] to-[#8B5CF6] bg-clip-text text-transparent">
            Lookinder Kumar
          </span>
        </motion.h1>

        {/* Typed role */}
        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.5 }}
          className="text-2xl md:text-3xl lg:text-4xl font-semibold text-[#0EA5E9] min-h-[3rem] flex items-center justify-center"
        >
          <span>{displayed}</span>
        </motion.div>

        {/* Bio */}
        <motion.p
          variants={fadeUp}
          transition={{ duration: 0.5 }}
          className="text-xl md:text-2xl text-[#94A3B8] max-w-2xl mx-auto leading-relaxed text-center"
        >
          Building intelligent systems at the intersection of AI, data, and regulated industries.
        </motion.p>

        {/* Buttons */}
        <motion.div variants={fadeUp} transition={{ duration: 0.5 }} className="flex gap-6 flex-wrap justify-center">
          <a
            href="#projects"
            onClick={(e) => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }) }}
            className="px-14 py-3 text-lg font-semibold rounded-lg text-white bg-gradient-to-r from-[#0EA5E9] to-[#8B5CF6] hover:opacity-90 hover:scale-105 transition-all duration-200"
          >
            View My Work
          </a>
          <a
            href="/Lookinder_Kumar_CV.pdf"
            download
            className="px-14 py-3 text-lg font-semibold rounded-lg bg-[#0D1426] text-white border border-[#1E293B] hover:border-[#0EA5E9] transition-all duration-200"
          >
            Download CV
          </a>
        </motion.div>

        {/* Social icons */}
        <motion.div variants={fadeUp} transition={{ duration: 0.5 }} className="flex gap-5">
          <a
            href="https://github.com/Lookinderkumar"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-xl bg-[#0D1426] border border-[#1E293B] hover:border-[#0EA5E9]/50 text-[#94A3B8] hover:text-[#0EA5E9] transition-all duration-200"
          >
            <FaGithub className="text-2xl" />
          </a>
          <a
            href="https://linkedin.com/in/lookinder-kumar"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-xl bg-[#0D1426] border border-[#1E293B] hover:border-[#0EA5E9]/50 text-[#94A3B8] hover:text-[#0EA5E9] transition-all duration-200"
          >
            <FaLinkedin className="text-2xl" />
          </a>
          <a
            href="https://twitter.com/lookinderkumar"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-xl bg-[#0D1426] border border-[#1E293B] hover:border-[#0EA5E9]/50 text-[#94A3B8] hover:text-[#0EA5E9] transition-all duration-200"
          >
            <FaXTwitter className="text-2xl" />
          </a>
          <a
            href="mailto:lookinderkumar2011@gmail.com"
            className="p-4 rounded-xl bg-[#0D1426] border border-[#1E293B] hover:border-[#0EA5E9]/50 text-[#94A3B8] hover:text-[#0EA5E9] transition-all duration-200"
          >
            <FaEnvelope className="text-2xl" />
          </a>
        </motion.div>
      </motion.div>

      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-[#94A3B8]"
        style={{ zIndex: 10 }}
      >
        <ChevronDown size={24} />
      </div>
    </section>
  )
}
