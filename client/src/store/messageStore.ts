import { create } from "zustand";

export interface Message {
   question: string;
   answer: string;
   messageLoading: boolean;
   setMessageLoading: (messageLoading: boolean) => void;
}

interface MessageStore {
   messages: Message[];
   setMessages: (messages: Message[]) => void;
   clearMessages: () => void;
   messageLoading: boolean;
   setMessageLoading: (messageLoading: boolean) => void;
}

export const useMessageStore = create<MessageStore>((set) => ({
   messages: [],
   setMessages: (messages: Message[]) => set({ messages }),
   clearMessages: () => set({ messages: [] }),
   messageLoading: false,
   setMessageLoading: (messageLoading: boolean) => set({ messageLoading }),
}));
