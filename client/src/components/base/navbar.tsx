'use client';
import React from 'react';
import { Tabs } from 'antd';
import homeIcon from "@/public/assets/icons/Home Icon.svg";
import searchIcon from "@/public/assets/icons/Search Icon.svg";
import heartIcon from "@/public/assets/icons/Heart Icon.svg";
import messageIcon from "@/public/assets/icons/Message Icon.svg";
import userIcon from "@/public/assets/icons/User Icon.svg";
import Loading from '../common/loading';
import Image from 'next/image';


function Navbar () {
  const icons = [homeIcon, searchIcon, heartIcon, messageIcon, userIcon];
  const pages = [Loading, Loading, Loading, Loading, Loading];

  const tabs = icons.map((icon, index) => {
    const id = String(index + 1);
    const PageComponent = pages[index];

    return {
      label:'',
      key: id,
      children: <PageComponent />,
      icon: <Image src={icon} alt={`Tab ${id}`}  style={{ width: '30px' }}/>,
    };
  });

  return (
    <div className='w-[450px]'>
        <Tabs defaultActiveKey="1" items={tabs} tabBarGutter={70}/>
    </div>
  )
}

export default Navbar;

