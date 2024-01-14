import Link from 'next/link';
import React from 'react';

function Footer() {
  return (
    <div className="w-full py-5 flex place-items-start fixed bottom-0 justify-items-start text-[11px] container mt-5">
      <div className="relative bottom-0 right-[7%]">
        <div className=" absolute left-0 top-[3.5px]">
          <div className="absolute left-0 top-0">
            <p className="absolute w-[6rem] left-0 top-px text-center text-[#999]">© 2024</p>
          </div>
        </div>
        <div className=" h-[16.8px] absolute left-[55.68px] top-[3.5px]">
          <div className="h-[16.8px] absolute left-0 top-0">
            <Link href="/terms" className="hover:underline h-3.5 w-[9rem] absolute left-0 top-px text-center text-[#999]">CreaLink Terms</Link>
          </div>
        </div>
        <div className="h-[16.8px] absolute left-[151.94px] top-[3.5px]">
          <div className="h-[16.8px] absolute left-0 top-0">
            <Link href="/privacy-policy" className="hover:underline h-3.5 w-[9rem] absolute left-0 top-px  text-center text-[#999]">Privacy Policy</Link>
          </div>
        </div>
        <div className="h-[16.8px] absolute left-[242.36px] top-[3.5px]">
          <div className="h-[16.8px] absolute left-0 top-0">
            <Link href="/cookies-policy" className="hover:underline h-3.5 w-[9rem] absolute left-0 top-px text-center text-[#999]">Cookies Policy</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
