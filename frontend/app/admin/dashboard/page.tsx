export default function AdminDashboard() {
  return (
    <main>
      <h2>Admin Dashboard</h2>
      <ul>
        <li><a href="/admin/quizzes">Quizzes</a></li>
        <li><a href="/admin/attempts">Attempts</a></li>
        <li><a href="/admin/live">Live Monitor</a></li>
      </ul>
    </main>
  );
}

