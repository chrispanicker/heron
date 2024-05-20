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
    roles: any;
    color: string;
    tags: any;
    vimeo: string;
    images: Image[];
}