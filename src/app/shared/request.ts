import { Chat } from './chat';
import { User } from './user';

export interface Request {
    id?: number;
    item?: number;
    requester?: User;
    responded?: boolean;
    accepted?: boolean;
    returned?: boolean;
    chat?: Chat;
    shareDate?: Date;
    returnDate?: Date;
}
