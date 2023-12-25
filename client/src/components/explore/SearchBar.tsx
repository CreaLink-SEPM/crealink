'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Image from 'next/image';
import { Button } from '../ui/button';
import Link from 'next/link';

export default function SearchBar() {
  const [query, setQuery] = useState<string>('');
  const router = useRouter();

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    router.replace(`/explore?query=${query}`);
  };
  return (
    <div className="md:container ml-[8%] h-auto mt-5">
      <form onSubmit={submit}>
        <input
          type="search"
          className="w-[80%] float-right mr-10 flex-1 rounded-2xl h-16 p-5 text-slate-500 bg-muted outline-none"
          placeholder=" 🔍   Search"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
      </form>

      {/* RESULT OF SEARCH  */}
      <div className="w-full h-36 items-start mt-5">
        <div className="w-full flex items-center gap-5 justify-around mb-10">
          <div className="flex items-center">
            <Avatar>
              <AvatarImage src="/assets/images/avatar.png" className="object-cover" width={80} height={70} />
              <AvatarFallback>voguemagazine</AvatarFallback>
            </Avatar>
            <div className="p-3 mx-2 my-3 h-20">
              <div className="text-black text-base p-1 font-semibold leading-tight flex items-center gap-5">
                <p>voguemagazine</p>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="blue"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
                    />
                  </svg>
                </span>
              </div>
              <div className="text-neutral-400 p-0.5 font-normal text-base leading-tight">Vogue</div>
              <div className="flex items-center justify-betwee mt-2">
                <div className="relative items-center inline-block;">
                  <Image
                    src="/assets/images/avatar.png"
                    className="ml-1 rounded-full object-cover overflow-hidden"
                    alt="setting"
                    width={23}
                    height={20}
                  />
                  <Image
                    src="/assets/images/avatar.png"
                    alt="setting"
                    className="absolute top-0 left-5"
                    width={23}
                    height={15}
                  />
                </div>
                <p className="ml-6 text-black "> 2.9M followers</p>
              </div>
            </div>
          </div>
          <div className="mx-5 rounded-lg justify-center items-center inline-flex">
            <div className="text-black">
              <Button variant="outline" className="border-2 text-black w-[100px] rounded-xl font-bold text-lg'" asChild>
                <Link href="/login">Follow</Link>
              </Button>
            </div>
          </div>
        </div>
        <hr className="w-[90%] ml-[10%] border-collapse border-gray-300 h-[2px]" />
      </div>
    </div>
  );
}
