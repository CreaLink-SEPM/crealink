import React, { Suspense } from 'react';
import { Metadata } from 'next';
import Loading from '@/src/components/common/loading';
import SearchBar from '@/src/components/explore/SearchBar';
import Footer from '@/src/components/common/Footer';
import { searchUser } from '@/lib/serverMethod';
import { Empty } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useSession } from 'next-auth/react';
import SearchUserResult from '@/src/components/common/SearchUserResult';

export const metadata: Metadata = {
  title: 'CreaLink | Search Page',
  description: 'Search users here and show there profile...',
};

export interface User {
  _id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  followers?: number | null;
  username?: string | null;
}
export default async function ExplorePage({
  searchParams,
}: {
  searchParams: { [key: string]: string };
  authToken: string;
}) {
  return (
    <div className="w-full container mb-[55%] relative h-[100%]">
      <Suspense fallback={<Loading />}>
        <SearchBar />
      </Suspense>

      <SearchUserResult searchParams={searchParams} />
    </div>
  );
}
