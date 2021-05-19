import { User } from "./user";

export interface Item {
    id?: number;
    group: number;
    owner?: User;
    category: number;
    name: string;
    description: string;
    imageName?: string;
    dateCreated?: Date;
    viewCount?: number;
    duration: number;
    hidden: boolean;
    image?:Blob
    bookmarkCount?: number;
}
