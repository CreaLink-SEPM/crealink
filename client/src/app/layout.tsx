import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import StyledComponentsRegistry from '@/lib/AntRegistry';
import CustomProvider from './provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CreaLink | Travel Review Social Media App',
  description: 'Reviewing travel destinations with ease and even more',
};

export default function RootLayout({ children, session }: { children: React.ReactNode, session: any }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/assets/images/icon.svg" type="image/svg" sizes="32x32" />
      </head>
      <body className={inter.className}>
        <CustomProvider session={session}>
          <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
        </CustomProvider>
      </body>
    </html>
  );
}
