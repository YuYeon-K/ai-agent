import '@fontsource/inter';
import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Agent Dashboard',
  description: 'Built for Ada Nomad Intern Challenge',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans bg-gray-50 text-gray-800">{children}</body>
    </html>
  );
}
