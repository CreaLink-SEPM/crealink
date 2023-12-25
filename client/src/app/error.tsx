'use client'
import Image from 'next/image';
import Link from 'next/link';
import React, { Suspense } from 'react';
import Loading from '../components/common/loading';
import AvatarSetting from '../components/common/AvatarSetting';
import { Button } from 'antd';
import './globals.css';
import Navbar from '../components/base/Navbar';

function Error() {
  return (
    <div>
      <div className="flex flex-col w-full xl:container">
        <div className="flex justify-between items-center">
          <div className="flex justify-evenly w-full items-baseline mt-4 mr-3">
            <Link href="/" className="px-3 my-2">
              <Image src="assets/icons/Logo Icon.svg" alt="homepage" width={50} height={50} />
            </Link>
            <div className="flex-grow flex justify-center text-red-100">
              <Suspense fallback={<Loading />}>
                <Navbar />
              </Suspense>
            </div>
            <div className="px-8 my-2">
              <div className="flex items-center justify-between gap-8 mb-5">
                <AvatarSetting />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid place-items-center m-[200px]">
        <div className="text-center">
          <p className="font-bold text-[#1a2e35] text-4xl leading-1 mt-2">Ooops....</p>
          <p className="font-bold text-4xl text-[#1a2e35] leading-1 mt-3">500 Error</p>
          <div className="text-4xl text-[#1a2e35] mt-3 text-center"> Server not found</div>
        </div>
      </div>
    </div>
  );
}

export default Error;
