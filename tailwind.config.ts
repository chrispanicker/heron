import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      display: ["group-hover"],
      screens:{
        'larger': { 'raw': '(min-width: 1400px)' },
        'huge': { 'raw': '(min-width: 1300px)' },
      },
      cursor:{
        select: `cursor: url("data:image/svg+xml,%3Csvg id='Layer_1' data-name='Layer 1' xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24'%3E%3Cdefs%3E%3Cstyle%3E .cls-1 %7B fill: %23d1d5db; stroke: %23000; stroke-miterlimit: 10; stroke-width: .75px; %7D %3C/style%3E%3C/defs%3E%3Cpath class='cls-1' d='M5.5,11.31s1-.32,1.36-.51c.21-.11.75-.54.75-.54.35-.18.78-.04.96.3l4.84,10.5c.16.34.28.7.36,1.08,0,0,.3,1.38.12,1.52-.08.07-.24.07-.43.06-.47-.03-.91-.24-1.26-.55-.57-.5-1.52-1.36-1.84-1.9l-5.17-9.03c-.18-.35-.05-.76.3-.94h0Z'/%3E%3Cpath class='cls-1' d='M5.98,9.58l-.79.39c-.45.22-.98.24-1.46.06l-.22-.09c-.84-.33-1.54-.94-1.97-1.72h0c-.85-1.54-1.02-3.35-.5-5.01L1.83.75l.38.72c.19.37.52.64.92.77h0c1.57.5,2.88,1.6,3.65,3.04h0c.59,1.13.58,2.47-.03,3.58h0c-.17.31-.44.57-.76.73h0Z'/%3E%3C/svg%3E"), pointer;`
      },
      colors:{
        bkg: "#b0ac8c" 
      },
      fontFamily:{
        flatspot: ["var(--font-flatspot)"]
      },
      fontSize:{
        sm: '.8rem'
      },
      borderRadius:{
        nun: '0rem'
      },
      width:{
        0: '0vw'
      },
      height:{
        0: '0vh'
      }
    },
    
  },
  plugins: [],
}
export default config
