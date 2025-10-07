'use client'

import MobileProjectsList from "@/components/mobile-projects-list";
import Projects from "@/components/project";
import { Scroller } from "@/components/scroller";
import { SiteFooter } from "@/components/site-footer";
import { Sorts } from "@/components/sorts";
import { useEffect, useState } from "react";

export default function HomeClient({ filteredProjects, slugs, info }: { filteredProjects: any[], slugs: string[], info: any}) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Trigger animation after mount
    setTimeout(() => setLoaded(true), 100);
  }, []);

  return (
    <main className="z-20 min-h-[96.2vh]">
      <div className="lg:h-[10rem]"></div>
      <Scroller />
      <Sorts />
      {filteredProjects.map((proj: any, index: number) => (
        <div
          key={proj.slug}
          className={`duration-100 transition-all
            ${loaded
              ? `opacity-100 translate-y-0`
              : `opacity-0 translate-y-8`}
            `}
          style={{
            transitionDelay: `${index * 50}ms`
          }}
        >
          <div id={`${proj.slug}`}>
            <Projects project={proj} slugs={slugs} />
          </div>
        </div>
      ))}
       <MobileProjectsList filteredProjects={filteredProjects}/>

        <div className="lg:block hidden">
          <SiteFooter info={info}/>
        </div>

    </main>
  );
}