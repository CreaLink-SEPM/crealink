import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from '@/src/components/ui/toaster';
import './globals.css';
import StyledComponentsRegistry from '@/lib/AntRegistry';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CreaLink | Travel Review Social Media App',
  description: 'Reviewing travel destinations with ease and even more',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/assets/images/Logo.png" type="image/png" sizes="32x32" />
      </head>
      <body className={inter.className}>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
        <Toaster />
      </body>
    </html>
  );
}
