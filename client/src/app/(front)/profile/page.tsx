import React, { Suspense } from 'react';
import { GetServerSideProps, Metadata } from 'next';
import Loading from '@/src/components/common/loading';
import ProfilePage from '@/src/components/common/ProfilePage';

import { getServerSession } from 'next-auth';
import { CustomSession, authOptions } from '../../api/auth/[...nextauth]/options';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'CreaLink | Profile',
  description: 'Search users here and show there profile...',
};

export default async function ProfilesPage() {
  const session: CustomSession | null = await getServerSession(authOptions);
  return (
    <div className="w-full md:container h-[800px]">
      <Suspense fallback={<Loading />}>
        <div className="w-[75%] mr-[5%] overflow-auto h-auto mt-5 float-right">
          <div className="flex justify-between gap-5 items-start max-md:max-w-full max-md:flex-wrap">
            <div className="flex grow basis-[0%] flex-col items-stretch mt-5">
              <div className="justify-center text-black text-2xl font-bold leading-8 whitespace-nowrap">
                {session?.user?.username}
              </div>
              <div className="w-[35%] p-2 block text-start text-neutral-400 text-xs leading-3 whitespace-nowrap items-stretch bg-neutral-100 mt-2 selection:py-2.5 rounded-[30px]">
                {session?.user?.email}
              </div>
              <div className="justify-center text-black text-base leading-5 mt-8">{session?.user?.bio} </div>
              <div className="flex items-stretch justify-between gap-0 mt-6">
                {/* <Image
                  loading="lazy"
                  alt="followers"
                  width={60}
                  height={50}
                  src={session?.user?.image||'/assets/images/avatar.png'}
                  className="aspect-[1] object-contain mr-2 object-center w-8 items-center overflow-hidden shrink-0 max-w-full"
                /> */}
                <div className="justify-center text-neutral-400 text-base leading-5 self-center grow whitespace-nowrap my-auto">
                  {session?.user?.followers} followers
                </div>
              </div>
            </div>
            <Image
              loading="lazy"
              width={100}
              height={90}
              alt="avatar"
              src= {session?.user?.user_image || '/assets/images/profile.jpg'}
              className="aspect-square object-contain object-center w-[150px] justify-center rounded-full items-center overflow-hidden shrink-0 max-w-full"
            />
          </div>
          {/* CONTENT */}
          <div>
            <Tabs defaultValue="account" className="mt-5 border-none">
              <TabsList className="grid w-full grid-cols-2 outline-none">
                <TabsTrigger value="posts">Posts</TabsTrigger>
                <TabsTrigger value="followers">Followers</TabsTrigger>
              </TabsList>
              <TabsContent value="posts" className="h-[500px] overflow-auto">
                <Card>
                  <CardHeader className="text-center border-0">
                    <CardTitle>Account</CardTitle>
                    <CardDescription>Make changes to your account here. Click save when you're done.</CardDescription>
                    <CardDescription>Make changes to your account here. Click save when you're done.</CardDescription>
                    <CardDescription>Make changes to your account here. Click save when you're done.</CardDescription>
                    <CardDescription>Make changes to your account here. Click save when you're done.</CardDescription>
                    <CardDescription>Make changes to your account here. Click save when you're done.</CardDescription>
                    <CardDescription>Make changes to your account here. Click save when you're done.</CardDescription>
                    <CardDescription>Make changes to your account here. Click save when you're done.</CardDescription>
                    <CardDescription>Make changes to your account here. Click save when you're done.</CardDescription>
                    <CardDescription>Make changes to your account here. Click save when you're done.</CardDescription>
                    <CardDescription>Make changes to your account here. Click save when you're done.</CardDescription>
                    <CardDescription>Make changes to your account here. Click save when you're done.</CardDescription>
                    <CardDescription>Make changes to your account here. Click save when you're done.</CardDescription>
                  </CardHeader>
                </Card>
              </TabsContent>
              <TabsContent value="followers" className="h-[500px] overflow-auto">
                <Card>
                  <CardHeader className="text-center">
                      {/* <CardDescription>{session?.user?.follower[0].username}</CardDescription> */}
                    <div className='flex items-center justify-items-start'>
                      <Image
                    loading="lazy"
                    alt="followers"
                    width={60}
                    height={50}
                    src={session?.user?.follower[0].user_image||'/assets/images/avatar.png'}
                    className="aspect-[1] object-contain mr-2 object-center w-8 items-center overflow-hidden shrink-0 max-w-full"
                    /> 
                      <p>{session?.user?.follower[0].username}</p>
                    </div>
                  </CardHeader>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </Suspense>
    </div>
  );
}
