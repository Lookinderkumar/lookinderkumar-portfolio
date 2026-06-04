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

type DailyVisitor = { visit_date: string; visitor_count: number }
type PageView = { page_name: string; view_count: number }
type ProjectClick = { project_name: string; click_count: number }

const TOOLTIP_STYLE = {
  contentStyle: { background: '#0D1424', border: '1px solid #1E2D40', borderRadius: 8 },
  labelStyle: { color: '#94a3b8' },
}

export default function AnalyticsPage() {
  const [visitors, setVisitors] = useState<DailyVisitor[]>([])
  const [pageViews, setPageViews] = useState<PageView[]>([])
  const [projectClicks, setProjectClicks] = useState<ProjectClick[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      const supabase = createClient()

      const [vRes, pvRes, pcRes] = await Promise.all([
        supabase
          .from('daily_visitors')
          .select('visit_date, visitor_count')
          .order('visit_date', { ascending: true })
          .limit(60),
        supabase
          .from('page_views')
          .select('page_name, view_count')
          .order('view_count', { ascending: false }),
        supabase
          .from('project_clicks')
          .select('project_name, click_count')
          .order('click_count', { ascending: false }),
      ])

      if (vRes.data) setVisitors(vRes.data)
      if (pvRes.data) setPageViews(pvRes.data)
      if (pcRes.data) setProjectClicks(pcRes.data)
      setLoading(false)
    }
    fetchData()
  }, [])

  if (loading) return <p className="p-6 text-slate-400 text-sm">Loading…</p>

  return (
    <div className="p-6 space-y-5">
      <h1 className="text-xl font-semibold text-white">Analytics</h1>

      {/* Visitors over time */}
      <div className="bg-[#0D1424] border border-[#1E2D40] rounded-xl p-5">
        <h2 className="text-sm font-medium text-slate-300 mb-4">Daily Visitors</h2>
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={visitors}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1E2D40" />
            <XAxis
              dataKey="visit_date"
              tick={{ fill: '#64748b', fontSize: 11 }}
              tickFormatter={(v: string) => v.slice(5)}
            />
            <YAxis tick={{ fill: '#64748b', fontSize: 11 }} />
            <Tooltip {...TOOLTIP_STYLE} itemStyle={{ color: '#0EA5E9' }} />
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

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {/* Page views */}
        <div className="bg-[#0D1424] border border-[#1E2D40] rounded-xl p-5">
          <h2 className="text-sm font-medium text-slate-300 mb-4">Page Views</h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={pageViews}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1E2D40" />
              <XAxis dataKey="page_name" tick={{ fill: '#64748b', fontSize: 11 }} />
              <YAxis tick={{ fill: '#64748b', fontSize: 11 }} />
              <Tooltip {...TOOLTIP_STYLE} itemStyle={{ color: '#8B5CF6' }} />
              <Bar dataKey="view_count" fill="#8B5CF6" radius={4} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Project clicks */}
        <div className="bg-[#0D1424] border border-[#1E2D40] rounded-xl p-5">
          <h2 className="text-sm font-medium text-slate-300 mb-4">Project Clicks</h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={projectClicks}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1E2D40" />
              <XAxis dataKey="project_name" tick={{ fill: '#64748b', fontSize: 11 }} />
              <YAxis tick={{ fill: '#64748b', fontSize: 11 }} />
              <Tooltip {...TOOLTIP_STYLE} itemStyle={{ color: '#0EA5E9' }} />
              <Bar dataKey="click_count" fill="#0EA5E9" radius={4} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
