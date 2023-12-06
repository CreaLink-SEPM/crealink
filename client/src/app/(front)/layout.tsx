import '../globals.css';
import type { Metadata } from 'next';
import { ThemeProvider } from '@/src/components/theme-provider';
import CustomProvider from '../provider';

export const metadata: Metadata = {
  title: 'CreaLink | Home Page',
  description: 'Main page of CreaLink',
};

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <CustomProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
      </ThemeProvider>
    </CustomProvider>
  );
}
