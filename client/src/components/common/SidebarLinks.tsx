import React from 'react';

import Link from 'next/link';
import ThemeToggleBtn from './ThemeToggleBtn';
import { usePathname } from 'next/navigation';

export default function SideBarLinks() {
  const pathname = usePathname();
  return (
    <ul className="mt-10">
      <li className="p-5 bg-[#2d88ff]/10 w-[328px] rounded-lg">
        <Link
          href="/terms"
          className={`flex justify-start items-center hover:font-bold ${pathname == '/' ? 'font-bold' : ''}`}
        >
          <h3 className="text-lg lg:text-xl ml-2 text-center">Term of use</h3>
        </Link>
      </li>
      <li className='p-5 w-[328px] rounded-lg mt-2'>
        <Link
          href="/privacy-policy"
          className={`flex justify-start items-center hover:font-bold ${
            pathname == '/explore' ? 'font-bold' : ''
          }`}
        >
          <h3 className="text-lg lg:text-xl ml-2">Privacy Policy</h3>
        </Link>
      </li>
      <li className='p-5 w-[328px] rounded-lg mt-2'>
        <Link
          href="/cookies-policy"
          className={`flex justify-start items-center hover:font-bold  ${
            pathname == '/notifications' ? 'font-bold' : ''
          }`}
        >
          <h3 className=" text-lg lg:text-xl  ml-2">Cookies Policy</h3>
        </Link>
      </li>
    </ul>
    
  );
}
