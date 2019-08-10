export interface Message {
  senderId: number;
  text: string;
  timestamp: string;
  delivered: boolean;
}
