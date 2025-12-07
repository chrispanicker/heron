'use client';
import { useEffect } from 'react';

export default function FaviconUpdater({ url }: { url?: string | null }) {
  useEffect(() => {
    if (!url) return;

    // cache-bust to force refresh during testing/updates
    const href = url.includes('?') ? `${url}&v=${Date.now()}` : `${url}?v=${Date.now()}`;

    // Prefer updating existing nodes instead of removing them
    const setOrCreate = (rel: string, type?: string) => {
      // prefer exact rel match first
      let link = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
      if (!link) {
        // fallback to any icon-like rel
        link = document.querySelector(`link[rel*='${rel.split(' ')[0]}']`) as HTMLLinkElement | null;
      }
      if (link) {
        try {
          link.href = href;
        } catch (err) {
          // fallback: replace safely by creating new node (avoid removeChild)
          const newLink = document.createElement('link');
          newLink.rel = rel;
          if (type) newLink.type = type;
          newLink.href = href;
          document.head.appendChild(newLink);
        }
      } else {
        const newLink = document.createElement('link');
        newLink.rel = rel;
        if (type) newLink.type = type;
        newLink.href = href;
        document.head.appendChild(newLink);
      }
    };

    // update/create common favicon link types
    setOrCreate('icon', 'image/png');
    setOrCreate('shortcut icon', 'image/png');
    setOrCreate('apple-touch-icon', 'image/png');

  }, [url]);

  return null;
}