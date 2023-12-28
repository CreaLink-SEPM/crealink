import React, { Suspense } from 'react';
import { Metadata } from 'next';
import Loading from '@/src/components/common/loading';
import UserAvatar from '@/src/components/common/UserAvatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export const metadata: Metadata = {
  title: 'CreaLink | Notifications',
  description: 'See what you have been up to',
};

export default async function ProfilesPage() {
  return (
    <div className="w-full md:container mb-[47%]">
      <Suspense fallback={<Loading />}>
        <div className="w-full mt-[3%] p-1">
          <div className="flex items-start justify-around space-x-5 mb-3 w-full md:container">
            <div className="flex items-center gap-3">
              <UserAvatar name={''} image="/assets/images/avatar.png" />
              <div className=" w-[90%]">
                <div className="flex justify-between w-full items-center">
                  <p className="font-bold text-xl">Caicedodfdf</p>
                  <span className="text-sm">3 minutes</span>
                </div>
                <p className="text-md">Commented on your post</p>
              </div>
            </div>
            <div>
              <Button className="w-[104px] h-[40px] hover:bg-[#a2383a] font-bold bg-slate-50 border border-black rounded-xl text-black">
                Delete
              </Button>
            </div>
          </div>
        </div>
        <Separator className="w-[87%] ml-[10%] mt-5" />
      </Suspense>
    </div>
  );
}
