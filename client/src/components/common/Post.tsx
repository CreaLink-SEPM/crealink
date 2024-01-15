'use client';

import React, { useState, useEffect, useRef } from 'react';
import moment from 'moment';
import { Skeleton } from '@/components/ui/skeleton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Popconfirm, message, Button, Modal } from 'antd';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@radix-ui/react-dropdown-menu';
import { Input } from '../ui/input';
import { CopyIcon } from 'lucide-react';
import ToggleLike, { handleLikeToggle } from './ToggleLike';
const { Dropdown, Menu, Flex } = require('antd');
const { useSession } = require('next-auth/react');
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
  const { data: session } = useSession();
  const [posts, setPosts] = useState('');
  console.log('POSTS ', posts);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [loadingInitial, setLoadingInitial] = useState<boolean>(true);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [loadingMoreButton, setLoadingMoreButton] = useState<boolean>(false);
  const [modal2Open, setModal2Open] = useState(false);
  const [isCommentModalOpen, setCommentModalOpen] = useState(false);

  const openCommentModal = () => {
    setCommentModalOpen(true);
  };

  const closeCommentModal = () => {
    setCommentModalOpen(false);
  };


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
      } finally {
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

      setPosts(prevPosts => [...prevPosts, ...newData]);
    } catch (error) {
      console.error('Error loading more posts:', error);
    } finally {
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    // Delay the appearance of the "Loading more" button for an additional 3 seconds
    const delayLoadMoreButton = setTimeout(() => {
      setLoadingMoreButton(true);
    }, 3000);

    return () => clearTimeout(delayLoadMoreButton);
  }, []);

  

  const menu = (
    <Popconfirm
      title="Report this post"
      description="Are you sure to report this post?"
      okText="Yes"
      cancelText="No"
      onConfirm={confirm}
      onCancel={cancel}
    >
      <Button style={{ color: 'red', border: '1px solid red' }}>Report</Button>
    </Popconfirm>
  );
  return (
    <div className="relative">
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
                      className="w-full h-[400px] object-cover rounded-lg"
                    />
                  </div>
                </div>

                {/* Post Interaction and Footer Container */}
                <div className="post-interaction-footer-container flex flex-col justify-between">
                  {/* Interaction Icons */}
                  <div className="post-interactions flex items-center">
                    {/* Icons for like and comment */}
                    <ToggleLike
                    postId={post._id}
                    onToggle={() => handleLikeToggle(post._id, () => {})}
                    setPosts={setPosts}
                    posts={posts}
                    session={session} // Pass the session prop
                />
                <button onClick={() => setModal2Open(true)}>
                      <img
                        className="w-[36px] h-[36px] object-cover mr-2 cursor-pointer"
                        alt="Comment icon"
                        src="https://c.animaapp.com/n1QiTcNd/img/div-x6s0dn4-3.svg"
                      />
                    </button>
                <Modal
                    title="Vertically centered modal dialog"
                    centered
                    open={modal2Open}
                    onOk={() => setModal2Open(false)}
                    onCancel={() => setModal2Open(false)}
                >
                </Modal>

                    <Dialog>
                      <DialogTrigger asChild>
                        <img
                          className="w-[20px] h-[20px] top-[8px] left-[8px]"
                          alt="Reshare icon"
                          src="https://c.animaapp.com/n1QiTcNd/img/reshare-icon.svg"
                        />
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle>Share link</DialogTitle>
                          <DialogDescription>Anyone who has this link will be able to view this.</DialogDescription>
                        </DialogHeader>
                        <div className="flex items-center space-x-2">
                          <div className="grid flex-1 gap-2">
                            <Label className="sr-only">Link</Label>
                            <Input id="link" defaultValue="https://ui.shadcn.com/docs/installation" readOnly />
                          </div>
                          <Button style={{ background: '#a2383a', color: 'white' }} className="p-5">
                            <span className="sr-only">Copy</span>
                            <CopyIcon className="h-4 w-4" />
                          </Button>
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