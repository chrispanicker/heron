import { useDocumentOperation } from 'sanity';
import { urlForImage } from '@/sanity/lib/image';
import { getFile } from '@sanity/asset-utils';

export function downloadProjectMediaAction(props: any) {
  return {
    label: 'Download All Media',
    onHandle: async () => {
      const doc = props.draft || props.published;
      if (!doc?.images?.length) {
        alert('No media found in this project.');
        props.onComplete();
        return;
      }

      doc.images.forEach((media: any) => {
        let url = '';
        if (media._type === 'image' && media.asset?._ref) {
          url = urlForImage(media).url();
        } else if (media._type === 'mp4' && media.asset?._ref) {
          url = getFile(media, { projectId: '01jwvji0', dataset: 'production' }).asset.url;
        }
        if (url) {
          // Open in new tab for browser download
          window.open(url, '_blank');
        }
      });

      props.onComplete();
    },
  };
}