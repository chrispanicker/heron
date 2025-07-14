// scripts/fill-mp4-names.ts
import { createClient } from '@sanity/client';

const client = createClient({
  projectId: '01jwvji0',
  dataset: 'production',
  useCdn: false,
  token: 'sk1yjNubIC2rjVoSY8ilnHIU5UNzjbYFeA74sRit13kd1mzvg6ybfrJU4tKgHGIhPytDiBjYL2hn1RUNwbpJqklLkCoiRZzqaLuwidFNlp6FhKsgktqnNDg9ReWtJ21Rk8mYssGSJNj309FhHs98fJhbhkgeVzKTv0ENd1dYL2en1CnP1cm0', // Required for write access
  apiVersion: '2023-07-01',
});


async function getFilename(assetRef: string): Promise<string | null> {
  const type = assetRef.startsWith('file-') ? 'sanity.fileAsset' : 'sanity.imageAsset';
  const asset = await client.fetch(
    `*[_type == $type && _id == $id][0]{originalFilename}`,
    { type, id: assetRef }
  );

  if (!asset?.originalFilename) return null;

  return asset.originalFilename.replace(/\.[^/.]+$/, ''); // Strip extension
}

async function run() {
  const projects = await client.fetch(`*[_type == "project"]{
    _id,
    images
  }`);

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
      await client.patch(project._id)
        .set({ images: updatedImages })
        .commit();

      console.log(`✅ Updated ${project._id}`);
    }
  }

  console.log('🎉 All filenames updated!');
}

run().catch((err) => {
  console.error('❌ Error:', err);
  process.exit(1);
});
