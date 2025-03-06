import { useState, useEffect, useRef } from 'react';
import { urlForImage } from '@/sanity/lib/image';
import { PortableText } from '@portabletext/react';
import { getFile } from '@sanity/asset-utils';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { buttonClass } from './classes';

export const MobileMedia = ({ e, project, index, galleryWidth }:any) => {
  const [isVisible, setIsVisible] = useState(false);
  const mediaRef = useRef(null);
  const searchParams = useSearchParams();
  const selectedProject = searchParams.get("project")

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Stop observing once the element is in view
        }
      },
      { threshold: 0.1 } // Trigger when 10% of the element is in view
    );

    if (mediaRef.current) {
      observer.observe(mediaRef.current);
    }

    return () => observer.disconnect();
  }, []);

  if (e._type === 'mp4') {
    return (
      <div
        ref={mediaRef}
        key={`${project.slug}-${index}`}
        className={`snap-center snap-always peer flex justify-center items-center h-[60vh] bg-black mx-2`}
      >
        {e.description && (
          <span className={`mono-book uppercase mobile-description absolute bottom-2 h-[4rem] ${galleryWidth} text-gray-300 flex text-justify-left justify-center items-start mt-2 px-3`}>
            <p className="text-[.8rem]  leading-[1rem] outline-gray-300 outline outline-1 px-1 bg-black">{e.description}</p>
          </span>
        )}
        <video
          width="1440"
          height="1080"
          muted
          loop
          autoPlay
          webkit-playsinline="true"
          src={getFile(e, { projectId: "01jwvji0", dataset: "production" }).asset.url} 
          playsInline
          preload="true"
          className={`object-cover duration-500 h-[50vh] ${galleryWidth} transition-opacity duration-1000`
          }
          onDoubleClick={(x)=>{
            const vidModal = document.querySelector("#vidmodal");
            const vidModalEl = document.querySelector("#vidmodal video") as HTMLVideoElement
            vidModalEl.src = x.currentTarget.src
            vidModal? vidModal.scrollLeft=0 :""
            vidModal?.classList.replace("opacity-0","opacity-100")
            vidModal?.classList.remove("pointer-events-none")
            vidModalEl.classList.remove("hidden")
          }}
        >
          <track
            src="/path/to/captions.vtt"
            kind="subtitles"
            srcLang="en"
            label="English"
          />
          Your browser does not support the video tag.
        </video>
      </div>
    );
  } else if (e._type === "image") {
    return (
      <div
        ref={mediaRef}
        key={`mobile-${project.slug}-${index}`}
        className={`relative snap-center snap-always peer flex justify-center items-center h-[60vh] bg-black mx-2`}
      >
        {e.description && (
          <span className={`mono-book uppercase mobile-description absolute bottom-2 h-[4rem] ${galleryWidth} text-gray-300 flex text-justify-left justify-center items-start mt-2 px-3`}>
            <p className="text-[.8rem] leading-[1rem] outline-gray-300 outline outline-1 px-1 bg-black">{e.description}</p>
          </span>
        )}
        <Image
          src={urlForImage(e).url()}
          alt=""
          width={1080}
          height={1080}
          className={`object-contain duration-500 h-[50vh] ${galleryWidth} transition-opacity opacity-100 duration-1000`
          }
          onDoubleClick={(x)=>{
            const modal = document.querySelector("#modal");
            const modalImg = document.querySelector("#modal img") as HTMLImageElement
            modalImg!.src = x.currentTarget.src
            modal? modal.scrollLeft=0 :""
            modal?.classList.replace("opacity-0","opacity-100")
            modal?.classList.remove("pointer-events-none")
          }}
          loading={project.slug === selectedProject? "eager":"lazy"}
          placeholder="blur"
          blurDataURL={`${project.gallery[index].blurDataURL}`}
          unoptimized={urlForImage(e).url().includes(".gif") ? true : false}
        />
      </div>
    );
  } else {
    return (
      <div key={`mobile-${project.slug}-text-${index}`} className={`mono-book uppercase h-[60vh] ${galleryWidth} snap-center snap-always flex justify-center items-center bg-black text-gray-300 text-xl text-center mx-2 px-7 py-5`}>
        <PortableText value={e.content} />
      </div>
    );
  }
};
