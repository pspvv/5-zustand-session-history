import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useSessionStore } from './store/sessionStore';
import { useHistoryStore } from './store/historyStore';
import Collaborators from './components/Collaborators';

const client = new QueryClient();

const App: React.FC = () => {
  const { session, setSession, clearSession } = useSessionStore();
  const { history, addHistoryEntry, clearHistory } = useHistoryStore();

  return (
    <QueryClientProvider client={client}>
      <div style={{ padding: '30px' }}>
        <h1>Assignment 5: Zustand + React Query</h1>

        <section>
          <h2>Session</h2>
          <pre>{JSON.stringify(session, null, 2)}</pre>
          <button
            onClick={() =>
              setSession({
                userId: 'u1',
                token: 'abc123',
                expiresAt: Date.now() + 60000,
                role: 'admin',
              })
            }
          >
            Set Session
          </button>
          <button onClick={clearSession} style={{ marginLeft: 10 }}>
            Clear
          </button>
        </section>

        <section style={{ marginTop: 30 }}>
          <h2>Note History</h2>
          <button onClick={() => addHistoryEntry('note-1', 'created')}>Add Entry</button>
          <button onClick={clearHistory} style={{ marginLeft: 10 }}>
            Clear
          </button>
          <ul>
            {history.map((h, i) => (
              <li key={i}>
                {h.noteId} - {h.action} @ {new Date(h.timestamp).toLocaleTimeString()}
              </li>
            ))}
          </ul>
        </section>

        <section style={{ marginTop: 30 }}>
          <Collaborators />
        </section>
      </div>
    </QueryClientProvider>
  );
};

export default App;
