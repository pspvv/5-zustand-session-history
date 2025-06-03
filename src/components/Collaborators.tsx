import { useQuery } from '@tanstack/react-query';
import { fetchCollaborators } from '../api/fetchCollaborators';
import { useCollaboratorStore } from '../store/collaboratorStore';
import { useEffect } from 'react';

interface Collaborator {
  id: string;
  name: string;
}

const Collaborators = () => {
  const { collaborators, setCollaborators } = useCollaboratorStore();

  const { isPending, error, data } = useQuery<Collaborator[], Error>({
    queryKey: ['collaborators'] as const,
    queryFn: fetchCollaborators,
  });

  // Update the store only when data changes
  useEffect(() => {
    if (data) {
      setCollaborators(data);
    }
  }, [data, setCollaborators]);

  if (isPending) return <p>Loading collaborators...</p>;
  if (error) return <p>Error loading collaborators: {error.message}</p>;

  return (
    <div>
      <h3>Collaborators</h3>
      <ul>
        {collaborators.map((c) => (
          <li key={c.id}>{c.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Collaborators;