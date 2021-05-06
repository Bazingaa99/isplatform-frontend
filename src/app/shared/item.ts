export interface Item {
    id?: number;
    group: number;
    owner_id?: number;
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
