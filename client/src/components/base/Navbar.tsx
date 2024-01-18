'use client';
import React, { useEffect, useState } from 'react';
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

  // const hasNotifications = session?.user?.hasNotification;
  const [hasNotifications, setHasNotifications] = useState(false);
  console.log("HAS NOTIFICATION: ", hasNotifications);
  const fetchNotifications = async () => {
    if (!session) {
      return;
    }

    const token = session?.user?.accessToken;

    try {
      const response = await fetch(`http://54.169.199.32:5000/api/user/get-user-notification`, {
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }),
      });

      if (!response.ok) {
        console.error('Error fetching notifications. Server response:', response);
        return;
      }

      const responseData = await response.json();
      const fetchNotifi = responseData.data.notifications;
      setHasNotifications(fetchNotifi.length > 0);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  useEffect(() => {
    fetchNotifications();

    const pollingInterval = setInterval(() => {
      fetchNotifications();
    }, 100);

    // Cleanup interval on component unmount
    return () => clearInterval(pollingInterval);
  }, [session]);

  
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
