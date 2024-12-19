import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { SearchResult } from '@/types/search';

export const sectionIconMap = {
  tasks: 'AlertCircle' as const,
  announcements: 'MessageSquare' as const,
  marketplaces: 'Tag' as const,
  discussions: 'MessageSquare' as const,
  packages: 'Package' as const,
  votes: 'MessageSquare' as const,
  amenities: 'Calendar' as const,
};

interface SearchState {
  searchTerm: string;
  results: SearchResult[];
  initialResults: SearchResult[];
}

const initialState: SearchState = {
  searchTerm: '',
  results: [],
  initialResults: [],
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
      if (!action.payload) {
        state.results = [...state.initialResults];
      }
    },
    setSearchResults: (state, action: PayloadAction<SearchResult[]>) => {
      state.results = [...action.payload];
    },
    setInitialResults: (state, action: PayloadAction<SearchResult[]>) => {
      state.initialResults = [...action.payload];
      if (!state.searchTerm) {
        state.results = [...action.payload];
      }
    },
  },
});

export const { setSearchTerm, setSearchResults, setInitialResults } = searchSlice.actions;

export default searchSlice.reducer;