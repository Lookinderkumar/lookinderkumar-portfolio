'use client'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { trackPageView, trackDailyVisitor } from '@/lib/analytics'

const PAGE_NAMES: Record<string, string> = {
  '/': 'Home',
  '/blog': 'Blog Listing',
  '/publications': 'Publications',
}

export default function Analytics() {
  const pathname = usePathname()

  useEffect(() => {
    trackDailyVisitor()
  }, [])

  useEffect(() => {
    const name = PAGE_NAMES[pathname] ?? pathname
    trackPageView(pathname, name)
  }, [pathname])

  return null
}
