'use client';
import React from 'react';
import { Card, Button, Row, Col } from 'antd';
import Link from 'next/link';
import DropDownMenu from '../common/DropDownMenu';

function RightSideBar() {
  return (
    <div className="h-screen lg:w-1/3 lg:pt-5 lg:px-2 xl:p-5 hidden lg:block float-right">
      <hr className="border-collapse border-gray-300 h-[2px] mb-5" />
      <div className="flex justify-around items-center gap w-full">
        <h2 className="font-semibold text-xl"> Trending Topics</h2>
        <DropDownMenu />
      </div>

      {/* TRENDING TOPIC LIST  */}
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col className="gutter-row" span={6}>
          <Card style={{ width: '570%', textAlign: 'left', border: 'none', marginTop: 5 }}>
            <p className="leading-[19px] text-shadow font-normal font-[Inter] uppercase mb-1 tracking-wider text-neutral-400 text-base">
              Design
            </p>
            <h5 className="text-base text-black font-bold font-[Inter] break-word leading-tight mb-1">Desktop</h5>
            <p className=" w-20 text-zinc-600 text-sm font-normal font-[Inter] leading-tight">123.9k posts</p>
          </Card>
          <Card style={{ width: '570%', textAlign: 'left', border: 'none', marginTop: 5 }}>
            <p className="leading-[19px] text-shadow font-normal font-[Inter] uppercase mb-1 tracking-wider text-neutral'570%0 text-base">
              Movies and series
            </p>
            <h5 className="text-base text-black font-bold font-[Inter] break-word leading-tight mb-1">
              Spider-Man Across the Spider-Verse
            </h5>
            <p className=" w-20 text-zinc-600 text-sm font-normal font-[Inter] leading-tight">93.4k posts</p>
          </Card>
          <Card style={{ width: '570%', textAlign: 'left', border: 'none', marginTop: 5 }}>
            <p className="leading-[19px] text-shadow font-normal font-[Inter] uppercase mb-1 tracking-wider text-neutral-400 text-base">
              Tech
            </p>
            <h5 className="text-base text-black font-bold font-[Inter] break-word leading-tight mb-1">iPhone15</h5>
            <p className=" w-20 text-zinc-600 text-sm font-normal font-[Inter] leading-tight">86.2k posts</p>
          </Card>
        </Col>
      </Row>
      <Button style={{ background: '#A20103', color: 'white', marginTop: 20, borderRadius: 10, marginLeft: 20 }}>
        <Link href="/favorites" className="text-sm">
          See more{' '}
        </Link>
      </Button>
    </div>
  );
}

export default RightSideBar;
