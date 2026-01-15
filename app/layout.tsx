import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'One-Stop Recruiting Guide',
  description: 'Two features: company research reports and a recruiter finder.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
