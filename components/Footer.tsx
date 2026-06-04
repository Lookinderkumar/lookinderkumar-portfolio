import Link from 'next/link'
import { Mail } from 'lucide-react'
import { FaGithub, FaLinkedin } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="bg-[#060A14] border-t border-[#1E2D40]">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-10 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Column 1 — Brand */}
          <div>
            <h3 className="text-xl font-bold font-display bg-gradient-to-r from-[#0EA5E9] to-[#8B5CF6] bg-clip-text text-transparent mb-3">
              Lookinder Kumar
            </h3>
            <p className="text-[#94A3B8] text-sm leading-6 max-w-xs">
              AI Engineer &amp; MSc Student based in Dublin, Ireland. Building intelligent systems at the intersection of AI and regulated industries.
            </p>
          </div>

          {/* Column 2 — Quick Links */}
          <div>
            <h4 className="text-[#F1F5F9] text-sm font-semibold uppercase tracking-wider mb-5">Quick Links</h4>
            <div className="grid grid-cols-2 gap-x-6 gap-y-2.5">
              {[
                { label: 'About', href: '/#about' },
                { label: 'Projects', href: '/#projects' },
                { label: 'Blog', href: '/blog' },
                { label: 'Resume', href: '/#resume' },
                { label: 'Skills', href: '/#skills' },
                { label: 'Contact', href: '/#contact' },
              ].map((link) => (
                <Link key={link.label} href={link.href}
                  className="text-[#94A3B8] text-sm hover:text-[#0EA5E9] transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Column 3 — Connect */}
          <div>
            <h4 className="text-[#F1F5F9] text-sm font-semibold uppercase tracking-wider mb-5">Connect</h4>
            <div className="flex gap-3">
              <a href="https://github.com/Lookinderkumar" target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-[#0D1424] border border-[#1E2D40] flex items-center justify-center text-[#94A3B8] hover:text-[#0EA5E9] hover:border-[#0EA5E9]/50 transition-all duration-200">
                <FaGithub className="w-4 h-4" />
              </a>
              <a href="https://linkedin.com/in/lookinder-kumar" target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-[#0D1424] border border-[#1E2D40] flex items-center justify-center text-[#94A3B8] hover:text-[#0EA5E9] hover:border-[#0EA5E9]/50 transition-all duration-200">
                <FaLinkedin className="w-4 h-4" />
              </a>
              <a href="mailto:lookinderkumar2011@gmail.com"
                className="w-10 h-10 rounded-xl bg-[#0D1424] border border-[#1E2D40] flex items-center justify-center text-[#94A3B8] hover:text-[#0EA5E9] hover:border-[#0EA5E9]/50 transition-all duration-200">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom strip */}
        <div className="border-t border-[#1E2D40] mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[#4B5563] text-xs">© 2026 Lookinder Kumar. All rights reserved.</p>
          <p className="text-[#4B5563] text-xs">Built with Next.js &amp; Tailwind CSS. Deployed on Vercel.</p>
        </div>
      </div>
    </footer>
  )
}
