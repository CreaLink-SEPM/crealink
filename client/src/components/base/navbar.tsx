'use client';
import React, { useState } from 'react';
import { Tabs } from 'antd';
import homeIcon from '@/public/assets/icons/Home Icon.svg';
import searchIcon from '@/public/assets/icons/Search Icon.svg';
import heartIcon from '@/public/assets/icons/Heart Icon.svg';
import messageIcon from '@/public/assets/icons/Message Icon.svg';
import userIcon from '@/public/assets/icons/User Icon.svg';
import SearchBar from '../explore/SearchBar';
import Link from "next/link";


function Navbar() {
    const icons = [homeIcon, searchIcon, heartIcon, messageIcon, userIcon];
    const hrefs = ['/home', '/search', '/favorites', '/messages', '/profile'];

    return (
        <div className='w-[600px] ml-[8%] flex justify-between'>
            {icons.map((icon, index) => (
                <Link key={index} href={hrefs[index]} passHref>
                    <div className='flex flex-col items-center cursor-pointer'>
                        <Image src={icon} alt={`Icon ${index + 1}`} width={30} height={30} />

                    </div>
                </Link>
            ))}
        </div>
    );
}

export default Navbar;
