import React, { useState } from "react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { urlForImage } from "@/sanity/lib/image";
import { getFile } from "@sanity/asset-utils";

export default function DownloadImagesZip(props: any) {
  const { value: images = [] } = props;
  const [loading, setLoading] = useState(false);

  // console.log("DownloadImagesZip slug:", props.document);


  const handleDownloadZip = async () => {
    setLoading(true);
    const zip = new JSZip();

    // Helper to fetch and add file to zip
    async function addFile(url: string, filename: string) {
      const res = await fetch(url);
      const blob = await res.blob();
      zip.file(filename, blob);
    }

    // Collect all media URLs and add to zip
    for (const media of images) {
      let url = "";
      let filename = "";
      if (media._type === "image" && media.asset?._ref) {
        url = urlForImage(media).url();
        filename = `${media.name || media.asset._ref}.jpg`;
      } else if (media._type === "mp4" && media.asset?._ref) {
        url = getFile(media, { projectId: "01jwvji0", dataset: "production" }).asset.url;
        filename = `${media.name || media.asset._ref}.mp4`;
      } else if (media._type === "image" && media.asset?._ref) {
        url = urlForImage(media).url();
        filename = `${media.name || media.asset._ref}.png`;
      }
      if (url && filename) {
        await addFile(url, filename);
      }
    }

    // Generate and trigger download
    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, `${props.slug || "project-media"}.zip`);
    setLoading(false);
  };

  return (
    <div style={{ margin: "1em 0" }}>
      <button
        type="button"
        onClick={handleDownloadZip}
        disabled={loading || images.length === 0}
        className="w-full bg-gray-500 text-white hover:bg-gray-700 transition-colors duration-300"
        style={{
          padding: "0.5em 1em",
          // background: "#222",
          // color: "#fff",
          borderRadius: "4px",
          cursor: loading ? "not-allowed" : "pointer",
        }}
      >
        {loading ? "Preparing ZIP..." : "Download All Media"}
      </button>
    </div>
  );
}