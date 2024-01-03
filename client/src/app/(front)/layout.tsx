import '../globals.css';
import type { Metadata } from 'next';
import { ThemeProvider } from '@/src/components/theme-provider';
import CustomProvider from '../provider';
import BaseComponent from '@/src/components/base/BaseComponent';

export const metadata: Metadata = {
  title: 'CreaLink | Home Page',
  description: 'Share your experience with others',
};

export default function RootLayout({ children, session }: { children: React.ReactNode, session: any }) {
  return (
    <CustomProvider session={session}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <BaseComponent >
          {children}
        </BaseComponent>
      </ThemeProvider>
    </CustomProvider>
  );
}
