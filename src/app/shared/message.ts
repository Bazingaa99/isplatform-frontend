import { Chat } from './chat';
import { User } from './user';

export interface Message {
  id?: number
  chat: Chat
  sender?: User
  text: string
  dateSent?: Date
}
