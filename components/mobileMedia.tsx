import { useState, useEffect, useRef } from 'react';
import { urlForImage } from '@/sanity/lib/image';
import { PortableText } from '@portabletext/react';
import { getFile } from '@sanity/asset-utils';
import Image from 'next/image';

export const MobileMedia = ({ e, project, index, galleryWidth }:any) => {
  const [isVisible, setIsVisible] = useState(false);
  const mediaRef = useRef(null);

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
        className={`snap-center snap-always peer flex justify-center items-center h-[60lvh] bg-black mx-1`}
      >
        {e.description && (
          <span className={`mobile-description absolute top-0 h-[50lvh] ${galleryWidth} text-gray-300 flex text-justify justify-center items-start mt-2 px-5`}>
            <p className="serif leading-[1.2rem]">{e.description}</p>
          </span>
        )}
        <video
          width="1440"
          height="1080"
          muted
          loop
          autoPlay
          controls
          webkit-playsinline="true"
          playsInline
          preload="true"
          className={`object-cover duration-500 h-[50lvh] ${galleryWidth} transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
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
  } else if (e._type === "image") {
    return (
      <div
        ref={mediaRef}
        key={`mobile-${project.slug}-${index}`}
        className={`relative snap-center snap-always peer flex justify-center items-center h-[60lvh] bg-black mx-1`}
      >
        {e.description && (
          <span className={`mobile-description absolute top-0 h-[50lvh] ${galleryWidth} text-gray-300 flex text-justify justify-center items-start mt-2 px-5`}>
            <p className="serif leading-[1.2rem]">{e.description}</p>
          </span>
        )}
        <Image
          src={urlForImage(e).url()}
          alt=""
          width={1080}
          height={1080}
          className={`object-contain duration-500 h-[50lvh] ${galleryWidth} transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
          loading="lazy"
          placeholder="blur"
          blurDataURL={`${project.images[index].lqip}`}
          unoptimized={urlForImage(project.preview).url().includes(".gif") ? true : false}
        />
      </div>
    );
  } else {
    return (
      <div key={`mobile-${project.slug}-text-${index}`} className={`h-[60lvh] ${galleryWidth} snap-center snap-always flex justify-center items-center bg-black text-gray-300 text-2xl text-center p-5`}>
        <PortableText value={e.content} />
      </div>
    );
  }
};
