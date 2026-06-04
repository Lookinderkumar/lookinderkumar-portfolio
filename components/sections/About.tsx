'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { MapPin, BookOpen, Rocket, Brain, GraduationCap, Coffee } from 'lucide-react'

const stats = [
  { icon: BookOpen, value: 2, suffix: '', label: 'Peer-Reviewed Publications' },
  { icon: Rocket, value: 6, suffix: '+', label: 'Portfolio Projects' },
  { icon: Brain, value: 3, suffix: '+', label: 'Years ML/AI Experience' },
  { icon: GraduationCap, value: 1, suffix: '', label: 'MSc In Progress' },
]

const interests = [
  'Adversarial Machine Learning', 'Explainable AI (XAI)', 'LLM Engineering',
  'FinTech & Fraud Detection', 'Big Data Architecture', 'EU AI Act Compliance',
  'PhD Research', 'Real-Time Systems',
]

const bio = [
  "My work sits at the intersection of machine learning, explainable AI, and real-world financial systems. I build things that are rigorous enough to publish and practical enough to deploy.",
  "My MSc thesis investigates adversarial robustness and SHAP explanation stability in fraud detection models, mapped against EU AI Act 2024 compliance requirements — some of the most pressing challenges in applied AI for regulated industries. Alongside academic research, I am developing InfraOS, an AI-native construction project management platform that uses LLMs and agent frameworks to automate complex project workflows.",
  "Before Dublin, I completed my BTech in Computer Science & Engineering at C.V. Raman Global University, India (CGPA 8.50/10, First Class Distinction). I have a published paper at IEEE ASPCC 2024 and a dataset paper at Springer CIPR 2024. I am actively targeting AI engineering roles in Dublin by Q1 2027 and fully-funded PhD programmes across EU, UK, and Canada."
]

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    let start = 0
    const step = Math.ceil(target / 90)
    const timer = setInterval(() => {
      start += step
      if (start >= target) { setCount(target); clearInterval(timer) }
      else setCount(start)
    }, 16)
    return () => clearInterval(timer)
  }, [inView, target])

  return <span ref={ref}>{count}{suffix}</span>
}

export default function About() {
  return (
    <section id="about" className="py-16 bg-[#080D1A]">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-bold font-display bg-gradient-to-r from-[#0EA5E9] to-[#8B5CF6] bg-clip-text text-transparent">
            About Me
          </h2>
          <p className="text-[#94A3B8] text-sm sm:text-base mt-3 max-w-xl mx-auto">
            AI Engineer building intelligent systems at the intersection of AI, data, and regulated industries.
          </p>
        </motion.div>

        {/* Two Column Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-10 items-start">

          {/* LEFT — Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1 self-start bg-[#0D1424] rounded-2xl border border-[#1E2D40] p-8 text-center flex flex-col items-center justify-center hover:border-[#0EA5E9]/50 transition-all duration-300 hover:shadow-[0_0_40px_rgba(14,165,233,0.08)]"
          >
            <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full bg-gradient-to-br from-[#1a2744] via-[#2d1b69] to-[#3b0764] flex items-center justify-center border-2 border-[#0EA5E9]/40 shadow-[0_0_20px_rgba(14,165,233,0.15)]">
              <span className="text-4xl sm:text-5xl font-bold font-display text-[#7DD3FC]">LK</span>
            </div>
            <p className="text-lg sm:text-xl font-bold font-display text-[#F1F5F9] mt-6">Lookinder Kumar</p>
            <p className="text-[#0EA5E9] text-sm sm:text-base mt-1.5">AI Engineer &amp; MSc Student</p>
            <div className="flex items-center justify-center gap-1.5 text-[#94A3B8] text-xs sm:text-sm mt-3">
              <MapPin className="w-3.5 h-3.5" />
              <span>Dublin, Ireland</span>
            </div>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#0EA5E9]/30 bg-[#0EA5E9]/10 px-3.5 py-1.5">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-[#0EA5E9] text-xs sm:text-sm">Available for Opportunities</span>
            </div>
          </motion.div>

          {/* RIGHT — Bio Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 bg-[#0D1424] rounded-2xl border border-[#1E2D40] p-6 sm:p-8 lg:p-10 hover:border-[#0EA5E9]/50 transition-all duration-300 hover:shadow-[0_0_40px_rgba(14,165,233,0.08)]"
          >
            <h3 className="text-xl sm:text-2xl font-bold font-display text-[#F1F5F9] border-l-4 border-[#0EA5E9] pl-4 mb-6">
              My Story
            </h3>
            <div className="space-y-5">
              {bio.map((para, i) => (
                <p key={i} className="text-[#94A3B8] text-base leading-7">{para}</p>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mt-14">
          {stats.map((stat, i) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-[#0D1424] rounded-2xl border border-[#1E2D40] p-6 sm:p-8 text-center hover:border-[#0EA5E9]/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(14,165,233,0.08)]"
              >
                <Icon className="w-6 h-6 sm:w-7 sm:h-7 mx-auto text-[#0EA5E9] mb-3" />
                <div className="text-3xl sm:text-3xl lg:text-4xl font-bold font-display text-[#0EA5E9]">
                  <CountUp target={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-[#94A3B8] text-xs sm:text-sm mt-2">{stat.label}</p>
              </motion.div>
            )
          })}
        </div>

        {/* Interests */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 text-center"
        >
          <h2 className="text-2xl sm:text-3xl font-bold font-display bg-gradient-to-r from-[#0EA5E9] to-[#8B5CF6] bg-clip-text text-transparent">
            Interests
          </h2>
          <p className="text-[#94A3B8] text-sm sm:text-base mt-3">What drives me beyond the code</p>
          <div className="flex flex-wrap gap-3 justify-center mt-8">
            {interests.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-[#1E2D40] bg-[#0D1424] px-4 py-2 text-[#94A3B8] text-xs sm:text-sm hover:border-[#0EA5E9]/50 hover:text-[#0EA5E9] transition-all duration-200 cursor-default"
              >{tag}</span>
            ))}
          </div>
        </motion.div>

        {/* Quote Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-14 max-w-3xl mx-auto bg-[#0D1424] rounded-2xl border border-[#8B5CF6]/20 border-l-4 border-l-[#8B5CF6] p-8 sm:p-10 text-center"
        >
          <Coffee className="w-7 h-7 sm:w-8 sm:h-8 mx-auto text-[#8B5CF6] mb-4" />
          <p className="text-[#F1F5F9] text-base sm:text-lg italic leading-7 sm:leading-8">
            &ldquo;The goal is to turn data into information, and information into insight.&rdquo;
          </p>
          <p className="text-[#94A3B8] text-xs sm:text-sm mt-3">— Carly Fiorina</p>
        </motion.div>

      </div>
    </section>
  )
}
