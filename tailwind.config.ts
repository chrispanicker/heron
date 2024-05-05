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
