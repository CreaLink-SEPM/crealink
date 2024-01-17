import React, { Suspense, useState } from 'react';
import { Metadata } from 'next';
import Loading from '@/src/components/common/loading';
import Notifications from '@/src/components/common/Notifications';

export const metadata: Metadata = {
  title: 'CreaLink | Notifications',
  description: 'See what you have been up to',
};

export default async function ProfilesPage() {
  return (
    <div className="w-full md:container h-[100vh]">
      <Suspense fallback={<Loading />}>
        <Notifications />
      </Suspense>
    </div>
  );
}
