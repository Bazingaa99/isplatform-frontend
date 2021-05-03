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
    isHidden: boolean;
    bookmarkCount?: number;
    image?:Blob
}
