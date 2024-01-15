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
    const [liked, setLiked] = useState<boolean | null>(null);

  useEffect(() => {
    // Check local storage for liked status
    const storedLikedStatus = localStorage.getItem(`liked_${postId}`);
    if (storedLikedStatus !== null) {
      // Use the storedLikedStatus directly instead of comparing with 'true'
      setLiked(storedLikedStatus === 'true');
    }
  }, [postId]);

  useEffect(() => {
    // Check server state and update liked status accordingly
    const post = posts.find((post) => post._id === postId);
    if (post) {
        const serverLikedStatus = post.likes?.includes(session.user?._id) || false;
        if (serverLikedStatus !== liked) {
          setLiked(serverLikedStatus);
        }
      }
    }, [posts, postId, session]);

  const handleLikeToggle = async () => {
    if (!session) {
      return;
    }
  
    const token = session.user?.accessToken;
  
    try {
      const response = await axios.put(`http://54.169.199.32:5000/api/feed/like/${postId}`, null, {
        headers: {
          Authorization: `Bearer ${token}`
        },
      });
  
      console.log('LIKE RESPONSE', response);
  
      if (response.status === 200) {
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post._id === postId
              ? {
                  ...post,
                  likesCount: post.likesCount + (post.likes?.includes(session.user?._id) ? -1 : 1),
                  likes: post.likes?.includes(session.user?._id)
                    ? post.likes.filter((userId) => userId !== session.user?._id)
                    : [...(post.likes || []), session.user?._id],
                }
              : post
          )
        );
  
        const newLikedStatus = !liked;
        setLiked(newLikedStatus);
        onToggle();
        toast.success(`Post ${newLikedStatus ? 'liked' : 'unliked'} successfully!`);
  
        // Save liked status to local storage
        const storageKey = `liked_${postId}`;
        localStorage.setItem(storageKey, newLikedStatus.toString());
        console.log(`Liked status saved to local storage: ${storageKey} = ${newLikedStatus}`);
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
      <FontAwesomeIcon icon={faHeart} className={`fa-lg ${liked ? 'text-red-500' : ''}`} />
    </button>
  );
};

export default ToggleLike;
