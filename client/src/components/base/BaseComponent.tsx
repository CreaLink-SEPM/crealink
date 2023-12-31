'use client';
import React, { Suspense } from 'react';
import LeftSideBar from './LeftSideBar';
import RightSideBar from './RightSideBar';
import AvatarSetting from '@/src/components/common/AvatarSetting';
import Navbar from '@/src/components/base/Navbar';
import Footer from '@/src/components/common/Footer';
import Link from 'next/link';
import Loading from '@/src/components/common/loading';
import Image from 'next/image';
import ThemeToggleBtn from '../common/ThemeToggleBtn';
import { useSession } from 'next-auth/react';

function BaseComponent({ children }: { children: React.ReactNode }) {
  const {data:session} = useSession();
  return (
    <div className="container p-5">
      <div className="flex flex-col w-full xl:container">
        <div className="flex justify-between items-center">
          <div className="flex justify-evenly w-full items-baseline mt-4 mr-3">
            <Link href="/home" className="px-3 my-2">
              <Image src="assets/icons/Logo Icon.svg" alt="homepage" width={50} height={50} />
            </Link>
            <div className="flex-grow flex justify-center text-red-100">
              <Suspense fallback={<Loading />}>
                <Navbar />
              </Suspense>
            </div>
            <div className="px-8 my-2">
              <div className="flex items-center justify-between gap-8 mb-5">
                <ThemeToggleBtn />
                <AvatarSetting />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <LeftSideBar  />
        <p>{session?.user?.email}</p>
        {/* <ScrollArea className="h-screen w-full lg:w-2/4 md:w-3/4 lg:px-8 lg:py-4 xl:px-12  md:p-6">
          <MobileNavBar />
        </ScrollArea> */}
        {children}
        <Suspense fallback={<Loading />}>
          <RightSideBar />
        </Suspense>
      </div>
      <div className=''>
        <Footer />
      </div>
    </div>
  );
}

export default BaseComponent;
