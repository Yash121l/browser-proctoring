import ClientProctor from '@/components/Proctoring/ClientProctor';

export default function QuizAttemptPage({ params }: { params: { id: string } }) {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';
  return (
    <main>
      <h2>Quiz Attempt {params.id}</h2>
      <ClientProctor attemptId={`demo-${params.id}`} backendUrl={backendUrl} />
      <p>Proctoring active. Events will be sent to backend.</p>
    </main>
  );
}

