'use client';
import React, { useState } from 'react';
import { Tabs } from 'antd';
import homeIcon from '@/public/assets/icons/Home Icon.svg';
import searchIcon from '@/public/assets/icons/Search Icon.svg';
import heartIcon from '@/public/assets/icons/Heart Icon.svg';
import messageIcon from '@/public/assets/icons/Message Icon.svg';
import userIcon from '@/public/assets/icons/User Icon.svg';
import SearchBar from '../explore/SearchBar';
import Image from 'next/image';
import ProfilePage from '../common/ProfilePage';

function Navbar() {
  const icons = [homeIcon, searchIcon, heartIcon, messageIcon, userIcon];
  const [activeKey, setActiveKey] = useState('1');
  const handleTabChange = (key: string) => {
    setActiveKey(key);
  };

  const renderTabContent = () => {
    switch (activeKey) {
      case '1':
        return '';
      case '2':
        return <SearchBar />;
      case '3':
        return '';
      case '4':
        return '';
      case '5':
        return <ProfilePage />;

      default:
        return null;
    }
  };

  const tabs = icons.map((icon, index) => {
    const id = String(index + 1);

    return {
      label: '',
      key: id,
      children: '',
      icon: <Image src={icon} alt={`Tab ${id}`} style={{ width: '30px' }} />,
    };
  });

  return (
    <div className="w-[600px] h-[75px] ml-[25%]">
      <Tabs defaultActiveKey="1" items={tabs} tabBarGutter={110} onChange={handleTabChange} />
      {renderTabContent()}
    </div>
  );
}

export default Navbar;
