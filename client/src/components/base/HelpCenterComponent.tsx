'use client';
import Image from 'next/image';
import React, { Suspense } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import LeftSideBar from './LeftSideBar';
import Loading from '../common/loading';
import SideBarLinks from '../common/SidebarLinks';
import { ScrollArea } from '@/components/ui/scroll-area';
import Link from 'next/link';

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
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent className="text-blue-500">
                <SelectItem value="light">English (US)</SelectItem>
                <SelectItem value="dark">Vietnam (VN)</SelectItem>
              </SelectContent>
            </Select>
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
