'use client'
import { createClient } from '@/lib/supabase/client'

export async function trackPageView(path: string, name: string) {
  try {
    const supabase = createClient()
    await supabase.rpc('increment_page_view', {
      page_path_input: path,
      page_name_input: name,
    })
  } catch {}
}

export async function trackProjectClick(slug: string) {
  try {
    const supabase = createClient()
    await supabase.rpc('increment_project_click', { slug_input: slug })
  } catch {}
}

export async function trackDailyVisitor() {
  try {
    if (typeof window === 'undefined') return
    if (sessionStorage.getItem('lk_visited')) return
    sessionStorage.setItem('lk_visited', 'true')
    const supabase = createClient()
    await supabase.rpc('increment_daily_visitor')
  } catch {}
}
