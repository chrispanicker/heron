'use client';
import { useEffect, useState } from "react";
import { urlForImage } from '@/sanity/lib/image';
import { getFile } from '@sanity/asset-utils';

export default function MobileLoadingScreen({ images}: { images: any[] }) {
  const [loadedCount, setLoadedCount] = useState(0);
  const [show, setShow] = useState(true);

  // Count text cards as loaded immediately
  useEffect(() => {
    const textCount = images.filter(media => media._type === "text").length;
    if (textCount > 0) setLoadedCount(textCount);
  }, [images]);

  useEffect(() => {
    if (loadedCount >= images.length) {
      setTimeout(() => setShow(false), 300); // Optional fade out
    }
  }, [loadedCount, images.length]);

  const handleMediaLoaded = () => {
    console.log('loaded one!!');
    setLoadedCount((c) => c + 1);}

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black flex flex-col justify-center items-center transition-opacity duration-500">
      <span className="text-6xl text-gray-300 animate-spin-slow select-none sans z-[1000]"
        onClick={() => { console.log(`Loaded ${loadedCount} of ${images.length} media items.`); }}>+</span>
      {/* Preload all media */}
      <div className="pointer-events-none absolute">
        {images.map((media, idx) => {
          if (media._type === "image") {
            return (
              <img
                key={idx}
                src={urlForImage(media).url()}
                onLoad={handleMediaLoaded}
                alt=""
              />
            );
          } else if (media._type === "mp4") {
            return (
              <video
                key={idx}
                src={getFile(media, { projectId: "01jwvji0", dataset: "production" }).asset.url}
                onLoadedData={handleMediaLoaded}
                preload="auto"
              />
            );
          } else if (media._type === "text") {
            // Already counted in useEffect
            return null;
          } else {
            return null;
          }
        })}
      </div>
    </div>
  );
}
