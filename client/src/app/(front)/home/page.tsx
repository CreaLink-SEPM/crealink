import React, { Suspense } from 'react';
import { Metadata } from 'next';
import Loading from '@/src/components/common/loading';
import HomePage from "@/src/components/common/HomePage";

export const metadata: Metadata = {
    title: 'CreaLink | Home Page',
    description: 'Your newsfeed is loading...',
};

export default function HomesPage() {
    return (
        <div className="w-full md:container h-[100vh]">
            <Suspense fallback={<Loading />}>
                <HomePage />
            </Suspense>
        </div>
    );
}
