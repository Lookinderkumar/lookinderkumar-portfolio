import Link from 'next/link'
import { blogPosts } from '@/data/blogPosts'
import { ArrowLeft, Clock, Tag } from 'lucide-react'

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-[#080D1A] pt-24 pb-20">
      <div className="max-w-[1600px] mx-auto px-5 sm:px-8 lg:px-10">
        <Link href="/#blog" className="inline-flex items-center gap-2 text-[#94A3B8] hover:text-[#0EA5E9] text-sm mb-10 transition-colors">
          <ArrowLeft className="w-4 h-4" /> All Posts
        </Link>
        <h1 className="text-4xl font-bold font-display bg-gradient-to-r from-[#0EA5E9] to-[#8B5CF6] bg-clip-text text-transparent mb-4">Blog</h1>
        <p className="text-[#94A3B8] mb-12">Thoughts on data science, ML engineering, and AI research</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="bg-[#0D1424] rounded-2xl border border-[#1E2D40] p-6 hover:border-[#0EA5E9]/50 transition-all duration-300 block">
              <div className="flex flex-wrap gap-1.5 mb-3">
                {post.tags.map((tag) => (
                  <span key={tag} className="text-xs text-[#0EA5E9] border border-[#0EA5E9]/30 bg-[#0EA5E9]/10 px-2 py-0.5 rounded-full">{tag}</span>
                ))}
              </div>
              <h2 className="text-base font-bold font-display text-[#F1F5F9] mb-2">{post.title}</h2>
              <p className="text-[#94A3B8] text-sm leading-6 mb-4 line-clamp-2">{post.excerpt}</p>
              <div className="flex items-center gap-3 text-[#94A3B8] text-xs">
                <span>{post.date}</span>
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
