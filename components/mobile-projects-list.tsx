'use client'
import MobileProjects from "@/components/mobile-projects";
import { useState } from "react";

export default function MobileProjectsList({ filteredProjects }: { filteredProjects: any[] }) {
  const [activeProjects, setActiveProjects] = useState<string[]>([]);

  // Callback for when a project enters viewport
  const handleProjectInView = (slug: string) => {
    setActiveProjects(prev =>
      prev.includes(slug) ? prev : [...prev, slug]
    );
  };

  return (
    <>
      {filteredProjects.map((proj: any) => (
        <MobileProjects
          key={proj.slug}
          project={proj}
          isActive={activeProjects.includes(proj.slug)}
          onInView={handleProjectInView}
        />
      ))}
    </>
  );
}