'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import CreatePost from "@/src/components/common/CreatePost";
import SocialMediaPost from "@/src/components/common/Post";

export default function FavoritePage() {
    const [query, setQuery] = useState<string>('');
    const router = useRouter();


    return (
        <div className="flex items-center justify-center mb-[12%]">
            <div className="w-full max-w-md">
                <div className="text-center font-extrabold pl-20 text-2xl">Your Saved Post</div> {/* Adjust the text size as needed */}
                <div className="mt-10">
                    <SocialMediaPost/>
                </div>
            </div>
        </div>


    );
}
