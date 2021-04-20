export interface Item {
    id?: number;
    group: number;
    owner_id?: number;
    category: number;
    name: string;
    description: string;
    pictureId?: string;
    dateCreated?: Date;
    viewCount?: number;
    duration: number;
    isHidden: boolean;
}