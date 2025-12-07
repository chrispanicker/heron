'use client';
import { useEffect } from 'react';

export default function FaviconUpdater({ url }: { url?: string | null }) {
  useEffect(() => {
    if (!url) return;

    // cache-bust to avoid stale favicon cache
    const href = url.includes('?') ? `${url}&v=${Date.now()}` : `${url}?v=${Date.now()}`;

    // Remove existing favicon links that may have been inserted by Next/metadata
    const existing = Array.from(document.querySelectorAll("link[rel*='icon'], link[rel='shortcut icon'], link[rel='apple-touch-icon']"));
    existing.forEach(el => el.parentNode?.removeChild(el));

    // Insert new links
    const rels = [
      { rel: 'icon', type: 'image/png' },
      { rel: 'shortcut icon', type: 'image/png' },
      { rel: 'apple-touch-icon', type: 'image/png' }
    ];

    rels.forEach(({ rel, type }) => {
      const link = document.createElement('link');
      link.rel = rel;
      link.href = href;
      if (type) link.type = type;
      document.head.appendChild(link);
    });

    // Optionally also set meta theme-color (not required)
    return () => {
      // no cleanup necessary; leaving favicon is fine
    };
  }, [url]);

  return null;
}