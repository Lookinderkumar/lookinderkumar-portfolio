'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { ChevronDown } from 'lucide-react'
import Particles, { ParticlesProvider, useParticlesProvider } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'
import type { Engine } from '@tsparticles/engine'

const roles = [
  'AI Engineer',
  'MSc Big Data @ Griffith Dublin',
  'LLM Systems Builder',
  'Research Practitioner',
]

// Module-level flag — prevents re-initialisation on React StrictMode double-mount
let engineInitialised = false

const initEngineOnce = async (engine: Engine) => {
  if (engineInitialised) return
  await loadSlim(engine)
  engineInitialised = true
}

const particleOptions = {
  fullScreen: { enable: false },
  background: { color: { value: 'transparent' } },
  fpsLimit: 60,
  particles: {
    number: { value: 28 },
    color: { value: '#0EA5E9' },
    opacity: {
      value: { min: 0.3, max: 0.7 },
      animation: { enable: false },
    },
    size: {
      value: { min: 1, max: 2 },
      animation: { enable: false },
    },
    links: {
      enable: true,
      distance: 150,
      color: '#0EA5E9',
      opacity: 0.12,
      width: 1,
    },
    move: {
      enable: true,
      speed: 0.3,
      direction: 'none' as const,
      random: true,
      straight: false,
      outModes: { default: 'bounce' as const },
      attract: { enable: false },
    },
  },
  detectRetina: false,
  interactivity: {
    events: {
      onHover: { enable: false },
      onClick: { enable: false },
    },
  },
}

function HeroContent() {
  const { loaded: particlesReady } = useParticlesProvider()
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
      className="relative min-h-screen flex flex-col items-center justify-center pt-20 overflow-hidden bg-[#080D1A]"
    >
      {particlesReady && (
        <Particles
          id="hero-particles"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 0,
          }}
          options={particleOptions}
        />
      )}

      <motion.div
        className="relative z-10 flex flex-col items-center text-center gap-5 max-w-4xl mx-auto px-6"
        initial="initial"
        animate="animate"
        transition={{ staggerChildren: 0.15 }}
      >
        {/* Status badge */}
        <motion.div variants={fadeUp} transition={{ duration: 0.5 }}>
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#0EA5E9]/40 bg-[#0EA5E9]/10 text-[#94A3B8] text-sm">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Open to Opportunities
          </span>
        </motion.div>

        {/* Heading — one line */}
        <motion.h1
          variants={fadeUp}
          transition={{ duration: 0.5 }}
          className="font-bold leading-tight whitespace-nowrap"
          style={{ fontSize: 'clamp(2.2rem, 4.5vw, 4rem)' }}
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
          className="text-2xl md:text-3xl lg:text-4xl text-[#0EA5E9] font-semibold min-h-[3rem] flex items-center justify-center"
        >
          <span>{displayed}</span>
        </motion.div>

        {/* Bio */}
        <motion.p
          variants={fadeUp}
          transition={{ duration: 0.5 }}
          className="text-[#94A3B8] text-base md:text-lg max-w-xl leading-relaxed"
        >
          Building intelligent systems at the intersection of AI, data, and regulated industries.
        </motion.p>

        {/* Buttons */}
        <motion.div variants={fadeUp} transition={{ duration: 0.5 }} className="flex gap-4 flex-wrap justify-center">
          <a
            href="#projects"
            onClick={(e) => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }) }}
            className="px-8 py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-[#0EA5E9] to-[#8B5CF6] hover:opacity-90 hover:scale-105 transition-all duration-200"
          >
            View My Work
          </a>
          <a
            href="/Lookinder_Kumar_CV.pdf"
            download
            className="px-8 py-3 rounded-lg font-semibold bg-[#0D1426] text-white border border-[#1E293B] hover:border-[#0EA5E9] transition-all duration-200"
          >
            Download CV
          </a>
        </motion.div>

        {/* Social icons */}
        <motion.div variants={fadeUp} transition={{ duration: 0.5 }} className="flex gap-3">
          <a
            href="https://github.com/Lookinderkumar"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#0D1426] border border-[#1E293B] p-3 rounded-xl text-[#94A3B8] hover:text-[#0EA5E9] hover:border-[#0EA5E9] transition-all duration-200"
          >
            <FaGithub size={18} />
          </a>
          <a
            href="https://linkedin.com/in/lookinder-kumar"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#0D1426] border border-[#1E293B] p-3 rounded-xl text-[#94A3B8] hover:text-[#0EA5E9] hover:border-[#0EA5E9] transition-all duration-200"
          >
            <FaLinkedin size={18} />
          </a>
          <a
            href="https://twitter.com/lookinderkumar"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#0D1426] border border-[#1E293B] p-3 rounded-xl text-[#94A3B8] hover:text-[#0EA5E9] hover:border-[#0EA5E9] transition-all duration-200"
          >
            <FaXTwitter size={18} />
          </a>
          <a
            href="mailto:lookinderkumar2011@gmail.com"
            className="bg-[#0D1426] border border-[#1E293B] p-3 rounded-xl text-[#94A3B8] hover:text-[#0EA5E9] hover:border-[#0EA5E9] transition-all duration-200"
          >
            <FaEnvelope size={18} />
          </a>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-[#94A3B8]" style={{ zIndex: 10 }}>
        <ChevronDown size={24} />
      </div>
    </section>
  )
}

export default function Hero() {
  return (
    <ParticlesProvider init={initEngineOnce}>
      <HeroContent />
    </ParticlesProvider>
  )
}
