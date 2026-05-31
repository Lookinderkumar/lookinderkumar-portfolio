'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { usePathname } from 'next/navigation'

const navLinks = [
  { label: 'Home',     href: '#hero',     isPage: false },
  { label: 'About',    href: '#about',    isPage: false },
  { label: 'Skills',   href: '#skills',   isPage: false },
  { label: 'Projects', href: '#projects', isPage: false },
  { label: 'Blog',     href: '/blog',     isPage: true  },
  { label: 'Resume',   href: '/resume',   isPage: true  },
  { label: 'Contact',  href: '#contact',  isPage: false },
]

export default function Navbar() {
  const [scrolled, setScrolled]         = useState(false)
  const [mobileOpen, setMobileOpen]     = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sectionIds = ['hero', 'about', 'skills', 'projects', 'contact']
    const observers = sectionIds.map((id) => {
      const el = document.getElementById(id)
      if (!el) return null
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id) },
        { rootMargin: '-40% 0px -55% 0px' },
      )
      observer.observe(el)
      return observer
    })
    return () => observers.forEach((o) => o?.disconnect())
  }, [])

  const isActive = (link: (typeof navLinks)[0]) => {
    if (link.isPage) return pathname === link.href
    return activeSection === link.href.replace('#', '')
  }

  const handleNavClick = (href: string, isPage: boolean) => {
    setMobileOpen(false)
    if (!isPage) {
      document.getElementById(href.replace('#', ''))?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-[#080D1A]/90 backdrop-blur-md border-b border-[#1E293B]' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">

          {/* Logo */}
          <a
            href="/"
            className="font-bold text-xl lg:text-2xl bg-gradient-to-r from-[#0EA5E9] to-[#8B5CF6] bg-clip-text text-transparent"
          >
            LK
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  if (!link.isPage) { e.preventDefault(); handleNavClick(link.href, false) }
                }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(link)
                    ? 'text-[#0EA5E9] bg-[#0EA5E9]/15'
                    : 'text-[#94A3B8] hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-[#94A3B8] hover:text-white transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-[#080D1A]/98 backdrop-blur-md flex flex-col items-center justify-center gap-6 md:hidden"
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                onClick={(e) => {
                  if (!link.isPage) { e.preventDefault(); handleNavClick(link.href, false) }
                  setMobileOpen(false)
                }}
                className={`text-2xl font-medium transition-colors ${
                  isActive(link) ? 'text-[#0EA5E9]' : 'text-[#94A3B8] hover:text-white'
                }`}
              >
                {link.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
