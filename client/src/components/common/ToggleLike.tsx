import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { HeartFilled } from '@ant-design/icons';
import { Heart } from 'lucide-react';

interface ToggleLikeProps {
  postId: string;
  isLiked: boolean;
  onToggle: () => void;
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
  posts: Post[];
  session: any;
}

const ToggleLike: React.FC<ToggleLikeProps> = ({ postId, onToggle, setPosts, posts, session }) => {
  // const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isLiked, setIsLiked] = useState<boolean>(() => {
    // Retrieve liked status from sessionStorage
    const storedIsLikedStatus = sessionStorage.getItem(`isLiked_${postId}`);
    return storedIsLikedStatus === 'true';
  });

  useEffect(() => {
    sessionStorage.setItem(`isLiked_${postId}`, isLiked.toString());
  }, [postId, isLiked]);

  // Function to handle like toggle
  const handleLikeToggle = async (status: boolean) => {
    if (!session) {
      return;
    }

    const token = session.user?.accessToken;

    try {
      const response = await axios.put(`https://crealink.khangtgr.com/api/feed/like/${postId}`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('LIKE RESPONSE', response);

      if (response.status === 200) {
        // Update local state based on the server response
        const newIsLikedStatus = response.data.isLiked;
        console.log('newIsLikedStatus', newIsLikedStatus);
        // setLocalIsLiked(newIsLikedStatus);
        setIsLiked(newIsLikedStatus);

        // Update posts state and trigger any necessary actions
        setPosts(prevPosts =>
          prevPosts.map(post =>
            post._id === postId
              ? {
                  ...post,
                  likesCount: post.likesCount + (newIsLikedStatus ? 1 : -1),
                  likes: newIsLikedStatus
                    ? [...(post.likes || []), session.user?._id]
                    : post.likes?.filter(userId => userId !== session.user?._id),
                  isLiked: newIsLikedStatus,
                }
              : post,
          ),
        );

        // Trigger onToggle and show toast message
        onToggle();
        toast.success(`Post ${newIsLikedStatus ? 'liked' : 'unliked'} successfully!`);
      } else {
        console.error('Failed to toggle like:', response.data);
        toast.error('Failed to toggle like.');
      }
    } catch (error) {
      console.error('Error toggling like:', error.response?.data || error.message);
      toast.error('Error toggling like.');
    }
  };

  return (
    <button className={`w-[36px] h-[36px] object-cover cursor-pointer`} onClick={() => handleLikeToggle(!isLiked)}>
      {isLiked ? (
        <svg
          width="25"
          height="25"
          viewBox="0 0 15 15"
          fill="none"
          color="transparent"
          xmlns="http://www.w3.org/2000/svg"
          className="text-red-900 cursor-pointer"
        >
          <path
            d="M1.35248 4.90532C1.35248 2.94498 2.936 1.35248 4.89346 1.35248C6.25769 1.35248 6.86058 1.92336 7.50002 2.93545C8.13946 1.92336 8.74235 1.35248 10.1066 1.35248C12.064 1.35248 13.6476 2.94498 13.6476 4.90532C13.6476 6.74041 12.6013 8.50508 11.4008 9.96927C10.2636 11.3562 8.92194 12.5508 8.00601 13.3664C7.94645 13.4194 7.88869 13.4709 7.83291 13.5206C7.64324 13.6899 7.3568 13.6899 7.16713 13.5206C7.11135 13.4709 7.05359 13.4194 6.99403 13.3664C6.0781 12.5508 4.73641 11.3562 3.59926 9.96927C2.39872 8.50508 1.35248 6.74041 1.35248 4.90532Z"
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
          ></path>
        </svg>
      ) : (
        <Heart width={30} height={25} className="cursor-pointer text-gray-300" />
      )}
    </button>
  );
};

export default ToggleLike;
