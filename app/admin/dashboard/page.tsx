'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts'
import { Users, Eye, MousePointerClick, MessageSquare } from 'lucide-react'

type DailyVisitor = { visit_date: string; visitor_count: number }
type ProjectClick = { project_name: string; click_count: number }

export default function DashboardPage() {
  const [visitors, setVisitors] = useState<DailyVisitor[]>([])
  const [projectClicks, setProjectClicks] = useState<ProjectClick[]>([])
  const [totalVisitors, setTotalVisitors] = useState(0)
  const [totalPageViews, setTotalPageViews] = useState(0)
  const [totalProjectClicks, setTotalProjectClicks] = useState(0)
  const [totalSubmissions, setTotalSubmissions] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      const supabase = createClient()

      const [visitorsRes, pageViewsRes, projectClicksRes, submissionsRes] = await Promise.all([
        supabase
          .from('daily_visitors')
          .select('visit_date, visitor_count')
          .order('visit_date', { ascending: true })
          .limit(30),
        supabase.from('page_views').select('view_count'),
        supabase.from('project_clicks').select('project_name, click_count'),
        supabase.from('contact_submissions').select('*', { count: 'exact', head: true }),
      ])

      if (visitorsRes.data) {
        setVisitors(visitorsRes.data)
        setTotalVisitors(visitorsRes.data.reduce((sum, v) => sum + (v.visitor_count ?? 0), 0))
      }
      if (pageViewsRes.data) {
        setTotalPageViews(pageViewsRes.data.reduce((sum, v) => sum + (v.view_count ?? 0), 0))
      }
      if (projectClicksRes.data) {
        setProjectClicks(projectClicksRes.data)
        setTotalProjectClicks(projectClicksRes.data.reduce((sum, v) => sum + (v.click_count ?? 0), 0))
      }
      if (submissionsRes.count !== null) {
        setTotalSubmissions(submissionsRes.count)
      }

      setLoading(false)
    }
    fetchData()
  }, [])

  const stats = [
    { label: 'Total Visitors', value: totalVisitors, icon: Users, accent: '#0EA5E9' },
    { label: 'Page Views', value: totalPageViews, icon: Eye, accent: '#8B5CF6' },
    { label: 'Project Clicks', value: totalProjectClicks, icon: MousePointerClick, accent: '#0EA5E9' },
    { label: 'Submissions', value: totalSubmissions, icon: MessageSquare, accent: '#8B5CF6' },
  ]

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-xl font-semibold text-white">Dashboard</h1>

      {loading ? (
        <p className="text-slate-400 text-sm">Loading…</p>
      ) : (
        <>
          {/* Stat cards */}
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
            {stats.map(({ label, value, icon: Icon, accent }) => (
              <div key={label} className="bg-[#0D1424] border border-[#1E2D40] rounded-xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-slate-400 text-xs font-medium uppercase tracking-wide">
                    {label}
                  </span>
                  <Icon className="w-4 h-4" style={{ color: accent }} />
                </div>
                <p className="text-2xl font-bold text-white">{value.toLocaleString()}</p>
              </div>
            ))}
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            {/* Line chart — daily visitors */}
            <div className="bg-[#0D1424] border border-[#1E2D40] rounded-xl p-5">
              <h2 className="text-sm font-medium text-slate-300 mb-4">Daily Visitors (last 30 days)</h2>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={visitors}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1E2D40" />
                  <XAxis
                    dataKey="visit_date"
                    tick={{ fill: '#64748b', fontSize: 11 }}
                    tickFormatter={(v: string) => v.slice(5)}
                  />
                  <YAxis tick={{ fill: '#64748b', fontSize: 11 }} />
                  <Tooltip
                    contentStyle={{
                      background: '#0D1424',
                      border: '1px solid #1E2D40',
                      borderRadius: 8,
                    }}
                    labelStyle={{ color: '#94a3b8' }}
                    itemStyle={{ color: '#0EA5E9' }}
                  />
                  <Line
                    type="monotone"
                    dataKey="visitor_count"
                    stroke="#0EA5E9"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Bar chart — project clicks */}
            <div className="bg-[#0D1424] border border-[#1E2D40] rounded-xl p-5">
              <h2 className="text-sm font-medium text-slate-300 mb-4">Project Clicks</h2>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={projectClicks}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1E2D40" />
                  <XAxis dataKey="project_name" tick={{ fill: '#64748b', fontSize: 11 }} />
                  <YAxis tick={{ fill: '#64748b', fontSize: 11 }} />
                  <Tooltip
                    contentStyle={{
                      background: '#0D1424',
                      border: '1px solid #1E2D40',
                      borderRadius: 8,
                    }}
                    labelStyle={{ color: '#94a3b8' }}
                    itemStyle={{ color: '#8B5CF6' }}
                  />
                  <Bar dataKey="click_count" fill="#8B5CF6" radius={4} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
