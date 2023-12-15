'use client';
import React from 'react';
import SearchBar from '../explore/SearchBar';
import LeftSideBar from './LeftSideBar';
import RightSideBar from './RightSideBar';

function BaseComponent({ activeTab }: { activeTab: string }) {
  return (
    <div className="w-full flex items-center justify-between md:container ">{activeTab === '2' && <SearchBar />}</div>
  );
}

export default BaseComponent;
