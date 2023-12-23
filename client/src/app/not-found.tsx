import { Button } from 'antd';
import Link from 'next/link';
import Image from 'next/image';
import { Suspense } from 'react';
import AvatarSetting from '../components/common/AvatarSetting';
import Loading from '../components/common/loading';
import Navbar from '../components/base/Navbar';

export default function NotFound() {
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
        <div className="">
          <p className="font-bold text-[#1a2e35] text-4xl leading-1 mt-2">Ooops....</p>
          <p className="font-bold text-4xl text-[#1a2e35] leading-1 mt-3">404 Error</p>
          <div className="text-4xl text-[#1a2e35] mt-3"> Page not found</div>
        </div>
        <Button className="w-[250px] border-none outline-none h-[60px] hover:bg-[#a2383a] rounded-[15px] bg-[#a20103] text-white text-2xl font-semibold mt-10">
          <Link href="/" className="flex items-center justify-center gap-10">
            Go Back
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-7 h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </Button>
      </div>
    </div>
  );
}
