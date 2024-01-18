import React, { Suspense } from 'react';
import { GetServerSideProps, Metadata } from 'next';
import Loading from '@/src/components/common/loading';
import { Switch, Space } from 'antd';;
import { getServerSession } from 'next-auth';
import { CustomSession, authOptions } from '../../api/auth/[...nextauth]/options';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import moment from 'moment';
import Image from 'next/image';
const { Dropdown, Menu, Flex } = require('antd');
import { Label } from '@radix-ui/react-dropdown-menu';

export const metadata: Metadata = {
  title: 'CreaLink | Profile',
  description: 'Search users here and show there profile...',
};

export default async function ProfilesPage() {
  const session: CustomSession | null = await getServerSession(authOptions);
  return (
    <div className="w-full md:container h-[800px]">
      <Suspense fallback={<Loading />}>
        <div className="w-[75%] mr-[5%] overflow-auto h-auto mt-5 float-right">
          <div className="flex justify-between gap-5 items-start max-md:max-w-full max-md:flex-wrap">
            <div className="flex grow basis-[0%] flex-col items-stretch mt-5">
              <div className="justify-center text-black text-2xl font-bold leading-8 whitespace-nowrap">
                {session?.user?.username}
              </div>
              <div className="w-[30%] break-words min-w-0 p-2 block text-start text-neutral-400 text-xs leading-3 whitespace-nowrap items-stretch bg-neutral-100 mt-2 selection:py-2.5 rounded-[30px]">
                {session?.user?.email}
              </div>
              <div className="justify-center text-black text-base leading-5 mt-8">{session?.user?.bio} </div>
              <div className="flex items-stretch justify-between gap-0 mt-8 w-[100%]">
                <div className="flex items-center">
                  {/* <Image
                    loading="lazy"
                    alt="followers"
                    width={60}
                    height={50}
                    src={session?.user?.image || '/assets/images/avatar.png'}
                    className="aspect-[1] object-contain mr-2 object-center w-8 items-center overflow-hidden shrink-0 max-w-full"
                  /> */}
                  <Image
                    loading="lazy"
                    alt="followers"
                    width={60}
                    height={50}
                    src={session?.user?.image || '/assets/images/avatar.png'}
                    className="object-cover w-8 h-8 mr-2 rounded-full overflow-hidden"
                  />
                  <div className="justify-center text-neutral-400 text-base leading-5 self-center grow whitespace-nowrap my-auto">
                    {session?.user?.followers} followers
                  </div>
                </div>
              </div>
            </div>
            <div className="">
              <Image
                loading="lazy"
                width={180}
                height={170}
                alt="avatar"
                src={session?.user?.user_image}
                className="aspect-square object-contain w-[190px] h-[150px] justify-center rounded-[25px] items-center overflow-hidden shrink-0"
              />
            </div>
          </div>
          {/* CONTENT */}
          <div>
            <Tabs defaultValue="account" className="mt-5 border-none">
              <TabsList className="grid w-full grid-cols-2 outline-none">
                <TabsTrigger value="posts">Posts</TabsTrigger>
                <TabsTrigger value="followers">Followers</TabsTrigger>
              </TabsList>
              <TabsContent value="posts" className="h-[500px] overflow-auto">
                <Card>
                  <CardHeader className="text-center border-0"></CardHeader>
                  {/* <div className="flex justify-around">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-[250px]" />
                      <Skeleton className="h-4 w-[250px]" />
                    </div>
                  </div>
                  <Skeleton className="h-4 w-[400px] ml-[18%] mt-5" />
                  <Skeleton className="h-4 w-[400px] ml-[18%] mt-5" />
                  <Skeleton className="h-4 w-[400px] ml-[18%] mt-5" />
                  <Skeleton className="h-4 w-[400px] ml-[18%] mt-5" /> */}
                  {session?.user?.posts && session?.user.posts.length > 0 ? (
                    session?.user.posts.map(post => (
                      <div key={post._id} className="relative w-[572px] h-[533.99px] border-t border-solid border-lightgrey mb-33">
                        {/* Post Header */}
                        <div className="post-header flex items-center mt-3">
                        <div className="user-profile-picture mr-2">
                            {/* Dynamic user image URL */}
                            <Image
                              src={session?.user?.user_image|| '/default-profile-image.jpg'} // Provide a default image URL or use a placeholder
                              alt="User Profile Picture"
                              width={36}
                              height={36}
                              className="w-[36px] h-[36px] rounded-[18px] object-cover"
                            />
                          </div>

                          {/* User Name */}
                          <div className="user-info flex items-center">
                            {post.creator && (
                              <>
                                <span className="user-name font-bold mr-2">{session?.user?.username}</span>
                              </>
                            )}
                          </div>

                          {/* Timestamp */}
                          <div className="ml-auto">
                            {post.creator && (
                              <span className="timestamp ml-2">{moment(post.createdAt).startOf('hour').fromNow()}</span>
                            )}
                          </div>
                      
                        </div>

                        {/* Post Content */}
                        {/* Post Content */}
                        <div className="post-content">
                        {/* Main Post Image or Text */}
                        <h1 className="text-base font-bold mb-2">{post.title}</h1>
                        <p className="text-base mb-4">{post.content}</p>

                        {/* Conditionally render the image if post.imageUrl exists */}
                        {post.imageUrl && (
                          <div className="main-post-image overflow-hidden">
                            <img
                              src={post.imageUrl}
                              alt=""
                              className="w-full h-[400px] object-cover rounded-lg"
                            />
                          </div>
                        )}
                      </div>
                      </div>
                    ))) : (
                    <CardHeader className="text-center border-0">
                      <CardDescription>No posts</CardDescription>
                    </CardHeader>
                  )}
                </Card>
              </TabsContent>
              <TabsContent value="followers" className="h-[500px] overflow-auto">
                <Card>
                  <CardHeader className="text-center">
                    <div className="flex items-center justify-evenly">
                      <Image
                        loading="lazy"
                        alt="followers"
                        width={60}
                        height={50}
                        style={{ width: '70px', height: '65px' }}
                        src={session?.user?.follower[0]?.user_image || '/assets/images/avatar.png'}
                        className="aspect-[1] object-contain mr-2 object-center w-8 items-center overflow-hidden shrink-0 max-w-full"
                      />
                      <p>{session?.user?.follower[0]?.username || 'no followers'}</p>
                    </div>
                  </CardHeader>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </Suspense>
    </div>
  );
}
