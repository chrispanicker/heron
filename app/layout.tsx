import type { Metadata } from 'next'
import '@/app/globals.css'
import { SiteFooter } from '@/components/site-footer'
import { client } from '@/sanity/sanity-utils'
import { groq } from 'next-sanity'
import { TestFilter } from '@/components/test-filter'
import { filterToLower } from '@/components/filter-to-lower'
import localFont from 'next/font/local'
import ViewToggle from '@/components/view-toggle'


export const metadata: Metadata = {
  title: 'Drew Litowitz',
}

const flatspot = localFont({ 
  src: [
    {
      path: '../public/fonts/FlatspotNuovoTest-Bold.woff2',
      weight: '700'
    }
  ],
  variable: "--font-flatspot"
})

const poppins = localFont({ 
  src:'../public/fonts/Poppins-Black.woff',
  variable: "--font-poppins"
})


export default async function RootLayout({
  children,
}: {
    children: React.ReactNode
  }) {


  const info = await client.fetch(
    groq`*[_type=="info"]{
        bio,
    }`
  )
  const allProjects = await client.fetch(
    groq`*[_type=="project"]{
      _id,
      _createdAt,
      name,
      images,
      url,
      content,
      type,
      "roles": roles[]->{
        name
      },
      "collabs": collabs[]->{
        name
      },
      "tags": tags[]->{
        name
      },
      color,
      year,
      "slug": slug.current,
    }`
  )
  

  // filterToLower(allProjects)
  return (
    <html lang="en">
      <body className={`bg-white`}>
        <section>
          <TestFilter projects={allProjects}/>
          <ViewToggle />
          <>{children}</>
          <SiteFooter info={info} />
        </section>
      </body>
    </html>
  )
}
