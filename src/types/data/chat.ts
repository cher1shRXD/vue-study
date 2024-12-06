import { User } from "./user";

export interface Chat {
  sender: User;
  message: string;
}