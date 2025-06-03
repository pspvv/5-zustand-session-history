import type { Collaborator } from '../types/types';

export async function fetchCollaborators(): Promise<Collaborator[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: '1', name: 'Alice' },
        { id: '2', name: 'Bob' },
        { id: '3', name: 'Charlie' },
      ]);
    }, 1000);
  });
}
