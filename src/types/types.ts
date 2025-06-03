export type Role = 'admin' | 'user';

export interface Session {
  userId: string;
  token: string;
  expiresAt: number;
  role: Role;
}

export interface HistoryEntry {
  noteId: string;
  action: string;
  timestamp: number;
}

export interface Collaborator {
  id: string;
  name: string;
}
