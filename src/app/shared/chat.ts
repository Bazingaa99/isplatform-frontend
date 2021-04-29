import { Message } from "./message";
import { Request } from "./request";

export interface Chat {
  id?: number
  request: Request
  messages?: Message[]
}
