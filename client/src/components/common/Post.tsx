'use client';

import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from 'antd';
const { Dropdown, Menu, Flex } = require('antd');
const { useSession } = require('next-auth/react');
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
  const { data: session } = useSession();
  const [posts, setPosts] = useState('');
  console.log('POSTS ', posts);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [loadingInitial, setLoadingInitial] = useState<boolean>(true);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);

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
            'Content-Type': 'application/json',
          },
        });
        console.log(response);
        const data = response.data;
        console.log('RESPONE DATA ', data);
        if (response.status !== 200) {
          throw new Error(`Failed to fetch data. Status: ${response.status}`);
        }

        if (!response.data || !response.data.posts) {
          throw new Error(`Failed to fetch data. Response: ${JSON.stringify(response.data)}`);
        }

        const delay = setTimeout(() => {
          setPosts(data.posts);
          setLoadingMore(false);
        }, 100);

        // Clear the timeout on component unmount
        return () => clearTimeout(delay);
      } catch (error) {
        console.log(error);
      }finally {
        setLoadingInitial(false);
      }

    };

    fetchData();
  }, [session]);


  // LOAD MORE PAGE 
  const enterLoading = async () => {
    try {
      setLoadingMore(true);

      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${session.user?.accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      // Assuming that your API returns a 'posts' property in the response data
      const newData = response.data.posts;

      setPosts((prevPosts) => [...prevPosts, ...newData]);
    } catch (error) {
      console.error('Error loading more posts:', error);
    } finally {
      setLoadingMore(false);
    }
  };
 
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
      <Menu.Item style={{ color: 'red', fontWeight: 'bold' }}>Report</Menu.Item>
    </Menu>
  );
  return (
    <div className='relative'>
      {loadingInitial ? (
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
            posts?.map(post => (
              <div
                key={post._id}
                className="relative w-[572px] h-[533.99px]"
                style={{ borderTop: '0.5px solid lightgrey', marginBottom: '33px' }}
              >
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
                    {post.creator && <span className="user-name font-bold">{post.creator.username}</span>}
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
                    <img
                      src={post.imageUrl || '/assets/images/profile.jpg'}
                      alt="Post content"
                      className="w-full h-full object-cover rounded-lg"
                    />
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
      <Flex gap="large" vertical align="center" wrap="wrap">
        <Button style={{background: '#a2383a', color: 'white'}} loading={loadingMore} onClick={enterLoading} className="border-none text-white w-30 h-20 ml-[20%">
          Loading...
        </Button>
      </Flex>
        </>
      )}

    </div>
  );
};

export default SocialMediaPost;
