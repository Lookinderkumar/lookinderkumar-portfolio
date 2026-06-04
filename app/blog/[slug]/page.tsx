import Link from 'next/link'
import { blogPosts } from '@/data/blogPosts'
import { ArrowLeft, Clock } from 'lucide-react'
import { notFound } from 'next/navigation'

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }))
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((p) => p.slug === params.slug)
  if (!post) notFound()

  return (
    <main className="min-h-screen bg-[#080D1A] pt-24 pb-20">
      <div className="max-w-3xl mx-auto px-5 sm:px-8">
        <Link href="/blog" className="inline-flex items-center gap-2 text-[#94A3B8] hover:text-[#0EA5E9] text-sm mb-10 transition-colors">
          <ArrowLeft className="w-4 h-4" /> All Posts
        </Link>
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag) => (
            <span key={tag} className="text-xs text-[#0EA5E9] border border-[#0EA5E9]/30 bg-[#0EA5E9]/10 px-3 py-1 rounded-full">{tag}</span>
          ))}
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold font-display text-[#F1F5F9] mb-4 leading-tight">{post.title}</h1>
        <div className="flex items-center gap-4 text-[#94A3B8] text-sm mb-8">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#0EA5E9] to-[#8B5CF6] flex items-center justify-center text-white text-xs font-bold">LK</div>
            <span>Lookinder Kumar</span>
          </div>
          <span>{post.date}</span>
          <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{post.readTime}</span>
        </div>
        <hr className="border-[#1E2D40] mb-8" />

        {/* Coming Soon overlay */}
        <div className="relative rounded-2xl border border-[#1E2D40] bg-[#0D1424] p-12 text-center">
          <div className="text-4xl mb-4">✍️</div>
          <h2 className="text-xl font-bold font-display text-[#F1F5F9] mb-3">Article Coming Soon</h2>
          <p className="text-[#94A3B8] text-sm leading-6 max-w-md mx-auto mb-6">
            This article is currently being written. The full content will be published soon. In the meantime, here is a preview of what it covers:
          </p>
          <p className="text-[#94A3B8] text-sm leading-7 italic border border-[#1E2D40] rounded-xl p-4 text-left">
            {post.excerpt}
          </p>
        </div>
      </div>
    </main>
  )
}
