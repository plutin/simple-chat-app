import {Message} from './message';
export interface Channel {
  chatId: string;
  messages: Message[];
}
