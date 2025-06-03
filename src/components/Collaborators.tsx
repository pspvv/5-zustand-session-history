import { useQuery } from '@tanstack/react-query';
import { fetchCollaborators } from '../api/fetchCollaborators';
import { useCollaboratorStore } from '../store/collaboratorStore';
import type { Collaborator } from '../types/types';

const Collaborators: React.FC = () => {
  const { collaborators, setCollaborators } = useCollaboratorStore();

  const { isLoading, error } = useQuery<Collaborator[], Error, Collaborator[]>({
    queryKey: ['collaborators'],
    queryFn: fetchCollaborators,
    onSuccess: (data: Collaborator[]) => {
      setCollaborators(data);
    },
  });

  if (isLoading) return <p>Loading collaborators...</p>;
  if (error) return <p>Error loading collaborators</p>;

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
