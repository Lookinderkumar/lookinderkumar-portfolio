'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { X, Mail } from 'lucide-react'

type Submission = {
  id: string
  created_at: string
  name: string
  email: string
  enquiry_type: string
  subject: string
  message: string
  status: string
}

const TABS = ['all', 'new', 'replied', 'closed'] as const
type Tab = typeof TABS[number]

function StatusBadge({ status }: { status: string }) {
  const cls: Record<string, string> = {
    new: 'text-[#0EA5E9] bg-[#0EA5E9]/10',
    replied: 'text-green-400 bg-green-400/10',
    closed: 'text-slate-400 bg-slate-400/10',
  }
  return (
    <span
      className={`px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
        cls[status] ?? 'text-slate-400 bg-slate-400/10'
      }`}
    >
      {status}
    </span>
  )
}

export default function SubmissionsPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [filter, setFilter] = useState<Tab>('all')
  const [selected, setSelected] = useState<Submission | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetch() {
      const supabase = createClient()
      const { data } = await supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false })
      if (data) setSubmissions(data)
      setLoading(false)
    }
    fetch()
  }, [])

  async function updateStatus(id: string, status: string) {
    const supabase = createClient()
    await supabase.from('contact_submissions').update({ status }).eq('id', id)
    setSubmissions((prev) => prev.map((s) => (s.id === id ? { ...s, status } : s)))
    setSelected((prev) => (prev?.id === id ? { ...prev, status } : prev))
  }

  const tabCount = (tab: Tab) =>
    tab === 'all' ? submissions.length : submissions.filter((s) => s.status === tab).length

  const filtered =
    filter === 'all' ? submissions : submissions.filter((s) => s.status === filter)

  return (
    <div className="p-6 space-y-5">
      <h1 className="text-xl font-semibold text-white">Submissions</h1>

      {/* Filter tabs */}
      <div className="flex gap-1 bg-[#0D1424] border border-[#1E2D40] rounded-lg p-1 w-fit">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-4 py-1.5 rounded-md text-sm capitalize transition-colors ${
              filter === tab
                ? 'bg-[#0EA5E9]/10 text-[#0EA5E9] font-medium'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {tab}
            <span className="ml-1.5 text-xs opacity-60">({tabCount(tab)})</span>
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-[#0D1424] border border-[#1E2D40] rounded-xl overflow-hidden">
        {loading ? (
          <p className="p-6 text-slate-400 text-sm">Loading…</p>
        ) : filtered.length === 0 ? (
          <p className="p-6 text-slate-400 text-sm">No submissions found.</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#1E2D40]">
                {['Name', 'Subject', 'Type', 'Date', 'Status'].map((h) => (
                  <th
                    key={h}
                    className={`text-left px-5 py-3 text-slate-400 font-medium ${
                      h === 'Type' ? 'hidden md:table-cell' : h === 'Date' ? 'hidden lg:table-cell' : ''
                    }`}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((s) => (
                <tr
                  key={s.id}
                  onClick={() => setSelected(s)}
                  className="border-b border-[#1E2D40] last:border-0 cursor-pointer hover:bg-white/[0.02] transition-colors"
                >
                  <td className="px-5 py-3 text-white font-medium">{s.name}</td>
                  <td className="px-5 py-3 text-slate-300 max-w-[200px] truncate">{s.subject}</td>
                  <td className="px-5 py-3 text-slate-400 hidden md:table-cell">{s.enquiry_type}</td>
                  <td className="px-5 py-3 text-slate-400 hidden lg:table-cell text-xs">
                    {new Date(s.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-5 py-3">
                    <StatusBadge status={s.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Detail modal */}
      {selected && (
        <div className="fixed inset-0 z-[200] bg-black/60 flex items-center justify-center p-4">
          <div className="bg-[#0D1424] border border-[#1E2D40] rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-start justify-between px-6 py-4 border-b border-[#1E2D40]">
              <h2 className="text-base font-semibold text-white pr-4">{selected.subject}</h2>
              <button
                onClick={() => setSelected(null)}
                className="text-slate-400 hover:text-white transition-colors flex-shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="px-6 py-4 space-y-4">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-slate-400 mb-0.5">From</p>
                  <p className="text-white">{selected.name}</p>
                </div>
                <div>
                  <p className="text-slate-400 mb-0.5">Email</p>
                  <p className="text-[#0EA5E9] text-xs break-all">{selected.email}</p>
                </div>
                <div>
                  <p className="text-slate-400 mb-0.5">Type</p>
                  <p className="text-white capitalize">{selected.enquiry_type}</p>
                </div>
                <div>
                  <p className="text-slate-400 mb-0.5">Received</p>
                  <p className="text-white text-xs">
                    {new Date(selected.created_at).toLocaleString()}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-slate-400 text-sm mb-2">Message</p>
                <p className="text-slate-200 text-sm leading-relaxed bg-[#080D1A] border border-[#1E2D40] rounded-lg p-4 whitespace-pre-wrap">
                  {selected.message}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <p className="text-slate-400 text-sm">Status</p>
                <select
                  value={selected.status}
                  onChange={(e) => updateStatus(selected.id, e.target.value)}
                  className="bg-[#080D1A] border border-[#1E2D40] text-white text-sm rounded-lg px-3 py-1.5 focus:outline-none focus:border-[#0EA5E9] transition-colors"
                >
                  {['new', 'replied', 'closed'].map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 pb-5">
              <a
                href={`mailto:${selected.email}?subject=Re%3A%20${encodeURIComponent(selected.subject)}&body=Hi%20${encodeURIComponent(selected.name)}%2C%0A%0A`}
                className="flex items-center justify-center gap-2 w-full bg-[#0EA5E9] hover:bg-[#0284C7] text-white text-sm font-medium py-2.5 rounded-lg transition-colors"
              >
                <Mail className="w-4 h-4" />
                Reply via Email
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
