import { Image, PortableTextBlock } from "sanity";

export type Project = {
    _id: string;
    _createdAt: Date;
    name: string;
    slug: string;
    type: string;
    url: string;
    content: PortableTextBlock;
    collabs: any;
    year: string;
    client: string;
    orderRank: any;
    roles: any;
    gallery: Image[];
    tags: any;
    vimeo: string[];
    images: any;
    preview: Image;
}