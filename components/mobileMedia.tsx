import { useState, useEffect, useRef } from 'react';
import { urlForImage } from '@/sanity/lib/image';
import { PortableText } from '@portabletext/react';
import { getFile } from '@sanity/asset-utils';
import Image from 'next/image';

export const MobileMedia = ({ e, project, index, galleryLength }: any) => {
  const [isPortrait, setIsPortrait] = useState(false);
  // const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  let isVisible = true;

  // Margin logic: no left margin for first, no right margin for last
  const marginClass =
    index === 0
      ? 'mr-2'
      : index === galleryLength - 1
      ? 'ml-2'
      : 'mx-2';

  const containerClass = `snap-center snap-always flex justify-center items-center h-[60vh] bg-black ${marginClass} w-screen relative`;

  // Only render media if visible
  if (!isVisible) {
    return (
      <div ref={containerRef} className={containerClass}>
        <span className="text-gray-300 h-[60vh] flex justify-center items-center mono-book uppercase">Loading...</span>
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
        <video
          ref={videoRef}
          width="1440"
          height="1080"
          muted
          loop
          autoPlay
          webkit-playsinline="true"
          src={getFile(e, { projectId: "01jwvji0", dataset: "production" }).asset.url}
          playsInline
          poster={e.posterUrl || undefined}
          className={
            isPortrait
              ? "object-contain max-h-[90%] max-w-[80%] transition-opacity duration-1000"
              : "object-cover max-h-full w-[100%] transition-opacity duration-1000"
          }
          onLoadedData={ev => {
            const video = ev.currentTarget;
            setIsPortrait(video.videoHeight > video.videoWidth);
          }}
          // onDoubleClick={(x) => {
          //   const vidModal = document.querySelector("#vidmodal");
          //   const vidModalEl = document.querySelector("#vidmodal video") as HTMLVideoElement;
          //   vidModalEl.src = x.currentTarget.src;
          //   vidModal!.scrollLeft = 0;
          //   vidModal!.classList.replace("opacity-0", "opacity-100");
          //   vidModal!.classList.remove("pointer-events-none");
          //   vidModalEl.classList.remove("hidden");
          // }}
        >
          <track src="/path/to/captions.vtt" kind="subtitles" srcLang="en" label="English" />
          Your browser does not support the video tag.
        </video>
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
            // onDoubleClick={(x) => {
            //   const modal = document.querySelector("#modal");
            //   const modalImg = document.querySelector("#modal img") as HTMLImageElement;
            //   modalImg!.src = x.currentTarget.src;
            //   modal!.scrollLeft = 0;
            //   modal!.classList.replace("opacity-0", "opacity-100");
            //   modal!.classList.remove("pointer-events-none");
            // }}
            loading="lazy"
            placeholder={project.gallery[index]?.blurDataURL? "blur": "empty"}
            blurDataURL={project.gallery[index]?.blurDataURL? project.gallery[index]?.blurDataURL : undefined}
            onLoadingComplete={()=>setIsLoading(false)}
            unoptimized={urlForImage(e).url().includes(".gif")}
          />
        </span>
      </div>
    );
  } else {
    // Text block
    return (
      <div ref={containerRef} className={`mono-book uppercase h-[60vh] w-screen snap-center snap-always flex justify-center items-center bg-black text-gray-300 text-[1rem] text-center ${marginClass} px-7 py-5`}>
        <PortableText value={e.content} />
      </div>
    );
  }
};