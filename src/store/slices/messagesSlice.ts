import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Message, MessagesState } from '@/types/messages';
import { mockMessages } from '@/data/mockMessages';

const initialState: MessagesState = {
  messages: {
    1: mockMessages, // Initialize with mock data for task ID 1
  },
  loading: false,
  error: null,
};

export const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<{ taskId: number; message: Message }>) => {
      const { taskId, message } = action.payload;
      if (!state.messages[taskId]) {
        state.messages[taskId] = [];
      }
      state.messages[taskId].push(message);
    },
    setMessages: (state, action: PayloadAction<{ taskId: number; messages: Message[] }>) => {
      const { taskId, messages } = action.payload;
      state.messages[taskId] = messages;
    },
    deleteMessage: (state, action: PayloadAction<{ taskId: number; messageId: string }>) => {
      const { taskId, messageId } = action.payload;
      if (state.messages[taskId]) {
        state.messages[taskId] = state.messages[taskId].filter(
          message => message.id !== messageId
        );
      }
    },
  },
});

export const { addMessage, setMessages, deleteMessage } = messagesSlice.actions;

export default messagesSlice.reducer;