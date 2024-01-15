'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import CreatePost from "@/src/components/common/CreatePost";
import SocialMediaPost from "@/src/components/common/Post";
import AIQuestionPrompt from "@/src/components/common/AIRequest";

export default function HomePage() {
    const [query, setQuery] = useState<string>('');
    const router = useRouter();


    return (
        <div className="flex items-center justify-center mb-[12%]">
            <div className="w-full max-w-md">
                <CreatePost/>
                <AIQuestionPrompt/>
                <div className="mt-1">
                    <SocialMediaPost/>   
                </div>
            </div>
        </div>


    );
}