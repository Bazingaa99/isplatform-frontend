import { User } from "./user";

export interface Feedback {
    id?: number;
    user?: User;
    writer?: User;
    feedbackMessage: string;
    starsCount: number;
}