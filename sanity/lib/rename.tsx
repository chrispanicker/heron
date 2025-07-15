import React from 'react';
import { Button, Dialog, Text } from '@sanity/ui';
import { client } from './client';

const getFilename = async (assetRef: string): Promise<string | null> => {
  const type = assetRef.startsWith('file-') ? 'sanity.fileAsset' : 'sanity.imageAsset';
  const asset = await client.fetch(
    `*[_type == $type && _id == $id][0]{originalFilename}`,
    { type, id: assetRef }
  );

  if (!asset?.originalFilename) return null;

  return asset.originalFilename.replace(/\.[^/.]+$/, ''); // Strip extension
};

const RenameAssetsButton = () => {
  const handleRenameAssets = async () => {
    const projects = await client.fetch(`*[_type == "project"]{_id, images}`);
    console.log(`🔍 Found ${projects.length} projects`);

    for (const project of projects) {
      let hasUpdates = false;

      const updatedImages = await Promise.all(
        (project.images || []).map(async (block: any) => {
          const isImage = block._type === 'image' && block.asset?._ref;
          const isMP4 = block._type === 'mp4' && block.asset?._ref;

          if ((isImage || isMP4)) {
            const filename = await getFilename(block.asset._ref);

            if (filename && block.name !== filename) {
              hasUpdates = true;
              return {
                ...block,
                name: filename,
              };
            }
          }

          return block;
        })
      );

      if (hasUpdates) {
        await client.patch(project._id).set({ images: updatedImages }).commit();
        console.log(`✅ Updated ${project._id}`);
      }
    }

    console.log('🎉 All filenames updated!');
  };

  return (
    <Button onClick={handleRenameAssets} tone="primary">
      Rename Assets Automatically
    </Button>
  );
};

export default RenameAssetsButton;
