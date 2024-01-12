import React, { Suspense } from 'react';
import { Metadata } from 'next';
import Loading from '@/src/components/common/loading';
import FavoritePage from "@/src/components/common/FavoritePage";
import { fetchLikedPost } from '@/lib/serverMethod';



export const metadata: Metadata = {
    title: 'CreaLink | Favorite Page',
    description: 'Your favorite posts are loading...',
};


export default async function FavoritesPage() {
    return (
        <div className="w-full md:container h-[100vh]">
            {/* <Suspense  fallback={<Loading />}> */}
                    <FavoritePage />
            {/* </Suspense> */}
        </div>
    );
}
