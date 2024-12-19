export interface Message {
  id: string;
  content: string;
  sender: {
    name: string;
    role: string;
    initials: string;
  };
  timestamp: string;
  attachments?: string[];
}

export interface MessagesState {
  messages: Record<number, Message[]>;
  loading: boolean;
  error: string | null;
}