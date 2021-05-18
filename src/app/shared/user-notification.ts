import { User } from "./user";

export interface UserNotification {
    id?: number;
    receiver: User;
    writer: User;
    notificationMessage: string;
    seen?: boolean;
}