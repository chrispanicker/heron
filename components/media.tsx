import { urlForImage } from '@/sanity/lib/image';
import { PortableText } from '@portabletext/react';
import { getFile } from '@sanity/asset-utils';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { textSize } from './classes';

export const MediaWithFadeIn = ({ e, project, index }:any) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isVideoLoading, setIsVideoLoading] = useState(true);
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
          <span className="absolute bottom-20 w-full h-[3rem] flex justify-center items-end peer-hover:bg-black z-[200] opacity-100 group-hover:opacity-100">
            <p className={`inline-block w-fit max-w-[20rem] h-fit uppercase mono-book text-center ${textSize} px-1 leading-[1rem] outline outline-1 bg-black text-gray-300 outline-gray-300 mb-5 opacity-0 group-hover:opacity-100`}>{e.description}</p>
          </span>
        )}
        {/* Loading spinner */}
        {isVideoLoading && (
          <div className="absolute inset-0 flex justify-center items-center pointer-events-none z-10">
            <div className="flex flex-col justify-center items-center gap-2">
              <div className="flex gap-1">
                <div className="sans text-2xl text-gray-300 animate-pulse">+</div>
                <div className="sans text-2xl text-gray-300 animate-pulse" style={{ animationDelay: '220ms' }}>+</div>
                <div className="sans text-2xl text-gray-300 animate-pulse" style={{ animationDelay: '410ms' }}>+</div>
              </div>
              <p className='text-gray-300 text-sm mono-book uppercase'>Loading...</p>
            </div>
          </div>
        )}
        <video
          key={`${project.slug}-${index}`}
          width="1440"
          height="1080"
          muted
          controls
          loop
          autoPlay
          playsInline
          webkit-playsinline={`true`}
          preload={"none"}
          className={`w-auto h-full ${index===project.images.length-1? "pr-0":"pr-2"} snap-center snap-always z-0 transition-opacity duration-1000 ${isVideoLoading ? "opacity-0" : "opacity-100"}` 
          }
          onCanPlay={() => setIsVideoLoading(false)}
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
          <span key={`${project.slug}-description-${index}`} className="absolute bottom-10 w-full h-[3rem] flex justify-center items-end opacity-100 group-hover:opacity-[100%]">
            <p className={`inline-block w-fit max-w-[20rem] h-fit uppercase mono-book text-center ${textSize} px-1 leading-[1rem] outline outline-1 bg-black text-gray-300 outline-gray-300 mb-5 opacity-0 group-hover:opacity-100`}>{e.description}</p>
          </span>
        )}
        <Image
          src={urlForImage(e).url()}
          alt=""
          width={1440}
          height={1080}
          className={`object-cover ${e.mycrop? "w-[43rem]": "w-auto"} ${index===0? "ml-3": ""} h-full pr-2 snap-center snap-always transition-opacity duration-1000 cursor-zoom-in` 
        }
          loading={project.slug === selectedProject? "eager":"lazy"}
          placeholder="blur"
          blurDataURL={`${project.gallery[index].blurDataURL}`}
          unoptimized={true}
          onClick={(x)=>{
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
      <div className="min-w-[32rem] h-full snap-center snap-always flex justify-center items-center" key={`${project.slug}-${index}`}>
        <span className="max-w-[18rem] h-fit uppercase mono-book text-[1.2rem] px-1 leading-[1.8rem] text-gray-300 text-center mb-5 mr-10">
          <PortableText value={e.content} />
        </span>
      </div>
    );
  }
};
