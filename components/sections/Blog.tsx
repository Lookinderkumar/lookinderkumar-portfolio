'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock, Tag, Search, ArrowRight, Star } from 'lucide-react'
import Link from 'next/link'
import { blogPosts, blogFilterTags, type BlogPost } from '@/data/blogPosts'

function FeaturedCard({ post }: { post: BlogPost }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] bg-[#0D1424] rounded-2xl border border-[#1E2D40] overflow-hidden hover:border-[#0EA5E9]/50 transition-all duration-300 hover:shadow-[0_0_40px_rgba(14,165,233,0.08)] mb-8"
    >
      {/* Left image area */}
      <div className="relative h-56 lg:h-auto bg-gradient-to-br from-[#0D1424] to-[#1a1f35] flex items-center justify-center min-h-[220px]">
        <Tag className="w-12 h-12 text-[#0EA5E9]/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0D1424]/20" />
      </div>
      {/* Right content */}
      <div className="p-8 lg:p-10 flex flex-col justify-center">
        <div className="mb-4">
          <span className="inline-flex items-center gap-1.5 bg-[#7C3AED] text-white text-xs font-medium px-3 py-1.5 rounded-full">
            <Star className="w-3 h-3 fill-white" />
            Featured Post
          </span>
        </div>
        <h3 className="text-xl sm:text-2xl font-bold font-display text-[#F1F5F9] mb-3 leading-snug">
          {post.title}
        </h3>
        <p className="text-[#94A3B8] text-sm leading-6 mb-5">
          {post.excerpt}
        </p>
        <div className="flex items-center gap-4 text-[#94A3B8] text-sm mb-6">
          <span>{post.date}</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {post.readTime}
          </span>
        </div>
        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex items-center gap-2 text-[#0EA5E9] text-sm font-medium hover:text-[#38BDF8] transition-colors group"
        >
          Read Article
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.div>
  )
}

function BlogCard({ post, index }: { post: BlogPost; index: number }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="bg-[#0D1424] rounded-2xl border border-[#1E2D40] overflow-hidden flex flex-col hover:border-[#0EA5E9]/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(14,165,233,0.08)]"
    >
      {/* Image area */}
      <div className="h-40 bg-gradient-to-br from-[#0D1424] to-[#1a1f35] flex items-center justify-center">
        <Tag className="w-8 h-8 text-[#0EA5E9]/20" />
      </div>
      {/* Card body */}
      <div className="p-6 flex flex-col flex-1">
        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {post.tags.map((tag) => (
            <span key={tag} className="text-xs text-[#0EA5E9] border border-[#0EA5E9]/30 bg-[#0EA5E9]/10 px-2 py-0.5 rounded-full">
              {tag}
            </span>
          ))}
        </div>
        {/* Title */}
        <h3 className="text-base font-bold font-display text-[#F1F5F9] mb-2 leading-snug flex-1">
          {post.title}
        </h3>
        {/* Excerpt */}
        <p className="text-[#94A3B8] text-sm leading-6 mb-4 line-clamp-2">
          {post.excerpt}
        </p>
        {/* Meta */}
        <div className="flex items-center gap-3 text-[#94A3B8] text-xs mb-4 pt-3 border-t border-[#1E2D40]">
          <span>{post.date}</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {post.readTime}
          </span>
        </div>
        {/* CTA */}
        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex items-center gap-1.5 text-[#0EA5E9] text-sm font-medium hover:text-[#38BDF8] transition-colors group"
        >
          Read Article
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.div>
  )
}

export default function Blog() {
  const [activeTag, setActiveTag] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const featuredPost = blogPosts.find((p) => p.featured)

  const filtered = blogPosts.filter((post) => {
    const matchesTag = activeTag === 'All' || post.tags.includes(activeTag)
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesTag && matchesSearch
  })

  const nonFeaturedFiltered = filtered.filter((p) => !p.featured || activeTag !== 'All' || searchQuery !== '')

  return (
    <section id="blog" className="py-16 bg-[#080D1A]">
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
            Blog
          </h2>
          <p className="text-[#94A3B8] text-sm sm:text-base mt-3">
            Thoughts on data science, ML engineering, and AI research
          </p>
        </motion.div>

        {/* Filter tags + Search row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
          <div className="flex flex-wrap gap-2">
            {blogFilterTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeTag === tag
                    ? 'bg-[#0EA5E9] text-white shadow-[0_0_15px_rgba(14,165,233,0.3)]'
                    : 'border border-[#1E2D40] text-[#94A3B8] hover:border-[#0EA5E9]/50 hover:text-[#0EA5E9] bg-transparent'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
            <input
              type="text"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0D1424] border border-[#1E2D40] rounded-full pl-9 pr-4 py-2 text-sm text-[#F1F5F9] placeholder-[#94A3B8] focus:outline-none focus:border-[#0EA5E9]/50 transition-colors"
            />
          </div>
        </div>

        {/* Featured post — only show when no filter/search active */}
        {featuredPost && activeTag === 'All' && searchQuery === '' && (
          <FeaturedCard post={featuredPost} />
        )}

        {/* Regular cards grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {(activeTag === 'All' && searchQuery === '' ? nonFeaturedFiltered : filtered).map((post, i) => (
              <BlogCard key={post.id} post={post} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View all link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[#0EA5E9] text-sm font-medium hover:text-[#38BDF8] transition-colors group border border-[#0EA5E9]/30 px-6 py-2.5 rounded-full hover:border-[#0EA5E9]/60"
          >
            View All Posts
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

      </div>
    </section>
  )
}
