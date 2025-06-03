import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Session } from '../types/types';

interface SessionState {
  session: Omit<Session, 'expiresAt'> & { expiresAt?: number };
  setSession: (data: Session) => void;
  clearSession: () => void;
}

export const useSessionStore = create<SessionState>()(
  persist(
    (set) => ({
      session: {
        userId: '',
        token: '',
        expiresAt: 0,
        role: 'user',
      },
      setSession: (data) => set({ session: data }),
      clearSession: () => set({
        session: {
          userId: '',
          token: '',
          expiresAt: 0,
          role: 'user',
        },
      }),
    }),
    {
      name: 'session-store',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        session: {
          userId: state.session.userId,
          token: state.session.token,
          role: state.session.role,
        },
      }),
      version: 2,
      migrate: (persisted: unknown, version: number) => {
        const state = persisted as { session: Partial<Session> };
      
        if (version < 2) {
          return {
            session: {
              ...state.session,
              role: 'user', // newly added field
            },
          };
        }
      
        return state;
      }
      ,
    }
  )
);
