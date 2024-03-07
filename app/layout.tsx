import type { Metadata } from 'next'
import '@/app/globals.css'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { client } from '@/sanity/sanity-utils'
import { groq } from 'next-sanity'
import { TestFilter } from '@/components/test-filter'


export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}



export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const allProjects = await client.fetch(
    groq`*[_type=="project"]{
      _id,
      _createdAt,
      name,
      images,
      url,
      content,
      type,
      roles,
      role,
      collaborators,
      tags,
      color,
      year,
      "slug": slug.current,
  }`
  )

  return (
    <html lang="en">
      <body className='bg-bkg'>
        <SiteHeader />
        <section className='w-screen h-screen snap-y snap-proximity overflow-scroll'>
          <TestFilter projects={allProjects}/>
          <>{children}</>
          <SiteFooter />
        </section>
      </body>
    </html>
  )
}
