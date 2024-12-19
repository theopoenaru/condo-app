import { configureStore } from '@reduxjs/toolkit';
import feedReducer from './slices/feedSlice';
import inboxReducer from './slices/inboxSlice';
import searchReducer from './slices/searchSlice';
import messagesReducer from './slices/messagesSlice';

export const store = configureStore({
  reducer: {
    feed: feedReducer,
    inbox: inboxReducer,
    search: searchReducer,
    messages: messagesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;