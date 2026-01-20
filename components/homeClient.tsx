'use client'

import MobileProjectsList from "@/components/mobile-projects-list";
import Projects from "@/components/project";
import { Scroller } from "@/components/scroller";
import { SiteFooter } from "@/components/site-footer";
import { Sorts } from "@/components/sorts";
import { OpeningGallerySlideshow } from "@/components/opening-gallery-slideshow";
import { openFilters } from "@/components/functions";
import { useEffect, useState } from "react";

export default function HomeClient({ filteredProjects, slugs, info, openingGallery, selectedProject }: { filteredProjects: any[], slugs: string[], info: any, openingGallery: any[], selectedProject?: string }) {
  const [loaded, setLoaded] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const site = Array.isArray(info) ? info[0] : info;
  const hasProjectOnLoad = !!selectedProject;

  useEffect(() => {
    // If a project is selected on load, skip gallery and show content immediately
    if (hasProjectOnLoad) {
      setIsClosing(true);
      setLoaded(true);
    }
  }, [hasProjectOnLoad]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'f') {
        openFilters(1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleGalleryReadyToClose = () => {
    setIsClosing(true);
    // Wait for animation to complete, then show content
    setTimeout(() => {
      setLoaded(true);
    }, 500);
  };

  const closeFiltersIfOpen = () => {
    const filters = document.querySelector("header section");
    if (filters?.classList.contains("max-h-[10rem]")) {
      openFilters(1);
    }
  };

  return (
    <div>
      <section id="opening-gallery" className={`fixed flex justify-center items-center top-0 w-screen h-screen z-[1000] mono-book text-gray-300 transition-all duration-500 ease-in-out ${
        isClosing ? '-translate-y-full' : 'translate-y-0'
      }`}>
        <OpeningGallerySlideshow projects={openingGallery} onReadyToClose={handleGalleryReadyToClose} siteInfo={site} isClosing={isClosing} />
      </section>
    <main className="z-20 min-h-[96.2vh]" onClick={closeFiltersIfOpen}>
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
            transitionDelay: hasProjectOnLoad ? '0ms' : `${index * 50}ms`
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
    </div>
  );
}