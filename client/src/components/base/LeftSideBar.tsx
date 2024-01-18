'use client';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { useSession } from "next-auth/react";


function LeftSideBar() {
  const { data: session } = useSession();
  console.log("session", session)
  return (
    <Link href="/terms" className="w-[20%] text-center bottom-0 h-[100%]">
      <div className="w-35 h-14 justify-center items-center inline-flex fixed">
        <div className="self-stretch justify-center items-center inline-flex">
          <div className="absolute  self-stretch pl-3 pr-3 py-5 bg-red-800 rounded-full shadow border border-black border-opacity-5 justify-center items-start inline-flex">
            <div className="self-stretch py-px justify-center items-center inline-flex">
              <div className="justify-center items-center inline-flex gap-4">
                <div className="w-20 h-4 text-white text-center text-base font-semibold font-['Roboto'] leading-tight">
                  <span className="w-[100px] block"> Help Center </span>
  
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="white"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default LeftSideBar;
