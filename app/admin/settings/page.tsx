'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Save, Check } from 'lucide-react'

type Settings = {
  hiring_status: string
  admin_email: string
}

const HIRING_OPTIONS = [
  { value: 'open', label: 'Open to Work' },
  { value: 'selective', label: 'Selectively Open' },
  { value: 'closed', label: 'Not Available' },
]

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings>({
    hiring_status: 'open',
    admin_email: '',
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    async function fetchSettings() {
      const supabase = createClient()
      const { data } = await supabase.from('site_settings').select('*').limit(1).single()
      if (data) {
        setSettings({
          hiring_status: data.hiring_status ?? 'open',
          admin_email: data.admin_email ?? '',
        })
      }
      setLoading(false)
    }
    fetchSettings()
  }, [])

  async function handleSave() {
    setSaving(true)
    const supabase = createClient()
    await supabase.from('site_settings').upsert(
      {
        id: 1,
        hiring_status: settings.hiring_status,
        admin_email: settings.admin_email,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'id' }
    )
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  if (loading) return <p className="p-6 text-slate-400 text-sm">Loading…</p>

  return (
    <div className="p-6 max-w-xl space-y-5">
      <h1 className="text-xl font-semibold text-white">Settings</h1>

      <div className="bg-[#0D1424] border border-[#1E2D40] rounded-xl p-5 space-y-5">
        {/* Hiring status */}
        <div>
          <label className="block text-sm text-slate-300 mb-1.5">Hiring Status</label>
          <select
            value={settings.hiring_status}
            onChange={(e) =>
              setSettings((prev) => ({ ...prev, hiring_status: e.target.value }))
            }
            className="w-full bg-[#080D1A] border border-[#1E2D40] text-white text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:border-[#0EA5E9] transition-colors"
          >
            {HIRING_OPTIONS.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
          <p className="text-xs text-slate-500 mt-1.5">
            Controls the availability badge displayed on your portfolio.
          </p>
        </div>

        {/* Admin email */}
        <div>
          <label className="block text-sm text-slate-300 mb-1.5">Admin Email</label>
          <input
            type="email"
            value={settings.admin_email}
            onChange={(e) =>
              setSettings((prev) => ({ ...prev, admin_email: e.target.value }))
            }
            className="w-full bg-[#080D1A] border border-[#1E2D40] text-white text-sm rounded-lg px-4 py-2.5 placeholder-slate-600 focus:outline-none focus:border-[#0EA5E9] transition-colors"
            placeholder="admin@example.com"
          />
          <p className="text-xs text-slate-500 mt-1.5">
            Used for receiving contact form notifications.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 bg-[#0EA5E9] hover:bg-[#0284C7] text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {saved ? (
            <>
              <Check className="w-4 h-4" />
              Saved!
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              {saving ? 'Saving…' : 'Save Changes'}
            </>
          )}
        </button>
      </div>
    </div>
  )
}
