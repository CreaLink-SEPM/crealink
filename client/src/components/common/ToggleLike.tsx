import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { toast } from 'react-toastify';

interface ToggleLikeProps {
  postId: string;
  onToggle: () => void;
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
  posts: Post[];
  session: any;
}

const ToggleLike: React.FC<ToggleLikeProps> = ({ postId, onToggle, setPosts, posts, session }) => {
  const [isLiked, setIsLiked] = useState<boolean | null>(null);

  // Load isLiked status from localStorage on component mount
  useEffect(() => {
    const storedIsLikedStatus = localStorage.getItem(`isLiked_${postId}`);
    if (storedIsLikedStatus !== null) {
      setIsLiked(storedIsLikedStatus === 'true');
    } else {
      // If no stored status, set initial state based on server data
      const post = posts.find((post) => post._id === postId);
      if (post) {
        setIsLiked(post.isLiked || false);
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
        setIsLiked(newIsLikedStatus);

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

        // Save isLiked status to local storage
        const storageKey = `isLiked_${postId}`;
        localStorage.setItem(storageKey, newIsLikedStatus.toString());
        console.log(`isLiked status saved to local storage: ${storageKey} = ${newIsLikedStatus}`);
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
      <FontAwesomeIcon icon={faHeart} className={`fa-lg ${isLiked ? 'text-red-500' : ''}`} />
    </button>
  );
};

export default ToggleLike;
