import { client } from "./client";

async function getFilename(assetRef: string): Promise<string | null> {
  const type = assetRef.startsWith("file-") ? "sanity.fileAsset" : "sanity.imageAsset";

  try {
    const asset = await client.fetch(`*[_type == $type && _id == $id][0]{originalFilename}`, { type, id: assetRef });

    if (!asset?.originalFilename) return null;
    return asset.originalFilename.replace(/\.[^/.]+$/, ""); // Remove file extension
  } catch (error) {
    console.error("Error fetching asset:", error);
    return null;
  }
}