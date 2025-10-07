import DownloadImagesZip from "./handleDownloadZip";

export default function ImagesArrayWithDownload(props: any) {
  // console.log("ImagesArrayWithDownload document:", props.document);
  const projectSlug =
    props.document?.slug?.current ||
    props.document?.name?.replace(/\s+/g, "-").toLowerCase() ||
    "project";
  const DefaultArrayInput = props.renderDefault;
  return (
    <div>
      <DefaultArrayInput {...props} />
      <DownloadImagesZip {...props} slug={projectSlug} />
    </div>
  );
}