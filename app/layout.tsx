import type { Metadata } from 'next'
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Analytics from '@/components/Analytics'

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
  display: 'swap',
})

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Lookinder Kumar — AI Engineer & MSc Big Data',
  description:
    'Portfolio of Lookinder Kumar. MSc Big Data @ Griffith Dublin. AI Engineer building LLM systems, fraud detection, and data pipelines. Open to AI Engineering roles in Dublin and PhD opportunities in EU/UK/Canada.',
  keywords: [
    'Lookinder Kumar',
    'AI Engineer',
    'MSc Big Data',
    'Griffith Dublin',
    'LLM',
    'Machine Learning',
    'Fraud Detection',
    'Data Pipelines',
    'Next.js',
    'Python',
    'Dublin',
    'PhD',
  ],
  authors: [{ name: 'Lookinder Kumar' }],
  creator: 'Lookinder Kumar',
  openGraph: {
    type: 'website',
    url: 'https://lookinderkumar.com',
    title: 'Lookinder Kumar — AI Engineer & MSc Big Data',
    description:
      'Portfolio of Lookinder Kumar. MSc Big Data @ Griffith Dublin. AI Engineer building LLM systems, fraud detection, and data pipelines. Open to AI Engineering roles in Dublin and PhD opportunities in EU/UK/Canada.',
    siteName: 'Lookinder Kumar Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lookinder Kumar — AI Engineer & MSc Big Data',
    description:
      'Portfolio of Lookinder Kumar. MSc Big Data @ Griffith Dublin. AI Engineer building LLM systems, fraud detection, and data pipelines.',
    creator: '@lookinderkumar',
  },
  metadataBase: new URL('https://lookinderkumar.com'),
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full" suppressHydrationWarning>
        <Analytics />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
