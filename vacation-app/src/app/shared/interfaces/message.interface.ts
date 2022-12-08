export enum MessageType {
  Success,
  Error,
}

export interface IMessage {
  message: string;
  type: MessageType;
}
