import { Image, PortableTextBlock } from "sanity";

export type Project = {
    _id: string;
    _createdAt: Date;
    name: string;
    slug: string;
    type: string;
    url: string;
    content: PortableTextBlock;
    collaborators: string[];
    year: string;
    roles: string[];
    role: string;
    color: string;
    tags: string[];
    images: Image[];
}