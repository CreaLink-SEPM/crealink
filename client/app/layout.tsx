import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';


const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CreaLink | Travel Review Social Media App',
  description: 'Reviewing travel destinations with ease and even more',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/assets/icons/icon.svg" type="image/png" sizes="32x32" />
      </head>
      <body className={inter.className}>   
          {children}
      </body>
    </html>
  );
}
