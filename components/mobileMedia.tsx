import { useState, useRef, useEffect } from 'react';
import { urlForImage } from '@/sanity/lib/image';
import { PortableText } from '@portabletext/react';
import { getFile } from '@sanity/asset-utils';
import Image from 'next/image';

export const MobileMedia = ({ e, project, index, galleryLength }: any) => {
  const [isPortrait, setIsPortrait] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [shouldLoad, setShouldLoad] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  let isVisible = true;

  // Intersection observer for lazy loading videos
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setShouldLoad(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(container);
    return () => observer.unobserve(container);
  }, []);

  // Margin logic: no left margin for first, no right margin for last
  const marginClass =
    index === 0
      ? 'mr-2'
      : index === galleryLength - 1
      ? 'ml-2'
      : 'mx-2';

  const containerClass = `snap-center snap-always flex justify-center items-center h-[100%] bg-black ${marginClass} w-screen relative`;

  // Only render media if visible
  if (!isVisible) {
    return (
      <div ref={containerRef} className={containerClass}>
        <span className="text-gray-300 h-[100%] flex justify-center items-center mono-book uppercase">Loading...</span>
      </div>
    );
  }else if (e._type === 'mp4' && isVisible) {
    return (
      <div ref={containerRef} className={containerClass}>
        {e.description && (
          <span className="mono-book uppercase mobile-description opacity-0 absolute bottom-2 h-[4rem] w-[80%] text-gray-300 flex justify-center items-start mt-2 px-3 z-100">
            <p className="text-[.8rem] leading-[1rem] outline-gray-300 outline outline-1 px-1 bg-black text-center">{e.description}</p>
          </span>
        )}
        {/* Loading spinner */}
        {isLoading && (
          <div className="absolute inset-0 flex justify-center items-center z-50 pointer-events-none">
            <style>{`
              @keyframes cascade-wave {
                0% {transform: translate(0,-2px) rotate(0deg); }
                50% {transform: translate(0,2px) rotate(45deg); }
                100% {transform: translate(0,-2px) rotate(90deg); }
              }
            `}</style>
            <div className="flex flex-col justify-center items-center gap-2">
              <div className="flex gap-1">
                <div className="sans text-2xl text-gray-300" style={{ animation: 'cascade-wave 500ms ease-in-out infinite' }}>+</div>
                <div className="sans text-2xl text-gray-300" style={{ animation: 'cascade-wave 500ms ease-in-out infinite 220ms' }}>+</div>
                <div className="sans text-2xl text-gray-300" style={{ animation: 'cascade-wave 500ms ease-in-out infinite 410ms' }}>+</div>
              </div>
              <p className='text-gray-300 text-sm mono-book uppercase'>Loading...</p>
            </div>
          </div>
        )}
        {shouldLoad && (
          <video
            ref={videoRef}
            width="1440"
            height="1080"
            muted
            loop
            autoPlay
            preload='metadata'
            webkit-playsinline="true"
            src={getFile(e, { projectId: "01jwvji0", dataset: "production" }).asset.url}
            playsInline
            poster={e.posterUrl || undefined}
            className={
              `${isPortrait
                ? "object-contain max-h-[90%] max-w-[80%] transition-opacity duration-500"
                : "object-cover max-h-full w-[100%] transition-opacity duration-500"} ${isLoading===true? "opacity-0": "opacity-100"} `
            }
            onLoadedData={ev => {
              const video = ev.currentTarget;
              setIsPortrait(video.videoHeight > video.videoWidth);
            }}
            onCanPlay={() => setIsLoading(false)}
          >
            <track src="/path/to/captions.vtt" kind="subtitles" srcLang="en" label="English" />
            Your browser does not support the video tag.
          </video>
        )}
      </div>
    );
  } else if (e._type === "image" && isVisible) {
    return (
      <div ref={containerRef} className={containerClass}>
        {e.description && (
          <span className="mono-book uppercase mobile-description absolute bottom-2 h-[4rem] w-[80%] text-gray-300 flex justify-center items-start mt-2 px-3 z-100">
            <p className="text-[.8rem] leading-[1rem] outline-gray-300 outline outline-1 px-1 bg-black text-center">{e.description}</p>
          </span>
        )}
        <span className="relative flex justify-center items-center w-full overflow-x-hidden h-full pr-2 z-0">
          <Image
            src={urlForImage(e).url()}
            alt=""
            width={1080}
            height={1080}
            className={`transition-all duration-500 ${e.mycrop ? "opacity-100 min-w-[140vw]" : "w-full max-h-[75%] object-contain"} ${isLoading===true? "blur-2xl": ""}`}
            loading="lazy"
            placeholder={project.gallery[index]?.blurDataURL? "blur": "empty"}
            blurDataURL={project.gallery[index]?.blurDataURL? project.gallery[index]?.blurDataURL : undefined}
            onLoad={()=>setIsLoading(false)}
            unoptimized={urlForImage(e).url().includes(".gif")}
          />
        </span>
      </div>
    );
  } else {
    // Text block
    return (
      <div ref={containerRef} className={`mono-book uppercase h-[100%] w-screen snap-center snap-always flex justify-center items-center bg-black text-gray-300 text-[1rem] text-center ${marginClass} px-7 py-5`}>
        <PortableText value={e.content} />
      </div>
    );
  }
};