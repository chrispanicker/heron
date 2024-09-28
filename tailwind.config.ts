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
        'mini': { 'raw': '(max-height: 600px)' },
        'avg': { 'raw': '(max-height: 750px)' },
        'large': { 'raw': '(max-height: 900px)' },
        'big': { 'raw': '(max-height: 1000px)' },
      },
      cursor:{
        pointer: `cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24'%3E%3Cdefs%3E%3Cstyle%3E .cls-1 %7B fill: %23d1d5db; stroke: %23000; stroke-miterlimit: 10; stroke-width: .75px; %7D %3C/style%3E%3C/defs%3E%3Cpath class='cls-1' d='M8.64,11.67s1.08-.77,1.44-1.13c.21-.21.7-.94.7-.94.35-.35.92-.35,1.27,0l9.84,10.79c.32.35.6.74.84,1.16,0,0,.89,1.54.73,1.78-.07.11-.26.18-.49.24-.58.14-1.19.06-1.73-.18-.88-.38-2.35-1.06-2.94-1.58l-9.67-8.9c-.35-.35-.35-.9,0-1.25Z'/%3E%3Cpath class='cls-1' d='M8.56,9.4l-.8.77c-.46.44-1.09.67-1.73.63l-.3-.02c-1.14-.08-2.21-.54-3.03-1.32h0C1.09,7.93.19,5.82.19,3.62V.35s.73.72.73.72c.37.37.87.57,1.4.57h0c2.08,0,4.08.82,5.56,2.27h0c1.14,1.13,1.64,2.75,1.33,4.32h0c-.09.44-.31.85-.64,1.17Z'/%3E%3C/svg%3E"), pointer;
`
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
