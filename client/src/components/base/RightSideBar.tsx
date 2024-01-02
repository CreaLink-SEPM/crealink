'use client';
import React, { useState, useEffect } from 'react';
import { Card, Button, Row, Col } from 'antd';
import Link from 'next/link';
import DropDownMenu from '../common/DropDownMenu';

function RightSideBar() {
  const [trendingTopics, setTrendingTopics] = useState([
    { category: 'China', title: 'The Great Wall', posts: '123.9k posts' },
    { category: 'India', title: 'The spiritual', posts: '93.4k posts' },
    { category: 'Tokyo', title: 'Wibu culture', posts: '200.2k posts' },
    { category: 'The US', title: 'Unncany Valley', posts: '350.2k posts' },
    { category: 'VietNam', title: 'Binh Duong Magic Land', posts: '76.2k posts' },
    { category: 'Brazil', title: 'Amazon rain', posts: '236.2k posts' },
  
  ]);

  const [displayTopics, setDisplayTopics] = useState(trendingTopics.slice(0, 3));


  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setTrendingTopics((prevTopics) => {
        const rotatedTopics = [...prevTopics.slice(1), prevTopics[0]];
        return rotatedTopics;
      });
      setDisplayTopics(trendingTopics.slice(0, 3));
    }, 4000); 

    return () => {
      clearTimeout(timeoutId);
    };
  }, [trendingTopics]);
  return (
    <div className="h-screen lg:w-1/3 lg:pt-5 lg:px-2 xl:p-5 hidden lg:block float-right">
      <div className='fixed'>
      <hr className="border-collapse border-gray-300 h-[2px] mb-5" />
      <div className="flex justify-around items-center gap w-full">
        <h2 className="font-semibold text-xl mr-5"> Trending Topics</h2>
        <div className='text-3xl'> 🔥 </div>
      </div>

      {/* TRENDING TOPIC LIST  */}    
       <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col className="gutter-row" span={6}>
          {displayTopics.map((topic, index) => (
            <Card className='animate-[pulse_3s_infinite]'  key={index} style={{ width: '570%', textAlign: 'left', border: 'none', marginTop: 5 }}>
            <p className="leading-[19px] text-shadow font-normal font-[Inter] uppercase mb-1 tracking-wider text-neutral-400 text-base">
              {topic.category}
            </p>
            <h5 className="w-[250px] text-base text-black font-bold font-[Inter] break-word leading-tight mb-1">{topic.title}</h5>
            <p className=" w-20 text-zinc-600 text-sm font-normal font-[Inter] leading-tight">{topic.posts}</p>
            </Card>
          ))}
        </Col>
      </Row>
      </div>
    </div>
  );
}

export default RightSideBar;
