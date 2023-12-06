import ThemeToggleBtn from '@/src/components/common/ThemeToggleBtn';
import { Button } from '@/src/components/ui/button';
import Image from 'next/image';
import '../globals.css';
import { Label } from '@radix-ui/react-dropdown-menu';
import { Suspense } from 'react';
import Loading from '@/src/components/common/loading';
import Navbar from '@/src/components/base/navbar';

export default function Home() {
  return (
    <div className="w-[1600px] h-full">
      <div className="flex justify-between items-baseline mt-4 mr-3">
        <Image src="assets/icons/Logo Icon.svg" alt="homepage" width={40} height={40} />
        <div className="flex-grow flex justify-center text-red-100">
          <Suspense fallback={<Loading />}>
            <Navbar />
          </Suspense>
        </div>
        <div className="mr-[5%]">
          <ThemeToggleBtn />
        </div>
        <Image src="assets/icons/Right Infos.svg" alt="setting" className='mr-3' width={30} height={30} />
      </div>
    </div>
  );
}
