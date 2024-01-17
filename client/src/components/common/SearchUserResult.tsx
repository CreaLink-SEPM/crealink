'use client';
import { searchUser } from '@/lib/serverMethod';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react';
import { Empty } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import axios from 'axios';

function SearchUserResult({ searchParams }: { searchParams: { [key: string]: string } }) {
  const { data: session } = useSession();
  const [users, setUsers] = useState<Array<[]>>([]);

  React.useEffect(() => {
    const fetchUsers = async () => {
      if (!session || !searchParams?.query) {
        return;
      }
      const token = session?.user?.accessToken;

      try {
        const response = await fetch(`http://54.169.199.32:5000/api/user/search-user?searchQuery=${searchParams?.query}`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }),
            });

        if (!response.ok) {
            console.error('Error fetching users. Server response:', response);
            return;
          }
      
          const responseData = await response.json();
          const fetchedUsers = responseData.data;
          console.log(fetchedUsers);
        setUsers(fetchedUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [searchParams, session]);

  return (
    <div className="h-[100vh">
      {users?.length > 0 &&
        users.map(user => (
          <div key={user._id} className="mb-2">
            <div className="w-full flex absolute items-center gap-5 justify-around bottom-[-7rem] left-10">
              <div className="flex items-center justify-center  ">
                <Avatar>
                  <AvatarImage src="/assets/images/avatar.png" className="object-cover" width={80} height={70} />
                  <AvatarFallback></AvatarFallback>
                </Avatar>
                <div className="p-3 mx-2 my-3 h-20">
                  <div className="text-black text-base p-1 font-semibold leading-tight flex items-center gap-5">
                    <p> {user.name} </p>
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

                  <div className="text-neutral-400 p-0.5 font-normal text-base leading-tight">{user.email}</div>
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
                    <p className="ml-6 text-black ">{user.followers}</p>
                  </div>
                </div>
              </div>
              <div className="mx-5 rounded-lg justify-center items-center inline-flex">
                <div className="text-black">
                  <Button
                    variant="outline"
                    className="border-2 text-black w-[100px] rounded-xl font-bold text-lg'"
                    asChild
                  >
                    <Link href={`/user/${user._id}`}>View</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      {users?.length < 1 && searchParams?.query?.length! > 1 && (
        <div className="absolute top-40 right-[20rem]">
          <Empty description={'No user result found'} />
        </div>
      )}
    </div>
  );
}

export default SearchUserResult;
