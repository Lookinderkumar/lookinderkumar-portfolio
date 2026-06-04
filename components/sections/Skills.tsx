'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { skillsData } from '@/data/skills'

function SkillBar({ name, percentage, index }: { name: string; percentage: number; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <div ref={ref} className="mb-5 last:mb-0">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-[#94A3B8] text-sm">{name}</span>
        <span className="text-[#0EA5E9] text-sm font-mono">{percentage}%</span>
      </div>
      <div className="w-full h-1.5 bg-[#1E2D40] rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: 'linear-gradient(90deg, #0EA5E9 0%, #8B5CF6 100%)' }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${percentage}%` } : { width: 0 }}
          transition={{ duration: 1, delay: index * 0.1, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}

function SkillCard({ category, skills, icon: Icon, index }: {
  category: string
  skills: { name: string; percentage: number }[]
  icon: React.ElementType
  index: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-[#0D1424] rounded-2xl border border-[#1E2D40] p-6 sm:p-8 hover:border-[#0EA5E9]/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(14,165,233,0.08)]"
    >
      {/* Card Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-[#0EA5E9]/10 border border-[#0EA5E9]/20 flex items-center justify-center flex-shrink-0">
          <Icon className="w-5 h-5 text-[#0EA5E9]" />
        </div>
        <h3 className="text-lg font-bold font-display text-[#F1F5F9]">{category}</h3>
      </div>

      {/* Skill Bars */}
      <div>
        {skills.map((skill, i) => (
          <SkillBar key={skill.name} name={skill.name} percentage={skill.percentage} index={i} />
        ))}
      </div>
    </motion.div>
  )
}

export default function Skills() {
  return (
    <section id="skills" className="py-20 sm:py-24 bg-[#080D1A]">
      <div className="max-w-[1600px] mx-auto px-5 sm:px-8 lg:px-10">

        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl sm:text-5xl font-bold font-display bg-gradient-to-r from-[#0EA5E9] to-[#8B5CF6] bg-clip-text text-transparent">
            Skills &amp; Tech Stack
          </h2>
          <p className="text-[#94A3B8] text-sm sm:text-base mt-3">
            The tools and technologies I work with daily
          </p>
        </motion.div>

        {/* 3-column grid — matches reference exactly */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillsData.map((item, i) => (
            <SkillCard
              key={item.category}
              category={item.category}
              skills={item.skills}
              icon={item.icon}
              index={i}
            />
          ))}
        </div>

      </div>
    </section>
  )
}
