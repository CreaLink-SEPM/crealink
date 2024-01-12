'use client';

import React, { useState, useEffect } from 'react';
import moment from 'moment';
// import { Dropdown, Menu } from 'antd';
const {Dropdown, Menu} = require('antd');
const {useSession} = require('next-auth/react');
// import axios, { AxiosError } from 'axios';
const axios = require('axios');

interface PostData {
    [key: string]: any;
}

interface Post {
    _id: string;
    title: string;
    content: string;
    creator: {
        _id: string;
        username: string;
        user_image: string;
    };
    createdAt: string;
    updatedAt: string;
    __v: number;
    likesCount: number;
    commentsCount: number;
    comments: Comment[];
}




const SocialMediaPost = () => {
    const {data: session} = useSession();
    const [posts, setPosts] = useState("");
    console.log('POSTS ',posts);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState<number | null>(1);

    const apiUrl = `http://54.169.199.32:5000/api/feed/posts?page=${page}`;

    useEffect(() => {
        const fetchData = async () => {
            if (!session) return;
            const token = session.user?.accessToken;
            console.log('Access token: ', token);
            try {
                const response = await axios.get(apiUrl, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                });
                console.log(response);
                const data = response.data;
                console.log('RESPONE DATA ',data);
                if (response.status !== 200) {
                    throw new Error(`Failed to fetch data. Status: ${response.status}`);
                }

                if (!response.data || !response.data.posts) {
                    throw new Error(`Failed to fetch data. Response: ${JSON.stringify(response.data)}`);
                }

                setPosts(data.posts);
                console.log('API Response: ', response.data);
            } catch (error) {
                console.log(error);

            }
        };

        fetchData();
    }, [session]);

    // Rest of your component...



    // useEffect(() => {
    //     const fetchPosts = async () => {
    //         try {
    //             const response = await axios.get(`${apiUrl}/posts`);
    //             setPosts(response.data.posts);
    //         } catch (err: any) {
    //             setError(err.message);
    //         }
    //     };

    //     fetchPosts();
    // }, []);

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


    const menu = (
        <Menu>
            <Menu.Item style={{ color: 'red', fontWeight: 'bold'}}>
                Report</Menu.Item>
        </Menu>
    );
    return (

         <div>
             {posts && 
             posts.map((post) => (
                 <div key={post._id} className="relative w-[572px] h-[533.99px]"
                      style={{borderTop: '0.5px solid lightgrey', marginBottom: '33px'}}>

                     {/* Post Header */}
                    <div className="post-header flex items-center">
                    {/* User Profile Picture */}
                    <div className="user-profile-picture mr-2">
                        {/* Dynamic user image URL */}
                        <div
                        className="w-[36px] h-[36px] rounded-[18px] bg-cover"
                        style={{ backgroundImage: `url(${post.creator.user_image})` }}
                        />
                    </div>

                    {/* User Name */}
                    <div className="user-info flex items-center">
                        {post.creator && (
                        <span className="user-name font-bold">{post.creator.username}</span>
                        )}
                    </div>

                    {/* Timestamp */}
                    <div className="ml-auto">
                        {post.creator && (
                        <span className="timestamp ml-2">{moment(post.createdAt).startOf('day').fromNow()}</span>
                        )}
                    </div>

                    {/* Dropdown Menu */}
                    <div className="dropdown-menu ml-2">
                        {/* Dropdown component */}
                        <Dropdown overlay={menu} placement="bottomRight">
                        <img
                            className="w-30 h-22 object-cover"
                            alt="Div margin"
                            src="https:c.animaapp.com/n1QiTcNd/img/div-x146dn1l-margin-1.svg"
                        />
                        </Dropdown>
                    </div>
                    </div>
                     {/* Post Content */}
                     <div className="post-content">
                         {/* Main Post Image or Text */}
                         <h1>{post.title}</h1>   
                         <p>{post.content}</p>
                         <div className="main-post-image overflow-hidden">
                             <img src={post.imageUrl || "/assets/images/profile.jpg"}  alt="Post content" className="w-full h-full object-cover rounded-lg"/>
                         </div>
                     </div>

                     {/* Post Interaction and Footer Container */}
                     <div className="post-interaction-footer-container flex flex-col justify-between">
                        {/* Interaction Icons */}
                        <div className="post-interactions flex items-center">
                            {/* Icons for like and comment */}
                            <img
                            className="w-[36px] h-[36px] object-cover mr-2"
                            alt="Like icon"
                            src="https://c.animaapp.com/n1QiTcNd/img/div-x6s0dn4-4.svg"
                            />
                            <img
                            className="w-[36px] h-[36px] object-cover mr-2"
                            alt="Comment icon"
                            src="https://c.animaapp.com/n1QiTcNd/img/div-x6s0dn4-3.svg"
                            />
                            <img
                            className="w-[20px] h-[20px] top-[8px] left-[8px]"
                            alt="Reshare icon"
                            src="https://c.animaapp.com/n1QiTcNd/img/reshare-icon.svg"
                            />
                        </div>

                        {/* Post Footer */}
                        <div className="post-footer">
                            {/* Likes and Comments Info */}
                            <span className="mr-2">{post.likesCount} likes .</span>
                            <span>{post.commentsCount} comments</span>
                        </div>

                        </div>

                                        </div>
                                    ))}
                                </div>


        //  <div className="relative w-[572px] h-[533.99px]" style={{borderTop: '0.5px solid lightgrey', marginBottom: '33px'}}>
        //      <div className="relative w-[572px] h-[533.99px] top-[20px]">
        //          <div className="h-[40px] top-0 absolute w-[48px] left-0">
        //              <div className="relative top-[4px] w-[36px] h-[36px] bg-[#efefef] rounded-[18px]">
        //                 <div className="h-[36px] bg-neutral-100 rounded-[18px]">
        //                     <div className="w-[36px] h-[36px]">
        //                         <div className="relative w-[37px] h-[37px] rounded-[17.5px]">
        //                             <div
        //                                 className="w-[36px] h-[36px] rounded-[18px] bg-[url(https://c.animaapp.com/n1QiTcNd/img/377212994-626721102778908-3499740340252537033-n-jpg@2x.png)] bg-cover bg-[50%_50%] absolute top-0 left-0"/>
        //                             <div
        //                                 className="w-[37px] h-[37px] rounded-[17.5px] border border-solid border-[#00000026] absolute top-0 left-0"/>
        //                         </div>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //         <div className="absolute w-[524px] h-[22px] -top-px left-[48px]">
        //             <div className="relative h-[22px]">
        //                 <div className="w-[470px] absolute h-[21px] top-0 left-0">
        //                     <div className="w-[85px] h-[21px]">
        //                         <div className="h-[21px]">
        //                             <div className="w-[85px] h-[21px]">
        //                                 <div className="relative h-[21px]">
        //                                     <div
        //                                         className="absolute w-[85px] h-[18px] top-0 left-0 [font-family:'Roboto',Helvetica] font-semibold text-black text-[15px] tracking-[0] leading-[21px] whitespace-nowrap">
        //                                         aman_tokyo
        //                                     </div>
        //                                 </div>
        //                             </div>
        //                         </div>
        //                     </div>
        //                 </div>
        //                 <div className="absolute w-[54px] h-[22px] top-0 left-[470px]">
        //                     <div className="absolute w-[24px] h-[14px] top-[4px] left-0">
        //                         <div
        //                             className="w-[24px] text-[14.4px] absolute h-[21px] top-[-4px] left-0 [font-family:'Roboto',Helvetica] font-normal text-[#999999] text-center tracking-[0] leading-[21px] whitespace-nowrap">
        //                             12h
        //                         </div>
        //                     </div>
        //                     <Dropdown overlay={menu} placement="bottomRight">
        //                         <img
        //                             className="left-[24px] absolute w-[30px] h-[22px] top-0 object-cover"
        //                             alt="Div margin"
        //                             src="https://c.animaapp.com/n1QiTcNd/img/div-x146dn1l-margin-1.svg"
        //                         />
        //                     </Dropdown>
        //                 </div>
        //             </div>
        //         </div>
        //         <div className="h-[466px] top-[40px] absolute w-[48px] left-0"/>
        //         <div className="h-[485px] absolute w-[524px] top-[21px] left-[48px]">
        //             <div className="relative h-[477px] top-[8px]">
        //                 <div className="h-[435px] top-0 absolute w-[524px] left-0">
        //                     <div className="w-[360px] h-[430px] rounded-[8px]">
        //                         <div className="h-[430px]">
        //                             <div className="w-[360px] h-[430px]">
        //                                 <div className="h-[430px]">
        //                                     <div className="relative w-[360px] h-[430px] rounded-[7px]">
        //                                         <div
        //                                             className="rounded-[8px] bg-[url(https://c.animaapp.com/n1QiTcNd/img/400983289-889270855965019-4991156490034155777-n-jpg@2x.png)] bg-cover bg-[50%_50%] absolute w-[360px] h-[430px] top-0 left-0"/>
        //                                         <div
        //                                             className="rounded-[7px] border border-solid border-[#00000026] absolute w-[360px] h-[430px] top-0 left-0"/>
        //                                     </div>
        //                                 </div>
        //                             </div>
        //                         </div>
        //                     </div>
        //                 </div>
        //                 <div className="absolute w-[531px] h-[36px] top-[441px] left-[-7px]">
        //                     <img
        //                         className="absolute w-[36px] h-[36px] top-0 left-0 object-cover"
        //                         alt="Div"
        //                         src="https://c.animaapp.com/n1QiTcNd/img/div-x6s0dn4-4.svg"
        //                     />
        //                     <img
        //                         className="absolute w-[36px] h-[36px] top-0 left-[36px] object-cover"
        //                         alt="Div"
        //                         src="https://c.animaapp.com/n1QiTcNd/img/div-x6s0dn4-3.svg"
        //                     />
        //                     <div className="absolute w-[36px] h-[36px] top-0 left-[72px]">
        //                         <img
        //                             className="absolute w-[20px] h-[20px] top-[8px] left-[8px]"
        //                             alt="Reshare icon"
        //                             src="https://c.animaapp.com/n1QiTcNd/img/reshare-icon.svg"
        //                         />
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //         <div className="absolute w-[572px] h-[28px] top-[506px] left-0">
        //             <div className="relative w-[202px] h-[28px]">
        //                 <div className="absolute w-[48px] h-[20px] top-[4px] left-0">
        //                     <div className="w-[40px] h-[20px]">
        //                         <div className="relative w-[32px] h-[20px] left-[4px]">
        //                             <div className="relative h-[20px]">
        //                                 <div
        //                                     className="absolute w-[16px] h-[16px] top-[2px] left-0 bg-neutral-100 rounded-[8px]">
        //                                     <div className="h-[16px]">
        //                                         <div className="relative w-[17px] h-[17px] rounded-[7.5px]">
        //                                             <div
        //                                                 className="w-[16px] h-[16px] rounded-[8px] bg-[url(https://c.animaapp.com/n1QiTcNd/img/357811045-1987868941549293-8596588435582708190-n-jpg@2x.png)] bg-cover bg-[50%_50%] absolute top-0 left-0"/>
        //                                             <div
        //                                                 className="w-[17px] h-[17px] rounded-[7.5px] border border-solid border-[#00000026] absolute top-0 left-0"/>
        //                                         </div>
        //                                     </div>
        //                                 </div>
        //                                 <div
        //                                     className="absolute w-[20px] h-[20px] top-0 left-[12px] bg-white rounded-[10px]">
        //                                     <div
        //                                         className="relative w-[16px] h-[16px] top-[2px] left-[2px] bg-neutral-100 rounded-[8px]">
        //                                         <div className="h-[16px]">
        //                                             <div className="relative w-[17px] h-[17px] rounded-[7.5px]">
        //                                                 <div
        //                                                     className="w-[16px] h-[16px] rounded-[8px] bg-[url(https://c.animaapp.com/n1QiTcNd/img/359452161-7212821988744843-2119687233277087413-n-jpg@2x.png)] bg-cover bg-[50%_50%] absolute top-0 left-0"/>
        //                                                 <div
        //                                                     className="w-[17px] h-[17px] rounded-[7.5px] border border-solid border-[#00000026] absolute top-0 left-0"/>
        //                                             </div>
        //                                         </div>
        //                                     </div>
        //                                 </div>
        //                             </div>
        //                         </div>
        //                     </div>
        //                 </div>
        //                 <div className="absolute w-[16px] h-[21px] top-[4px] left-[114px]">
        //                     <div
        //                         className="absolute w-[12px] h-[18px] top-0 left-[2px] [font-family:'Roboto',Helvetica] font-normal text-[#999999] text-[15px] tracking-[0] leading-[21px] whitespace-nowrap">
        //                         {" "}
        //                         ·
        //                     </div>
        //                 </div>
        //                 <div className="absolute w-[66px] h-[14px] top-[7px] left-[48px]">
        //                     <div
        //                         className="absolute w-[66px] h-[18px] top-[-2px] left-0 [font-family:'Roboto',Helvetica] font-normal text-[#999999] text-[15px] tracking-[0] leading-[21px] whitespace-nowrap">
        //                         16 replies
        //                     </div>
        //                 </div>
        //                 <button className="absolute w-[72px] h-[14px] top-[7px] left-[130px] all-[unset] box-border">
        //                     <div className="relative h-[14px]">
        //                         <div
        //                             className="absolute w-[72px] h-[18px] top-[-2px] left-0 [font-family:'Roboto',Helvetica] font-normal text-[#999999] text-[15px] tracking-[0] leading-[21px] whitespace-nowrap">
        //                             3,510 likes
        //                         </div>
        //                     </div>
        //                 </button>
        //             </div>
        //         </div>
        //     </div>
        // </div>
    );
};

export default SocialMediaPost;