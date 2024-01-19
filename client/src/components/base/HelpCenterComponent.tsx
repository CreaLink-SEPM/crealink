'use client';
import Image from 'next/image';
import React, { Suspense } from 'react';
import Loading from '../common/loading';
import SideBarLinks from '../common/SidebarLinks';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

function HelpCenterComponent({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-5 xs:container">
      <div>
        {/* HEADER SECTION */}
        <div className="flex justify-between">
          <div className="flex items-stat gap-3">
            <Link href="/home" className="px-3 my-2">
            <Image
              src="/assets/icons/Logo Icon.svg"
              typeof="image/svg"
              quality={100}
              loading="lazy"
              alt="logo"
              width={50}
              height={40}
            />
            </Link>
            <p className="w-[124px] h-5 mt-3 text-xl font-semibold text-left text-neutral-800">Help Center</p>
          </div>
          <div className="">
           <Button variant="link" asChild>
              <Link href="/home"> Back</Link>
            </Button>
          </div>
        </div>
        <hr className="w-full border-collapse border-gray-300 h-[3px] mt-5" />
        {/* BODY SECTION */}
        <div className="mt-5">
          <div className="flex">
            <SideBarLinks />    
            <Suspense fallback={<Loading />}>
            {children}
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HelpCenterComponent;
