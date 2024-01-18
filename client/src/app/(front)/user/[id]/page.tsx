'use client';
import React, { Suspense, useState } from 'react';
import Loading from '@/src/components/common/loading';
import { Card, CardDescription, CardHeader } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Image from 'next/image';
import { fetchUsers } from '@/lib/serverMethod';
import FollowingUser from '@/src/components/common/FollowingUser';
import { useSession } from 'next-auth/react';

interface UserInfo {
  id: string;
  username: string;
  name: string;
  email: string;
  bio: string;
  followers: { name: string; username: string; user_image: string; _id: string }[];
  posts: { _id: string, title: string, imageUrl: string, content: string, creator: string, likes: string[], createdAt: string, updatedAt: string }[];
  following: { name: string; username: string; user_image: string; _id: string }[];
  user_image: string;
}
export default async function ProfilesPage({ params }: { params: { id: number } }) {
  const { data: session } = useSession();
  const [user, setUser] = useState<Array<UserInfo | null>>([]);

  React.useEffect(() => {
    const fetchUsers = async () => {
      if (!session) {
        return;
      }
      const token = session?.user?.accessToken;

      try {
        const response = await fetch(`http://54.169.199.32:5000/api/user/get-user/${params.id}`, {
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
        setUser(fetchedUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [session]);

  return (
    <div className="w-full md:container h-[800px]">
      <Suspense fallback={<Loading />}>
        <div className="w-[75%] mr-[5%] overflow-auto h-auto mt-5 float-right">
          <div className="flex justify-between gap-5 items-start max-md:max-w-full max-md:flex-wrap">
            {user && (
              <>
                <div className="flex grow basis-[0%] flex-col items-stretch mt-5">
                  <div className="justify-center text-black text-2xl font-bold leading-8 whitespace-nowrap">
                    {user?.username}
                  </div>
                  <div className="w-[38%] p-2 block text-start justify-center text-neutral-400 text-xs leading-3 whitespace-nowrap items-stretch bg-neutral-100 mt-2 selection:py-2.5 rounded-[30px]">
                    {user?.email}
                  </div>
                  <div className="justify-center text-black text-base leading-5 mt-8">
                    {user?.bio || 'Reptatulious ☀️'}{' '}
                  </div>
                  <div className="flex items-stretch justify-between gap-0 mt-6">
                    <Image
                      loading="lazy"
                      alt="followers"
                      width={60}
                      height={50}
                      src={user?.image || '/assets/images/avatar.png'}
                      className="aspect-[1] object-contain mr-2 object-center w-8 items-center overflow-hidden shrink-0 max-w-full"
                    />
                    <div className="justify-center text-neutral-400 text-base leading-5 self-center grow whitespace-nowrap my-auto">
                      {user?.followers} followers
                    </div>
                  </div>
                </div>
                <div>
                  <Image
                    loading="lazy"
                    width={100}
                    height={90}
                    alt="avatar"
                    src="/assets/images/profile.jpg"
                    className="aspect-square object-contain object-center w-[150px] justify-center rounded-full items-center overflow-hidden shrink-0 max-w-full"
                  />
                  <FollowingUser users={user?.id} isFollowed={user?.isFollowed} />
                </div>
              </>
            )}
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
                  {user?.posts && user?.posts.length > 0 ? (
                    user?.posts.map(post => (
                      <div key={post._id} className="mb-4">
                        <CardHeader className="text-center border-0">
                          <CardDescription className="text-base font-bold mb-2">{post.title}</CardDescription>
                        </CardHeader>
                        <div className="main-post-image overflow-hidden">
                          {post.imageUrl && (
                            <img
                              src={post.imageUrl}
                              alt=""
                              className="w-full h-[400px] object-cover rounded-lg"
                            />
                          )}
                        </div>
                        <CardDescription className="text-base mb-4">{post.content}</CardDescription>
                      </div>
                    ))
                  ) : (
                    <CardHeader className="text-center border-0">
                      <CardDescription>No posts</CardDescription>
                    </CardHeader>
                  )}
                </Card>
              </TabsContent>

              <TabsContent value="followers" className="h-[500px] overflow-auto">
                {user?.follower && user?.follower.length > 0 ? (
                  user?.follower.map(follower => (
                    <Card key={follower._id}>
                      <CardHeader className="text-center">
                        <div className="flex items-center justify-evenly">
                          <Image
                            loading="lazy"
                            alt="follower" 
                            width={80}
                            height={70}
                            src={follower.user_image || '/assets/images/avatar.png'}
                            style={{ width: '70px', height: '65px' }}
                            className="aspect-[1]  object-contain mr-2 rounded-md object-center h-9 items-center overflow-hidden shrink-0 max-w-full"
                          />
                          <p>{follower.username}</p>
                        </div>
                      </CardHeader>
                    </Card>
                  ))
                ) : (
                  <div className="text-center mt-2">No followers</div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </Suspense>
    </div>
  );
}
