import { User } from "./user";

export interface Item {
    id?: number;
    group: number;
    owner?: number;
    category: number;
    name: string;
    description: string;
    pictureId?: string;
    dateCreated?: Date;
    viewCount?: number;
    duration: number;
}
