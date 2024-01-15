'use client';

import React, { useState, useEffect, useRef } from 'react';
import moment from 'moment';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { Skeleton } from "@/components/ui/skeleton"
// import { Dropdown, Menu } from 'antd';
const {Dropdown, Menu} = require('antd');
const {useSession} = require('next-auth/react');

// import axios, { AxiosError } from 'axios';
const axios = require('axios');
const confirm = (e: React.MouseEvent<HTMLElement>) => {
  console.log(e);
  message.success('Report successfully, we will look into it !!!');
};

const cancel = (e: React.MouseEvent<HTMLElement>) => {
  console.log(e);
  message.error('Cancel report');
};

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
    const [loading, setLoading] = useState(true);
    const [likedPosts, setLikedPosts] = useState([]);

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

                // Extract post IDs and call handleLikeToggle for each post
                const postIds = data.posts.map(post => post._id);
                postIds.forEach(postId => handleLikeToggle(postId))
              

            } catch (error) {
                console.log(error);

            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [session]);
    const likeButtonStyle = (postId) => {
        return {
            transition: 'transform 0.3s ease-in-out',
            ...(likedPosts.includes(postId) && {
                color: 'red',
                transform: 'scale(1.2)',
            }),
        };
    }
    const handleLikeToggle = (postId) => {
        if (likedPosts.includes(postId)) {
            const updatedLikedPosts = likedPosts.filter((id) => id !== postId);
            setLikedPosts(updatedLikedPosts);
        } else {
            setLikedPosts([...likedPosts, postId])
        }
    }



    const menu = (
        <Menu>
            <Menu.Item style={{ color: 'red', fontWeight: 'bold'}}>
                Report</Menu.Item>
        </Menu>
    );
    return (
         <div>
             {loading ? (
            <>
          <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
        </div>
            </>

          ) : (
            <>
              {posts && 
              posts?.map((post) => (
                  <div key={post._id} className="relative w-[572px] h-[533.99px]"
                       style={{borderTop: '0.5px solid lightgrey', marginBottom: '33px'}}>
 
                      {/* Post Header */}
                     <div className="post-header flex items-center mt-3">
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
                         <span className="timestamp ml-2">{moment(post.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</span>
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
                      {/* Post Content */}
                    <div className="post-content">
                        {/* Main Post Image or Text */}
                        <h1>{post.title}</h1>   
                        <p>{post.content}</p>
                        {post.imageUrl && (
                            <div className="main-post-image overflow-hidden">
                                <img
                                    src={post.imageUrl} // Use the imageUrl from the API response
                                    alt="Post content"
                                    className="w-full h-full object-cover rounded-lg"
                                />
                            </div>
                        )}
                    </div>

                      {/* Post Interaction and Footer Container */}
                      <div className="post-interaction-footer-container flex flex-col justify-between">
                         {/* Interaction Icons */}
                         <div className="post-interactions flex items-center">
                             {/* Icons for like and comment */}
                             <button
                                className={`w-[36px] h-[36px] object-cover mr-2 cursor-pointer`}
                                onClick={() => handleLikeToggle(post._id)}
                                style={likeButtonStyle(post._id)}
                            >
                                <FontAwesomeIcon icon={faHeart} className={`fa-lg ${likedPosts.includes(post._id) ? 'text-red-500' : ''}`} />
                            </button>
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
                        <DialogFooter className="sm:justify-start">
                          <DialogClose asChild>
                            <Button style={{ background: '#a2383a', color: 'white' }}>Close</Button>
                          </DialogClose>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
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
          {loadingMoreButton && (
            <Flex gap="large" vertical align="center" wrap="wrap">
              <Button
                style={{ background: '#a2383a', color: 'white' }}
                loading={loadingMore}
                onClick={enterLoading}
                className="border-none text-white w-30 h-20 ml-[20%]"
              >
                Loading more
              </Button>
            </Flex>
          )}
        </>
      )}
    </div>

    );

};

export default SocialMediaPost;
