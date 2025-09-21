// scripts/fill-mp4-names.ts
import { createClient } from '@sanity/client';



const client = createClient({
  projectId: '01jwvji0',
  dataset: 'production',
  useCdn: false,
  token: 'sk1yjNubIC2rjVoSY8ilnHIU5UNzjbYFeA74sRit13kd1mzvg6ybfrJU4tKgHGIhPytDiBjYL2hn1RUNwbpJqklLkCoiRZzqaLuwidFNlp6FhKsgktqnNDg9ReWtJ21Rk8mYssGSJNj309FhHs98fJhbhkgeVzKTv0ENd1dYL2en1CnP1cm0', // Required for write access
  apiVersion: '2023-07-01',
});

// Helper to get the original filename from an asset reference
async function getFilename(assetRef: string): Promise<string | null> {
  // Determine if it's an image or file asset (mp4 of image)
  const type = assetRef.startsWith('file-') ? 'sanity.fileAsset' : 'sanity.imageAsset';
  //GROQ query the asset document, looking for the originalFilename field
  const asset = await client.fetch(
    `*[_type == $type && _id == $id][0]{originalFilename}`,
    { type, id: assetRef }
  );

  if (!asset?.originalFilename) return null;

  return asset.originalFilename.replace(/\.[^/.]+$/, ''); // Strip extension
}

//runs another query to get all projects(specifically image array)

//in my sanity schema, I want to emulate this functionality. 
//
async function run() {
  const projects = await client.fetch(`*[_type == "project"]{
    _id,
    images
  }`);

  console.log(`🔍 Found ${projects.length} projects`);

  //iterate through each project
  for (const project of projects) {
    //default to false, will change if the name !== filename (has been updated manually)
    let hasUpdates = false;


    const updatedImages = await Promise.all(
      //() for images or any array, map through each( async since we need to await getFilename later??)
      (project.images || []).map(async (myImage: any) => {
        const isImage = myImage._type === 'image' && myImage.asset?._ref;
        const isMP4 = myImage._type === 'mp4' && myImage.asset?._ref;

        if ((isImage || isMP4)) {
          const filename = await getFilename(myImage.asset._ref);

          if (filename && myImage.name !== filename) {
            hasUpdates = true;
            return {
              //... returns an array of objects with updated names
              ...myImage,
              name: filename,
            };
          }
        }

        return myImage;
      })
    );

    if (hasUpdates) {
      //this is where the actual value is updated in sanity, (.set and .commit to save changes)
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
