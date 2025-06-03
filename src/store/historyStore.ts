import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { devtools } from 'zustand/middleware';
import type { HistoryEntry } from '../types/types';

interface HistoryState {
  history: HistoryEntry[];
  addHistoryEntry: (noteId: string, action: string) => void;
  clearHistory: () => void;
}

export const useHistoryStore = create<HistoryState>()(
  devtools(
    immer((set) => ({
      history: [],
      addHistoryEntry: (noteId, action) =>
        set((state) => {
          state.history.push({ noteId, action, timestamp: Date.now() });
        }),
      clearHistory: () => set((state) => {
        state.history = [];
      }),
    }))
  )
);
