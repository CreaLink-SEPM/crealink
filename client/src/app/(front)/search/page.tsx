import React, { Suspense } from 'react';
import { Metadata } from 'next';
import Loading from '@/src/components/common/loading';
import SearchBar from '@/src/components/explore/SearchBar';

export const metadata: Metadata = {
  title: 'CreaLink | Search Page',
  description: 'Search users here and show there profile...',
};

async function ExplorePage() {
  return (
    <div className="w-[100%] container mb-[46%]">
      <Suspense fallback={<Loading />}>
        <SearchBar />
      </Suspense>
    </div>
  );
}

export default ExplorePage;
