'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Star, Search } from 'lucide-react'
import { FaGithub } from 'react-icons/fa'
import { projects, filterCategories, type Project } from '@/data/projects'
import { trackProjectClick } from '@/lib/analytics'

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const visibleTech = project.techStack.slice(0, 4)
  const extraCount = project.techStack.length - 4

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      onClick={() => trackProjectClick(project.id)}
      className={`bg-[#0D1424] rounded-2xl border border-[#1E2D40] overflow-hidden flex flex-col hover:border-[#0EA5E9]/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(14,165,233,0.08)] ${project.comingSoon ? 'opacity-70' : ''}`}
    >
      {/* Image area */}
      <div className="relative h-44 bg-gradient-to-br from-[#0D1424] to-[#1a1f35] flex items-center justify-center flex-shrink-0">
        <span className="text-6xl font-bold font-display text-[#0EA5E9]/20 select-none">
          {project.initial}
        </span>
        {project.featured && (
          <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-[#7C3AED] text-white text-xs font-medium px-3 py-1 rounded-full">
            <Star className="w-3 h-3 fill-white" />
            Featured
          </div>
        )}
        {project.badge && !project.featured && (
          <div className="absolute top-3 right-3 bg-[#0EA5E9]/20 border border-[#0EA5E9]/40 text-[#0EA5E9] text-xs font-medium px-3 py-1 rounded-full">
            {project.badge}
          </div>
        )}
        {project.comingSoon && (
          <div className="absolute inset-0 bg-[#080D1A]/60 flex items-center justify-center">
            <span className="text-[#94A3B8] text-sm font-medium border border-[#334155] px-4 py-2 rounded-full bg-[#0D1424]">
              Coming Soon
            </span>
          </div>
        )}
      </div>

      {/* Card body */}
      <div className="p-6 flex flex-col flex-1">
        {/* Category pill */}
        <div className="mb-3">
          <span className="text-xs font-medium text-[#0EA5E9] border border-[#0EA5E9]/30 bg-[#0EA5E9]/10 px-2.5 py-1 rounded-full">
            {project.category}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-base font-bold font-display text-[#F1F5F9] mb-2 leading-snug">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-[#94A3B8] text-sm leading-6 mb-4 flex-1">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {visibleTech.map((tech) => (
            <span key={tech} className="text-xs text-[#94A3B8] bg-[#1E2D40] border border-[#334155] px-2 py-0.5 rounded font-mono">
              {tech}
            </span>
          ))}
          {extraCount > 0 && (
            <span className="text-xs text-[#94A3B8] bg-[#1E2D40] border border-[#334155] px-2 py-0.5 rounded font-mono">
              +{extraCount}
            </span>
          )}
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-between pt-4 border-t border-[#1E2D40]">
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-1.5 text-[#94A3B8] text-sm hover:text-[#F1F5F9] transition-colors">
              <FaGithub className="w-4 h-4" />
              <span>Code</span>
            </button>
            {project.demoUrl && (
              <a href={project.demoUrl} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-[#94A3B8] text-sm hover:text-[#F1F5F9] transition-colors">
                <ExternalLink className="w-4 h-4" />
                <span>Demo</span>
              </a>
            )}
          </div>
          {project.paperUrl ? (
            <a href={project.paperUrl} target="_blank" rel="noopener noreferrer"
              className="text-[#0EA5E9] text-sm font-medium hover:text-[#38BDF8] transition-colors flex items-center gap-1">
              View Paper →
            </a>
          ) : (
            <span className="text-[#0EA5E9] text-sm font-medium cursor-default">
              Read More →
            </span>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const filtered = projects.filter((p) => {
    const matchesFilter = activeFilter === 'All' || p.category === activeFilter
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFilter && matchesSearch
  })

  return (
    <section id="projects" className="py-20 sm:py-24 bg-[#080D1A]">
      <div className="max-w-[1600px] mx-auto px-5 sm:px-8 lg:px-10">

        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl font-bold font-display text-[#0EA5E9]">
            Projects
          </h2>
          <p className="text-[#94A3B8] text-sm sm:text-base mt-3">
            A showcase of my data science, AI, and ML work
          </p>
        </motion.div>

        {/* Filter tabs + Search row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
          {/* Filter pills */}
          <div className="flex flex-wrap gap-2">
            {filterCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeFilter === cat
                    ? 'bg-[#0EA5E9] text-white shadow-[0_0_15px_rgba(14,165,233,0.3)]'
                    : 'border border-[#1E2D40] text-[#94A3B8] hover:border-[#0EA5E9]/50 hover:text-[#0EA5E9] bg-transparent'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0D1424] border border-[#1E2D40] rounded-full pl-9 pr-4 py-2 text-sm text-[#F1F5F9] placeholder-[#94A3B8] focus:outline-none focus:border-[#0EA5E9]/50 transition-colors"
            />
          </div>
        </div>

        {/* Project Cards Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="text-center py-20 text-[#94A3B8]">
            No projects found matching your search.
          </div>
        )}

      </div>
    </section>
  )
}
