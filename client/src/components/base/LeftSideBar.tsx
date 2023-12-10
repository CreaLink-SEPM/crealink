'use client';
import Image from 'next/image';
import React from 'react';

function LeftSideBar() {
  return (
    <div className="w-[20%] text-center bottom-0 relative">
      <div className="w-35 h-14 justify-center items-center inline-flex">
        <div className="grow shrink basis-0 self-stretch justify-center items-center inline-flex">
          <div className="grow shrink basis-0 absolute bottom-[50%]  self-stretch px-6 py-5 bg-red-800 rounded-full shadow border border-black border-opacity-5 justify-center items-start gap-px inline-flex">
            <div className="grow shrink basis-0 self-stretch py-px justify-center items-center inline-flex">
              <div className="grow shrink basis-0 self-stretch justify-center items-center inline-flex">
                <div className="w-14 h-4 text-white text-base font-semibold font-['Roboto'] leading-tight">For you</div>
                <Image src="/assets/icons/switch2side.png" className='ml-2' alt="setting" width={15} height={20} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeftSideBar;
