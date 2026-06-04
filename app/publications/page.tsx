'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, ExternalLink, Copy, Check, Database } from 'lucide-react'
import { publications } from '@/data/publications'
import { motion } from 'framer-motion'

function PublicationCard({ pub, index }: { pub: typeof publications[0]; index: number }) {
  const [expanded, setExpanded] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(pub.bibtex)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="bg-[#0D1424] rounded-2xl border border-[#1E2D40] p-8 hover:border-[#0EA5E9]/40 transition-all duration-300"
    >
      {/* Publisher badge */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xs font-semibold text-[#0EA5E9] border border-[#0EA5E9]/30 bg-[#0EA5E9]/10 px-3 py-1 rounded-full">
          {pub.publisher}
        </span>
        <span className="text-xs text-[#94A3B8]">{pub.year}</span>
      </div>

      {/* Title */}
      <h2 className="text-lg sm:text-xl font-bold font-display text-[#F1F5F9] mb-3 leading-snug">
        {pub.title}
      </h2>

      {/* Authors */}
      <p className="text-[#94A3B8] text-sm mb-2">
        {pub.authors.map((author, i) => (
          <span key={i}>
            {author === 'Lookinder Kumar'
              ? <strong className="text-[#0EA5E9] font-semibold">{author}</strong>
              : author}
            {i < pub.authors.length - 1 ? ', ' : ''}
          </span>
        ))}
      </p>

      {/* Venue */}
      <p className="text-[#94A3B8] text-xs italic mb-5 leading-5">{pub.venue} · {pub.location}</p>

      {/* Abstract — collapsible */}
      <div className="mb-5">
        <p className={`text-[#94A3B8] text-sm leading-7 ${expanded ? '' : 'line-clamp-2'}`}>
          {pub.abstract}
        </p>
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-[#0EA5E9] text-xs mt-1.5 hover:text-[#38BDF8] transition-colors"
        >
          {expanded ? 'Show less ↑' : 'Read more ↓'}
        </button>
      </div>

      {/* Keywords */}
      <div className="flex flex-wrap gap-2 mb-6">
        {pub.keywords.map((kw) => (
          <span key={kw} className="text-xs text-[#94A3B8] border border-[#1E2D40] bg-[#080D1A] px-2.5 py-1 rounded-full">
            {kw}
          </span>
        ))}
      </div>

      {/* Action buttons */}
      <div className="flex flex-wrap gap-3 pt-5 border-t border-[#1E2D40]">
        <a
          href={pub.doiUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-white transition-all duration-200 hover:opacity-90"
          style={{ background: 'linear-gradient(90deg, #0EA5E9 0%, #8B5CF6 100%)' }}
        >
          <ExternalLink className="w-3.5 h-3.5" />
          View Paper (DOI)
        </a>

        {pub.datasetUrl && (
          <a
            href={pub.datasetUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-[#0EA5E9] border border-[#0EA5E9]/40 hover:border-[#0EA5E9]/70 transition-all duration-200"
          >
            <Database className="w-3.5 h-3.5" />
            View Dataset
          </a>
        )}

        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-[#94A3B8] border border-[#1E2D40] hover:border-[#0EA5E9]/40 hover:text-[#0EA5E9] transition-all duration-200"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
          {copied ? 'Copied!' : 'Cite (BibTeX)'}
        </button>
      </div>
    </motion.div>
  )
}

export default function PublicationsPage() {
  return (
    <main className="min-h-screen bg-[#080D1A] pt-24 pb-20">
      <div className="max-w-[1600px] mx-auto px-5 sm:px-8 lg:px-10">

        {/* Back link */}
        <Link href="/" className="inline-flex items-center gap-2 text-[#94A3B8] hover:text-[#0EA5E9] text-sm mb-10 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <h1 className="text-4xl sm:text-5xl font-bold font-display bg-gradient-to-r from-[#0EA5E9] to-[#8B5CF6] bg-clip-text text-transparent mb-3">
            Publications
          </h1>
          <p className="text-[#94A3B8] text-base">
            Peer-reviewed research published at IEEE and Springer venues.
          </p>
        </motion.div>

        {/* Publication cards */}
        <div className="flex flex-col gap-8">
          {publications.map((pub, i) => (
            <PublicationCard key={pub.id} pub={pub} index={i} />
          ))}
        </div>

        {/* Research Focus section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 bg-[#0D1424] rounded-2xl border border-[#1E2D40] p-8"
        >
          <h2 className="text-2xl font-bold font-display bg-gradient-to-r from-[#0EA5E9] to-[#8B5CF6] bg-clip-text text-transparent mb-6">
            My Research Focus
          </h2>
          <div className="space-y-4">
            <p className="text-[#94A3B8] text-base leading-7">
              My published work spans computer vision and agricultural AI — demonstrating an ability to apply deep learning to high-stakes, domain-specific problems. The SIYO paper (IEEE ASPCC 2024) tackles medical imaging, where precision and reliability are non-negotiable. The TomatoDoc paper (Springer CIPR 2024) addresses food security challenges through accessible, smartphone-deployable AI — published alongside an open-source dataset designed to advance agricultural diagnostics globally.
            </p>
            <p className="text-[#94A3B8] text-base leading-7">
              My current MSc thesis extends this research trajectory into financial AI and explainability — investigating adversarial robustness and SHAP explanation stability in fraud detection models, mapped against EU AI Act 2024 compliance requirements. The thread connecting all my research is the same: building AI systems that are rigorous enough to publish, reliable enough to deploy, and honest enough to explain.
            </p>
          </div>
        </motion.div>

      </div>
    </main>
  )
}
