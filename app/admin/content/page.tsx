'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { ExternalLink } from 'lucide-react'

type Project = {
  id: string
  title: string
  description: string
  tags: string[] | null
  github_url: string | null
  demo_url: string | null
  created_at: string
}

type BlogPost = {
  id: string
  title: string
  slug: string
  excerpt: string | null
  published: boolean
  created_at: string
}

export default function ContentPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      const supabase = createClient()
      const [projRes, postsRes] = await Promise.all([
        supabase.from('projects').select('*').order('created_at', { ascending: false }),
        supabase.from('blog_posts').select('*').order('created_at', { ascending: false }),
      ])
      if (projRes.data) setProjects(projRes.data)
      if (postsRes.data) setPosts(postsRes.data)
      setLoading(false)
    }
    fetchData()
  }, [])

  if (loading) return <p className="p-6 text-slate-400 text-sm">Loading…</p>

  return (
    <div className="p-6 space-y-7">
      <h1 className="text-xl font-semibold text-white">Content</h1>

      {/* Projects */}
      <section>
        <h2 className="text-sm font-medium text-slate-300 mb-3">
          Projects <span className="text-slate-500">({projects.length})</span>
        </h2>
        <div className="bg-[#0D1424] border border-[#1E2D40] rounded-xl overflow-hidden">
          {projects.length === 0 ? (
            <p className="p-5 text-slate-400 text-sm">No projects found.</p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#1E2D40]">
                  <th className="text-left px-5 py-3 text-slate-400 font-medium">Title</th>
                  <th className="text-left px-5 py-3 text-slate-400 font-medium hidden md:table-cell">
                    Tags
                  </th>
                  <th className="text-left px-5 py-3 text-slate-400 font-medium hidden lg:table-cell">
                    Date
                  </th>
                  <th className="px-5 py-3 text-slate-400 font-medium text-center">Links</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((p) => (
                  <tr
                    key={p.id}
                    className="border-b border-[#1E2D40] last:border-0 hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="px-5 py-3">
                      <p className="text-white font-medium">{p.title}</p>
                      {p.description && (
                        <p className="text-slate-400 text-xs mt-0.5 truncate max-w-[240px]">
                          {p.description}
                        </p>
                      )}
                    </td>
                    <td className="px-5 py-3 hidden md:table-cell">
                      <div className="flex flex-wrap gap-1">
                        {(p.tags ?? []).slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 bg-[#1E2D40] text-slate-300 text-xs rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-5 py-3 text-slate-400 text-xs hidden lg:table-cell">
                      {new Date(p.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-5 py-3 text-center">
                      <div className="flex items-center justify-center gap-3">
                        {p.github_url && (
                          <a
                            href={p.github_url}
                            target="_blank"
                            rel="noreferrer"
                            className="text-slate-400 hover:text-[#0EA5E9] transition-colors"
                            title="GitHub"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                        {p.demo_url && (
                          <a
                            href={p.demo_url}
                            target="_blank"
                            rel="noreferrer"
                            className="text-slate-400 hover:text-[#8B5CF6] transition-colors"
                            title="Demo"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>

      {/* Blog posts */}
      <section>
        <h2 className="text-sm font-medium text-slate-300 mb-3">
          Blog Posts <span className="text-slate-500">({posts.length})</span>
        </h2>
        <div className="bg-[#0D1424] border border-[#1E2D40] rounded-xl overflow-hidden">
          {posts.length === 0 ? (
            <p className="p-5 text-slate-400 text-sm">No blog posts found.</p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#1E2D40]">
                  <th className="text-left px-5 py-3 text-slate-400 font-medium">Title</th>
                  <th className="text-left px-5 py-3 text-slate-400 font-medium hidden md:table-cell">
                    Slug
                  </th>
                  <th className="text-left px-5 py-3 text-slate-400 font-medium hidden lg:table-cell">
                    Date
                  </th>
                  <th className="text-left px-5 py-3 text-slate-400 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((p) => (
                  <tr
                    key={p.id}
                    className="border-b border-[#1E2D40] last:border-0 hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="px-5 py-3">
                      <p className="text-white font-medium">{p.title}</p>
                      {p.excerpt && (
                        <p className="text-slate-400 text-xs mt-0.5 truncate max-w-[240px]">
                          {p.excerpt}
                        </p>
                      )}
                    </td>
                    <td className="px-5 py-3 text-slate-400 font-mono text-xs hidden md:table-cell">
                      /{p.slug}
                    </td>
                    <td className="px-5 py-3 text-slate-400 text-xs hidden lg:table-cell">
                      {new Date(p.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-5 py-3">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          p.published
                            ? 'bg-green-400/10 text-green-400'
                            : 'bg-slate-400/10 text-slate-400'
                        }`}
                      >
                        {p.published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>
    </div>
  )
}
