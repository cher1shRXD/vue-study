import { Chat } from "./chat";
import { User } from "./user";

export interface ChatRoom {
  name: string;
  chats?: Chat[];
  members: User[];
  founder?: User;
  joinCode?: string;
  _id: string;
}
