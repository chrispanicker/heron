import { urlForImage } from '@/sanity/lib/image';
import { PortableText } from '@portabletext/react';
import { getFile } from '@sanity/asset-utils';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';

export const MediaWithFadeIn = ({ e, project, index }:any) => {
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
      <div className="relative w-max h-full group" key={`${project.slug}-${index}`} ref={mediaRef}>
        {e.description && (
          <span className="absolute bottom-10 w-full h-[3rem] flex justify-center items-end peer-hover:bg-black z-[200] opacity-0 group-hover:opacity-100">
            <p className="w-fit h-fit uppercase mono-book text-[.8rem] px-1 leading-[1rem] outline outline-1 bg-black text-gray-300 outline-gray-300 mb-5">{e.description}</p>
          </span>
        )}
        <video
          key={`${project.slug}-${index}`}
          width="1440"
          height="1080"
          muted
          controls
          loop
          autoPlay
          webkit-playsinline={`true`}
          preload="true"
          className={`w-auto h-full pr-2 snap-center snap-always z-0 transition-opacity duration-1000` 
            // ${isVisible ? 'opacity-100' : 'opacity-0'}`
          }
        >
          <source src={getFile(e, { projectId: "01jwvji0", dataset: "production" }).asset.url} type="video/mp4" />
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
  } else if (e._type === 'image') {
    return (
      <div className={`relative w-max h-full group`} key={`${project.slug}-${index}`} ref={mediaRef}>
        {e.description && (
          <span key={`${project.slug}-description-${index}`} className="absolute bottom-10 w-full h-[3rem] flex justify-center items-end opacity-0 group-hover:opacity-[100%]">
            <p className="w-fit h-fit uppercase mono-book text-[.8rem] px-1 leading-[1rem] outline outline-1 bg-black text-gray-300 outline-gray-300 mb-5">{e.description}</p>
          </span>
        )}
        <Image
          src={urlForImage(e).url()}
          alt=""
          width={1440}
          height={1080}
          className={`object-cover ${e.mycrop? "w-[43rem]": "w-auto"} h-full pr-2 snap-center snap-always transition-opacity duration-1000 cursor-zoom-in` 
        }
          loading={project.slug === selectedProject? "eager":"lazy"}
          placeholder="blur"
          blurDataURL={`${project.gallery[index].blurDataURL}`}
          unoptimized={true}
          onClick={(x)=>{
            console.log('hi')
            const modal = document.querySelector("#modal");
            const modalImg = document.querySelector("#modal img") as HTMLImageElement
            modalImg!.src = x.currentTarget.src
            modal?.classList.replace("opacity-0","opacity-100")
            modal?.classList.remove("pointer-events-none")
          }}
        />
      </div>
    );
  } else {
    return (
      <div className="min-w-[43rem] h-[32rem] snap-center snap-always flex justify-center items-center" key={`${project.slug}-${index}`}>
        <span className="max-w-[18rem] h-fit uppercase mono-book text-[1.2rem] px-1 leading-[1.8rem] text-gray-300 text-center mb-5 mr-10">
          <PortableText value={e.content} />
        </span>
      </div>
    );
  }
};
