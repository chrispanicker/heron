// import React, { useEffect } from 'react';
// import { useFormValue, set, StringInputProps } from 'sanity';
// import { getPlaiceholder } from 'plaiceholder';

// type LqipInputProps = StringInputProps;

// const LqipInput: React.FC<LqipInputProps> = ({ value, onChange }) => {
//   const imageUrl = useFormValue(['asset', '_ref']) as string | undefined;

//   useEffect(() => {
//     const fetchLqip = async () => {
//       if (imageUrl) {
//         const fullUrl = `https://cdn.sanity.io/images/01jwvji0/production/${imageUrl.split('-')[1]}.jpg`; // Adjust as necessary

//         // Fetch the image data as a Buffer
//         const response = await fetch(fullUrl);
//         const arrayBuffer = await response.arrayBuffer();
//         const buffer = Buffer.from(arrayBuffer);

//         const { base64 } = await getPlaiceholder(buffer);
//         onChange(set(base64));
//       }
//     };

//     fetchLqip();
//   }, [imageUrl, onChange]);

//   return (
//     <div>
//       <p>{value ? 'LQIP generated' : 'Generating LQIP...'}</p>
//     </div>
//   );
// };

// export default LqipInput;