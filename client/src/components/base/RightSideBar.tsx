'use client';
import React from 'react';
import { Card, Button } from 'antd';
import Link from 'next/link';
import DropDownMenu from '../common/DropDownMenu';

function RightSideBar() {
  return (
    <div className="text-center mb-[20%] w-[25%] float-right">
      <hr className="border-collapse border-gray-300 h-[2px] mb-5" />
      <div className="flex justify-around items-center gap-20 w-full">
        <h2 className="font-semibold text-xl"> Trending Topics</h2>
        <DropDownMenu />
      </div>

      {/* TRENDING TOPIC LIST  */}
      <Card style={{ width: 340, textAlign: 'left', border: 'none', marginTop: 5 }}>
        <p className="leading-[19px] text-shadow font-normal font-[Inter] uppercase mb-1 tracking-wider text-neutral-400 text-base">
          Design
        </p>
        <h5 className="text-base text-black font-bold font-[Inter] break-word leading-tight mb-1">Desktop</h5>
        <p className=" w-20 text-zinc-600 text-sm font-normal font-[Inter] leading-tight">123.9k posts</p>
      </Card>
      <Card style={{ width: 340, textAlign: 'left', border: 'none', marginTop: 5 }}>
        <p className="leading-[19px] text-shadow font-normal font-[Inter] uppercase mb-1 tracking-wider text-neutral-400 text-base">
          Movies and series
        </p>
        <h5 className="text-base text-black font-bold font-[Inter] break-word leading-tight mb-1">
          Spider-Man Across the Spider-Verse
        </h5>
        <p className=" w-20 text-zinc-600 text-sm font-normal font-[Inter] leading-tight">93.4k posts</p>
      </Card>
      <Card style={{ width: 340, textAlign: 'left', border: 'none', marginTop: 5 }}>
        <p className="leading-[19px] text-shadow font-normal font-[Inter] uppercase mb-1 tracking-wider text-neutral-400 text-base">
          Tech
        </p>
        <h5 className="text-base text-black font-bold font-[Inter] break-word leading-tight mb-1">iPhone15</h5>
        <p className=" w-20 text-zinc-600 text-sm font-normal font-[Inter] leading-tight">86.2k posts</p>
      </Card>

      <Button style={{ background: '#A20103', color: 'white', marginTop: 20, borderRadius: 10 }}>
        <Link href="/" className="text-sm">
          See more{' '}
        </Link>
      </Button>
    </div>
  );
}

export default RightSideBar;
