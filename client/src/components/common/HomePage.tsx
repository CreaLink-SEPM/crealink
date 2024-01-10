'use client';
import React, { useEffect, useState } from 'react';
import CreatePost from "@/src/components/common/CreatePost";
import { CLIENT_RENEG_WINDOW } from 'tls';
import { fetchPosts } from '@/lib/serverMethod';
// import { useRouter } from '@/node_modules/next/router';
// import SocialMediaPost from "@/src/components/common/Post";
// import { Dropdown, Menu } from 'antd';
const {Dropdown, Menu} = require('antd');
// import axios, { AxiosError } from 'axios';
const axios = require('axios');



export default function HomePage({posts } : { posts: PostType}) {
    const [query, setQuery] = useState<string>('');
    // const router = useRouter();
    // const [posts, setPosts] = useState([]);
    const [error, setError] = useState<string | null>(null);

    
    // const response = await fetchPosts();
    // const data = await response;
    // console.log("RESPONSE",data);
    // setPosts(data);
        // useEffect(() => {
        //     const fetchPosts = async () => {
        //         try {
        //         } catch (err: any) {
        //             setError(err.message);
        //         }
        //     };
    
        //     fetchPosts();
        // }, [posts]);
    
        // const createPost = async (postData: PostData) => {
        //     try {
        //         await axios.post(`${apiUrl}/post`, postData);
        //     } catch (err: any) {
        //         setError(err.message);
        //     }
        // };
    
        // const updatePost = async (postId: string, updatedData: PostData) => {
        //     try {
        //         await axios.put(`${apiUrl}/post/${postId}`, updatedData);
        //     } catch (err: any) {
        //         setError(err.message);
        //     }
        // };
    
    
        // const deletePost = async (postId: string) => {
        //     try {
        //         await axios.delete(`${apiUrl}/post/${postId}`);
        //     } catch (err: any) {
        //         setError(err.message);
        //     }
        // };
    
        // const toggleLike = async (postId: string) => {
        //     try {
        //         await axios.put(`${apiUrl}/like/${postId}`);
        //     } catch (err: any) {
        //         setError(err.message);
        //     }
        // };
    
        // const sharePost = async (postId: string) => {
        //     try {
        //         const response = await axios.get(`${apiUrl}/share/${postId}`);
        //     } catch (err: any) {
        //         setError(err.message);
        //     }
        // };
    
        // const reportPost = async (postId: string, reason: string) => {
        //     try {
        //         await axios.post(`${apiUrl}/report/${postId}`, { reason });
        //     } catch (err: any) {
        //         setError(err.message);
        //     }
        // };
    
        // if (error) return <div>Error: {error}</div>;
        // if (!posts.length) return <div>Loading...</div>;
        // var apiUrl = 'http://54.169.199.32:5000/api/feed/posts';
        // useEffect(() => {
        //     const fetchPosts = async () => {
        //         try {
        //             const response = await fetch(apiUrl);
        //             if (!response.ok) {
        //                 throw new Error('Network respone was ok');
        //             }
        //             const data = await response.json();
        //             setPosts(data);
        //         } catch (err: any) {
        //             setError(err.message);;
        //         }
                
        //     };
        //     fetchPosts();
        
        // }, []);
    
        const menu = (
            <Menu>
                <Menu.Item style={{ color: 'red', fontWeight: 'bold'}}>
                    Report</Menu.Item>
            </Menu>
        );
    return (
        <div className="flex items-center justify-center mb-[12%]">
            <div className="w-full max-w-md">
                <CreatePost/>
                <div className="mt-1">
            {/* {posts.map((post, index) => ( */}
                <div className="relative w-[572px] h-[533.99px]"
                     style={{borderTop: '0.5px solid lightgrey', marginBottom: '33px'}}>

                    {/* Post Header */}
                    <div className="post-header">
                        {/* User Profile Picture */}
                        <div className="user-profile-picture">
                             {/*Dynamic user image URL */}
                            <div
                                className="w-[36px] h-[36px] rounded-[18px]  bg-cover bg-[50%_50%]"
                            />
                        </div>
                        {/* User Name and Timestamp */}
                        <div className="user-info">
                            <span className="user-name"></span>
                            <span className="timestamp"></span>
                        </div>
                        {/* Dropdown Menu */}
                        <div className="dropdown-menu">
                            {/* Dropdown component */}
                            <Dropdown overlay={menu} placement="bottomRight">
                                <img
                                    className="left-[24px] absolute w-[30px] h-[22px] top-0 object-cover"
                                    alt="Div margin"
                                    src="https://c.animaapp.com/n1QiTcNd/img/div-x146dn1l-margin-1.svg"
                                />
                            </Dropdown>
                        </div>
                    </div>

                    {/* Post Content */}
                    <div className="post-content">
                        {/* Main Post Image or Text */}
                        <div className="main-post-image">
                            <img src="#" alt="Post content"/>
                        </div>
                    </div>

                    {/* Post Interaction Section */}
                    <div className="post-interactions">
                        {/* Interaction Icons */}
                        {/* Icons for like, comment, share, etc. */}
                        <img
                            className="absolute w-[36px] h-[36px] top-0 left-0 object-cover"
                            alt="Div"
                            src="https://c.animaapp.com/n1QiTcNd/img/div-x6s0dn4-4.svg"
                        />
                        <img
                            className="absolute w-[36px] h-[36px] top-0 left-[36px] object-cover"
                            alt="Div"
                            src="https://c.animaapp.com/n1QiTcNd/img/div-x6s0dn4-3.svg"
                        />
                        <div className="absolute w-[36px] h-[36px] top-0 left-[72px]">
                            <img
                                className="absolute w-[20px] h-[20px] top-[8px] left-[8px]"
                                alt="Reshare icon"
                                src="https://c.animaapp.com/n1QiTcNd/img/reshare-icon.svg"
                            />
                        </div>
                    </div>


                    {/* Post Footer */}
                    <div className="post-footer">
                        {/* Likes and Comments Info */}
                        <span> likes</span>
                        <span> comments</span>
                    </div>
                </div>
            {/* ))} */}
        </div>
                </div>
            </div>
    );
}
function setPosts(data: any) {
    throw new Error('Function not implemented.');
}

