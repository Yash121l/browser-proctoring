import PostHogInit from '../components/Analytics/PostHogInit';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <PostHogInit />
        <div style={{ maxWidth: 960, margin: '0 auto', padding: 16 }}>{children}</div>
      </body>
    </html>
  );
}

