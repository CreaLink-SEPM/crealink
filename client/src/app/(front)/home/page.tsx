import React, { Suspense } from 'react';
import { Metadata } from 'next'
import Loading from '@/src/components/common/loading';
import HomePage from "@/src/components/common/HomePage";
import { fetchPosts } from '@/lib/serverMethod';

export interface Post {
    id: number;
    title: string;
    imageUrl: string;
    createdAt: Date;
    updatedat: Date;
    likesCount: number;
    commentsCount: number;
    comments: Comment[];
    creator: User[];

}
export const metadata: Metadata = {
    title: 'CreaLink | Home Page',
    description: 'Your newsfeed is loading...',
};

export default async function HomesPage({params}: {params : {id: number}  }) {
    const posts  = await fetchPosts(params.id);
    console.log("posts: " ,posts);

    return (
        <div className="w-full md:container h-[100vh]">
            <Suspense fallback={<Loading />}>
                {posts &&  (
                    <HomePage  />
                )}
            </Suspense>
        </div>
    );
}
