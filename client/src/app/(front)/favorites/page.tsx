import React from 'react';
import { Metadata } from 'next';
import FavoritePage from '@/src/components/common/FavoritePage';

export const metadata: Metadata = {
  title: 'CreaLink | Favorite Page',
  description: 'Your favorite posts are loading...',
};

export default async function FavoritesPage() {
  return (
    <div className="w-full md:container h-[100vh]">
      <FavoritePage />
    </div>
  );
}
