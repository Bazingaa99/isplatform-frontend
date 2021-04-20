export interface Request {
    id?: number;
    item: number;
    requester?: number;
    responded?: boolean;
    accepted?: boolean;
    returned?: boolean;
}
