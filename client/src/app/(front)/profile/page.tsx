import React, { Suspense } from 'react';
import { Metadata } from 'next';
import Loading from '@/src/components/common/loading';
import ProfilePage from '@/src/components/common/ProfilePage';

export const metadata: Metadata = {
  title: 'CreaLink | Profile',
  description: 'Search users here and show there profile...',
};

export default function ProfilesPage() {
  return (
    <div className="w-full md:container">
      <Suspense fallback={<Loading />}>
        <ProfilePage />
      </Suspense>
    </div>
  );
}
