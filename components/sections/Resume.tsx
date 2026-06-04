'use client'

import { motion } from 'framer-motion'
import { Briefcase, GraduationCap, Award, Download } from 'lucide-react'

const workExperience = [
  {
    title: 'Data Science Intern',
    company: 'Infinite Computer Solutions',
    period: 'Aug 2024 — Nov 2024',
    location: 'Noida, India',
    points: [
      'Built Power BI KPI dashboards improving reporting turnaround by 25%',
      'Automated variance analysis (baseline vs actual) using Python/SQL; reduced manual reporting by 8 hrs/week',
      'Supported change control, maintained RAID logs, produced client-ready governance reports',
    ],
  },
]

const education = [
  {
    degree: 'MSc Big Data Management & Analytics',
    institution: 'Griffith College Dublin',
    period: 'Jan 2025 — Jun 2026',
    detail: 'Projected First Class Honours. Key modules: Big Data, Cloud Platforms, Information Retrieval, Parallel & Distributed Programming, Data Mining, Statistics for Data Science, Research Methods, Data Visualisation & BI. MSc thesis: Adversarial Robustness & SHAP Stability in Fraud Detection under EU AI Act 2024.',
  },
  {
    degree: 'BTech Computer Science & Engineering',
    institution: 'C.V. Raman Global University, India',
    period: 'Graduated May 2024',
    detail: 'CGPA 8.50/10 — First Class Distinction. Focus on algorithms, data structures, machine learning, and software engineering fundamentals.',
  },
]

const volunteering = [
  {
    role: 'Secretary',
    organisation: 'Erasmus Student Network (ESN) — Griffith College Dublin',
    period: 'Jan 2025 — Present',
    detail: 'Representing 100+ international students. Improved cross-cultural engagement by 40%. Managing communication, event logistics, and collaboration with ESN Ireland national board.',
  },
]

function TimelineItem({
  title,
  subtitle,
  period,
  detail,
  points,
  index,
}: {
  title: string
  subtitle: string
  period: string
  detail?: string
  points?: string[]
  index: number
}) {
  return (
    <div className="flex gap-5">
      {/* Timeline dot + line */}
      <div className="flex flex-col items-center mt-1 flex-shrink-0">
        <div className="w-5 h-5 rounded-full border-2 border-[#0EA5E9] bg-[#080D1A] flex items-center justify-center flex-shrink-0">
          <div className="w-2 h-2 rounded-full bg-[#0EA5E9]" />
        </div>
        <div className="w-px flex-1 bg-[#1E2D40] mt-2" />
      </div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="bg-[#0D1424] rounded-2xl border border-[#1E2D40] p-5 mb-4 flex-1 hover:border-[#0EA5E9]/40 transition-all duration-300"
      >
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
          <h3 className="text-base font-bold font-display text-[#F1F5F9]">{title}</h3>
          <span className="text-xs text-[#94A3B8] border border-[#1E2D40] bg-[#0D1424] px-3 py-1 rounded-full whitespace-nowrap flex-shrink-0">
            {period}
          </span>
        </div>
        <p className="text-[#0EA5E9] text-sm font-medium mb-3">{subtitle}</p>
        {detail && (
          <p className="text-[#94A3B8] text-sm leading-6">{detail}</p>
        )}
        {points && (
          <ul className="space-y-1.5 mt-1">
            {points.map((point, i) => (
              <li key={i} className="text-[#94A3B8] text-sm leading-6 flex gap-2">
                <span className="text-[#0EA5E9] mt-1.5 flex-shrink-0">›</span>
                {point}
              </li>
            ))}
          </ul>
        )}
      </motion.div>
    </div>
  )
}

function SectionHeader({ icon: Icon, title, color }: { icon: React.ElementType; title: string; color: string }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: `${color}15`, border: `1px solid ${color}30` }}>
        <Icon className="w-5 h-5" style={{ color }} />
      </div>
      <h3 className="text-xl font-bold font-display text-[#F1F5F9]">{title}</h3>
    </div>
  )
}

export default function Resume() {
  return (
    <section id="resume" className="py-16 bg-[#080D1A]">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold font-display bg-gradient-to-r from-[#0EA5E9] to-[#8B5CF6] bg-clip-text text-transparent">
            Resume
          </h2>
          <p className="text-[#94A3B8] text-sm sm:text-base mt-3">
            My professional journey and qualifications
          </p>
        </motion.div>

        {/* Download button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center mb-14"
        >
          <a
            href="/Lookinder_Kumar_CV.pdf"
            download
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full font-semibold text-white text-sm transition-all duration-300 hover:shadow-[0_0_30px_rgba(14,165,233,0.3)] hover:scale-105"
            style={{ background: 'linear-gradient(90deg, #0EA5E9 0%, #8B5CF6 100%)' }}
          >
            <Download className="w-4 h-4" />
            Download PDF Resume
          </a>
        </motion.div>

        {/* Max width content container */}
        <div className="max-w-4xl mx-auto">

          {/* Work Experience */}
          <div className="mb-14">
            <SectionHeader icon={Briefcase} title="Work Experience" color="#0EA5E9" />
            {workExperience.map((item, i) => (
              <TimelineItem
                key={i}
                index={i}
                title={item.title}
                subtitle={`${item.company} · ${item.location}`}
                period={item.period}
                points={item.points}
              />
            ))}
          </div>

          {/* Education */}
          <div className="mb-14">
            <SectionHeader icon={GraduationCap} title="Education" color="#8B5CF6" />
            {education.map((item, i) => (
              <TimelineItem
                key={i}
                index={i}
                title={item.degree}
                subtitle={item.institution}
                period={item.period}
                detail={item.detail}
              />
            ))}
          </div>

          {/* Volunteering */}
          <div className="mb-4">
            <SectionHeader icon={Award} title="Volunteering" color="#0EA5E9" />
            {volunteering.map((item, i) => (
              <TimelineItem
                key={i}
                index={i}
                title={item.role}
                subtitle={item.organisation}
                period={item.period}
                detail={item.detail}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
