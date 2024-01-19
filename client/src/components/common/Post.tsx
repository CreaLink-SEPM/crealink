'use client';

    import React, { useState, useEffect, useRef } from 'react';
    import moment from 'moment';
    import { Skeleton } from '@/components/ui/skeleton';
    import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
    import { Popconfirm, message, Button, Modal, List, Avatar, Form} from 'antd';
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
    interface Comment {
        _id: string;
        userId: {
          _id: string;
          username: string;
          user_image: string;
        };
        commentText: string;
        likesCount: number;
        createdAt: string;
      }

    const SocialMediaPost = () => {
    const { data: session } = useSession();
    const [posts, setPosts] = useState<Post[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState<number>(1);
    const [loadingInitial, setLoadingInitial] = useState<boolean>(true);
    const [loadingMore, setLoadingMore] = useState<boolean>(false);
    const [loadingMoreButton, setLoadingMoreButton] = useState<boolean>(false);
    const [comments, setComments] = useState<Comment[]>([]);
    const [openModal, setOpenModal] = useState<boolean>(false)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
    const [commentText, setCommentText] = useState('');
    const [likeToggle, setLikeToggle] = useState<boolean>(false);
    const [isLikedStatus, setIsLikedStatus] = useState<{ [postId: string]: boolean }>({});
    const [shareableUrl, setShareableUrl] = useState<string | null>(null);


    const onToggle = () => {
  setLikeToggle(!likeToggle);
};  

    const handleOk = () => {
        setIsModalOpen(false);
      };
    
      const handleCancel = () => {
        setIsModalOpen(false);
      };

    // const [isCommentModalOpen, setCommentModalOpen] = useState(false);

    // const openCommentModal = () => {
    //     setCommentModalOpen(true);
    // };

    // const closeCommentModal = () => {
    //     setCommentModalOpen(false);
    // };


    const apiUrl = `http://54.169.199.32:5000/api/feed/posts?page=${page}`;

    useEffect(() => {
        const fetchData = async () => {
        if (!session) return;
        const token = session.user?.accessToken;
        try {
            const response = await axios.get(apiUrl, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            });
            const data = response.data;
  
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

    const fetchComments = async (postId: string) => {
        try {
            if (!session) return;
            const token  = session.user?.accessToken;
          const response = await axios.get(`http://54.169.199.32:5000/api/comment/${postId}`, {}, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const data = response.data.comments;
          console.log('RESPONSE COMMENTS', data);
          setComments(data);
        } catch (error) {
          console.error('Error fetching comments:', error);
        }
      };
    
    const handleCreateComment = async (postId: string, commentText: string) => {
        try {
            if (!session) return;
            const token = session.user?.accessToken;
            const response = await axios.post(
                `http://54.169.199.32:5000/api/comment/${postId}`,
                {
                    commentText
                },
                 {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                      }
                 }
            );
            const newComment = response.data.comment;
            console.log('NEW COMMENT: ', newComment);
            setComments((prevComments) => [newComment, ...prevComments]);
            message.success('Comment created successfully')
        } catch (error) {
            console.log('Error creating comment', error);
        }
    }

    const sharePost = async (postId: string) => {
      if (!session) {
        // Handle the case when the user is not logged in
        message.error('You must be logged in to share a post.');
        return;
      }
    
      try {
        const token = session.user?.accessToken;
        const response = await axios.get(`http://54.169.199.32:5000/api/feed/share/${postId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
    
        if (response.status === 200) {
          const shareableUrl = response.data.shareableUrl;
          console.log('URL ',shareableUrl)
          setShareableUrl(shareableUrl); // Update the shareableUrl state
          // Display the shareable URL or use it as needed
          message.success(`Post shared successfully. URL: ${shareableUrl}`);
        } else {
          message.error('Failed to share post. Please try again.');
        }
      } catch (error) {
        console.error('Error sharing post:', error);
        message.error('An error occurred while sharing the post. Please try again.');
      } 
    };
    
    
    const onFinish = async (values: any) => {
        try {
          if (!selectedPostId) {
            throw new Error('No post selected for commenting');
          }
    
          await handleCreateComment(selectedPostId, values.commentText);
          setCommentText('');
          form.resetFields();
        } catch (error) {
          console.error('Error handling comment creation:', error);
        }
      }

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
                <div className="flex items-center justify-between gap-5 w-[120%]">
                  <div className="flex items-center gap-4">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <Skeleton className="h-4 w-12 " />
                  </div>
                  <div className='flex items-center float-right ml-[20%] gap-2'>
                    <Skeleton className="h-1 w-2 " />
                    <Skeleton className="h-1 w-2 " />
                    <Skeleton className="h-1 w-2 " />
                  </div>
                </div>
                <div>
                  <Skeleton className="h-[350px] w-[550px] mt-4" />
                </div>
                <div className="mt-2 flex items-center justify-center float-left gap-2">
                  <Skeleton className="h-4 w-[20px]" />
                  <Skeleton className="h-4 w-[20px]" />
                  <Skeleton className="h-4 w-[20px]" />
                </div>
                <div className="mt-10">
                  <Skeleton className="h-[5px] w-[40px]" />
                </div>

                <div className="flex items-center justify-between mt-4 gap-5 w-[120%]">
                  <div className="flex items-center gap-4">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <Skeleton className="h-4 w-12 " />
                  </div>
                  <div className='flex items-center float-right ml-[20%] gap-2'>
                    <Skeleton className="h-1 w-2 " />
                    <Skeleton className="h-1 w-2 " />
                    <Skeleton className="h-1 w-2 " />
                  </div>
                </div>
                <div>
                  <Skeleton className="h-[350px] w-[550px] mt-4" />
                </div>
                <div className="mt-2 flex items-center justify-center float-left gap-2">
                  <Skeleton className="h-4 w-[20px]" />
                  <Skeleton className="h-4 w-[20px]" />
                  <Skeleton className="h-4 w-[20px]" />
                </div>
                <div className="mt-10">
                  <Skeleton className="h-[5px] w-[40px]" />
                </div>
            </>
        ) : (
            <>
            {posts &&
                posts?.map(post => (
                <div
                    key={post._id}
                    className="relative w-[572px] h-auto"
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
                        <span className="timestamp ml-2">{moment(post.createdAt).startOf('hour').fromNow()}</span>
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
                    {post.imageUrl ? (
                    <div className={`main-post-image overflow-hidden ${post.imageUrl ? 'h-[400px]' : 'h-0'}`}>
                    {post.imageUrl && (
                        <img
                            src={post.imageUrl}
                            alt=""
                            className="w-full h-full object-cover rounded-lg"
                        />
                    )}
                </div>
                
                ) : null}
                    </div>

                    {/* Post Interaction and Footer Container */}
                    <div className="post-interaction-footer-container flex flex-col justify-between">
                    {/* Interaction Icons */}
                    <div className="post-interactions flex items-center">
                        {/* Icons for like and comment */}
                        <ToggleLike postId={post._id}  setPosts={setPosts} posts={posts} session={session} />
                <button onClick={() => {
                    setIsModalOpen(true);
                    fetchComments(post._id);
                    setSelectedPostId(post._id);
                }}>
                    <img
                    className="w-[36px] h-[36px] object-cover mr-2 cursor-pointer"
                    alt="Comment icon"
                    src="https://c.animaapp.com/n1QiTcNd/img/div-x6s0dn4-3.svg"
                    />
                </button>
                <Modal
                title="Comments"
                centered
                open={isModalOpen}
                onOk={() => setIsModalOpen(false)}
                onCancel={() => setIsModalOpen(false)}
                okButtonProps={{ style: { background: '#a2383a', color: 'white' } }}  // Style for the OK button
                cancelButtonProps={{ style: { background: 'lightgray', color: 'black' } }}  // Style for the Cancel button
>
                
                <List
                    bordered
                    dataSource={comments}
                    renderItem={(item) => (
                    <List.Item>
                        <List.Item.Meta
                        avatar={<Avatar src={item.userId.user_image} />}
                        title={item.userId.username}
                        description={
                            <>
                                <p>{item.commentText}</p>
                                <small>{moment(item.createdAt).startOf('hour').fromNow()}</small>
                            </>
                        }
                        />
                    </List.Item>
                    )}
                />
                <br />
                <Form form={form} onFinish={onFinish}>
                    <Form.Item name="commentText" rules={[{ required: true, message: 'Please enter your comment!' }]}>
                    <Input placeholder="Add a comment..." rows={2} onChange={(e) => setCommentText(e.target.value)} />
                    </Form.Item>
                    <Form.Item>
                    <Button  htmlType="submit" >
                        Add Comment
                    </Button>
                </Form.Item>
          </Form>
                </Modal>

                        <Dialog>
                        <DialogTrigger asChild onClick={() => sharePost(post._id)}>
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
                                <Input id="link" defaultValue={shareableUrl || ''} readOnly />

                            </div>
                            {/* <Button style={{ background: '#a2383a', color: 'white' }} className="p-5">
                                <span className="sr-only">Copy</span>
                                <CopyIcon className="h-4 w-4" />
                            </Button> */}
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
                    className="border-none text-white w-30 h-8 ml-[20%]"
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