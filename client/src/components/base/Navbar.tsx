'use client';
import React, { useEffect } from 'react';
import homeIcon from '@/public/assets/icons/Home Icon.svg';
import searchIcon from '@/public/assets/icons/Search Icon.svg';
import heartIcon from '@/public/assets/icons/Heart Icon.svg';
// import messageIcon from '@/public/assets/icons/Message Icon.svg';
import notificationIcon from '@/public/assets/icons/Notification Icon.svg';
import userIcon from '@/public/assets/icons/User Icon.svg';
import Link from 'next/link';
import Image from 'next/image';
import { useSession } from 'next-auth/react';

function Navbar() {
  const { data: session } = useSession();
  const icons = [homeIcon, searchIcon, heartIcon, notificationIcon, userIcon];
  const hrefs = ['/home', '/search', '/favorites', '/notifications', '/profile'];

  const hasNotifications = session?.user?.hasNotification;

  
  return (
    <div className="w-[600px] ml-[13%] flex justify-center space-x-20">
      {icons.map((icon, index) => (
        <Link key={index} href={hrefs[index]} passHref>
          <div className="flex flex-col items-center cursor-pointer">
            <Image src={icon} alt={`Icon ${index + 1}`} width={30} height={30} />
            {index === 3 && hasNotifications && (
             <span className="relative flex h-3 w-3 bottom-9 left-1  ">
             <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-700 opacity-75"></span>
             <span className="absolute inline-flex rounded-full h-3 w-3 bg-red-800"></span>
           </span>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
}

export default Navbar;
