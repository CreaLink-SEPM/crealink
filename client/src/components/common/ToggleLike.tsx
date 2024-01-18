import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { HeartFilled } from '@ant-design/icons';

interface ToggleLikeProps {
  postId: string;
  isLiked: boolean;
  onToggle: () => void;
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
  posts: Post[];
  session: any;
}

const ToggleLike: React.FC<ToggleLikeProps> = ({ postId, isLiked, onToggle, setPosts, posts, session }) => {
  const [localIsLiked, setLocalIsLiked] = useState<boolean | null>(isLiked);

  // Load isLiked status from sessionStorage on component mount
  // Load isLiked status from sessionStorage on component mount
  useEffect(() => {
    const storedIsLikedStatus = sessionStorage.getItem(`isLiked_${postId}`);
    if (storedIsLikedStatus !== null) {
      setLocalIsLiked(storedIsLikedStatus === 'true');
    } else {
      const localStorageIsLikedStatus = localStorage.getItem(`isLiked_${postId}`);
      if (localStorageIsLikedStatus !== null) {
        setLocalIsLiked(localStorageIsLikedStatus === 'true');
      } else {
        // If no stored status, set initial state based on server data
        const post = posts.find((post) => post._id === postId);
        if (post) {
          // Set the initial state to the value from the server
          setLocalIsLiked(post.isLiked || false);
        } else {
          // If post is not found, you can set it to false or true based on your requirement
          setLocalIsLiked(false);
        }
      }
    }
  }, [postId, posts]);
  


  // Function to handle like toggle
  const handleLikeToggle = async () => {
    if (!session) {
      return;
    }

    const token = session.user?.accessToken;

    try {
      const response = await axios.put(`http://54.169.199.32:5000/api/feed/like/${postId}`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('LIKE RESPONSE', response);

      if (response.status === 200) {
        // Update local state based on the server response
        const newIsLikedStatus = response.data.isLiked || false;
        setLocalIsLiked(newIsLikedStatus);
        console.log('isLiked status:', newIsLikedStatus);

        // Update posts state and trigger any necessary actions
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post._id === postId
              ? {
                  ...post,
                  likesCount: post.likesCount + (newIsLikedStatus ? 1 : -1),
                  likes: newIsLikedStatus
                    ? [...(post.likes || []), session.user?._id]
                    : post.likes?.filter((userId) => userId !== session.user?._id),
                  isLiked: newIsLikedStatus,
                }
              : post
          )
        );

        // Trigger onToggle and show toast message
        onToggle();
        toast.success(`Post ${newIsLikedStatus ? 'liked' : 'unliked'} successfully!`);

        // Save isLiked status to both sessionStorage and localStorage
        const storageKey = `isLiked_${postId}`;
        sessionStorage.setItem(storageKey, newIsLikedStatus.toString());
        localStorage.setItem(storageKey, newIsLikedStatus.toString());
        console.log(`isLiked status saved to storage: ${storageKey} = ${newIsLikedStatus}`);
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
    <button
      className={`w-[36px] h-[36px] object-cover mr-2 cursor-pointer`}
      onClick={handleLikeToggle}
    >
      <HeartFilled style={{ fontSize: '1.5em', color: localIsLiked ? '#ff4d4f' : '' }} />
    </button>
  );
};

export default ToggleLike;
