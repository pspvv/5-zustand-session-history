import { create } from 'zustand';
import type { Collaborator } from '../types/types';

interface CollaboratorStore {
  collaborators: Collaborator[];
  setCollaborators: (c: Collaborator[]) => void;
}

export const useCollaboratorStore = create<CollaboratorStore>((set) => ({
  collaborators: [],
  setCollaborators: (c) => set({ collaborators: c }),
}));
