'use client';
import Image from 'next/image';
import React from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const ProfilePage = () => {
  const router = useRouter();

  return (
    <div className="w-[90%] ml-[8%] overflow-auto h-auto mt-5">
      <div className="flex justify-between gap-5 items-start max-md:max-w-full max-md:flex-wrap">
        <div className="flex grow basis-[0%] flex-col items-stretch mt-5">
          <div className="justify-center text-black text-2xl font-bold leading-8 whitespace-nowrap">robert_Pahm</div>
          <div className="w-[80px] block text-center justify-center text-neutral-400 text-xs leading-3 whitespace-nowrap items-stretch bg-neutral-100 mt-1 py-2.5 rounded-[30px]">
            crealink.net
          </div>
          <div className="justify-center text-black text-base leading-5 mt-8"> Reptatulious ☀️ </div>
          <div className="flex items-stretch justify-between gap-0 mt-6">
            <Image
              loading="lazy"
              alt="followers"
              width={60}
              height={50}
              src="/assets/images/avatar.png"
              className="aspect-[1] object-contain mr-2 object-center w-8 items-center overflow-hidden shrink-0 max-w-full"
            />
            <div className="justify-center text-neutral-400 text-base leading-5 self-center grow whitespace-nowrap my-auto">
              238 followers
            </div>
          </div>
        </div>
        <Image
          loading="lazy"
          width={100}
          height={90}
          alt="avatar"
          src="/assets/images/profile.jpg"
          className="aspect-square object-contain object-center w-[150px] justify-center rounded-full items-center overflow-hidden shrink-0 max-w-full"
        />
      </div>
      {/* CONTENT */}
      <div>
        <Tabs defaultValue="account" className="mt-5 border-none">
          <TabsList className="grid w-full grid-cols-2 outline-none">
            <TabsTrigger value="account">CreaLinks</TabsTrigger>
            <TabsTrigger value="password">Followers</TabsTrigger>
          </TabsList>
          <TabsContent value="account" className="h-[500px] overflow-auto">
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
          <TabsContent value="password">
            <Card>
              <CardHeader className="text-center">
                <CardTitle>Password</CardTitle>
                <CardDescription>Change your password here. After saving, you'll be logged out.</CardDescription>
                <CardDescription>Change your password here. After saving, you'll be logged out.</CardDescription>
                <CardDescription>Change your password here. After saving, you'll be logged out.</CardDescription>
                <CardDescription>Change your password here. After saving, you'll be logged out.</CardDescription>
                <CardDescription>Change your password here. After saving, you'll be logged out.</CardDescription>
                <CardDescription>Change your password here. After saving, you'll be logged out.</CardDescription>
                <CardDescription>Change your password here. After saving, you'll be logged out.</CardDescription>
                <CardDescription>Change your password here. After saving, you'll be logged out.</CardDescription>
                <CardDescription>Change your password here. After saving, you'll be logged out.</CardDescription>
                <CardDescription>Change your password here. After saving, you'll be logged out.</CardDescription>
                <CardDescription>Change your password here. After saving, you'll be logged out.</CardDescription>
              </CardHeader>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProfilePage;
