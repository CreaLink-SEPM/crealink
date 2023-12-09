import ThemeToggleBtn from '@/src/components/common/ThemeToggleBtn';
import Image from 'next/image';
import '../globals.css';
import { Suspense } from 'react';
import BaseComponent from '@/src/components/base/BaseComponent';
import Loading from '@/src/components/common/Loading';
import Navbar from '@/src/components/base/Navbar';
import AvatarSetting from '@/src/components/common/AvatarSetting';
import LeftSideBar from '@/src/components/base/LeftSideBar';
import RightSideBar from '@/src/components/base/RightSideBar';

export default function Home() {
  return (
    <div className="flex flex-col w-full xl:container">
      <div className="flex justify-between items-baseline mt-4 mr-3">
        <div className="px-3 my-2">
          <Image src="assets/icons/Logo Icon.svg" alt="homepage" width={50} height={50} />
        </div>
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
      <div className="flex items-center w-full">
        <BaseComponent activeTab="1" />
      </div>
      <RightSideBar />
    </div>
  );
}
