import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      sm:  '640px',
      md:  '768px',
      lg:  '1024px',
      xl:  '1280px',
      '2xl': '1536px',
      '3xl': '1920px',
    },
    extend: {
      fontFamily: {
        display: ['Space Grotesk', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        navy: {
          950: '#050B18',
          900: '#0F172A',
          800: '#1E293B',
          700: '#334155',
        },
        accent: {
          cyan: '#0EA5E9',
          purple: '#8B5CF6',
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        glow: 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px #0EA5E9, 0 0 10px #0EA5E9' },
          '100%': { boxShadow: '0 0 20px #0EA5E9, 0 0 40px #0EA5E9, 0 0 60px #0EA5E9' },
        },
      },
    },
  },
  plugins: [],
}

export default config
