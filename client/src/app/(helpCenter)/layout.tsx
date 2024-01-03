import '../globals.css';
import type { Metadata } from 'next';
import HelpCenterComponent from '@/src/components/base/HelpCenterComponent';

export const metadata: Metadata = {
  title: 'CreaLink | Help Center',
  description: 'Help Center',
};

export default function HelpCenterLayout({ children }: { children: React.ReactNode }) {
  return <HelpCenterComponent>{children}</HelpCenterComponent>;
}
