import React, { useState, useEffect } from 'react';
import axios from 'axios';
import type Icon from '@ant-design/icons';
import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import { Avatar, List, Skeleton, Switch } from 'antd';

interface Comment {
  _id: string;
  userId: {
    _id: string;
    username: string;
    user_image: string;
  };
  commentText: string;
  likesCount: number;
}

interface CommentProps {
  postId: string;
  token: string;
}


const Comment: React.FC<CommentProps> = ({ postId, token }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>('');

  useEffect(() => {
    // Fetch comments when the component mounts
    fetchComments();
  }, [postId]);

  const fetchComments = async () => {
    try {
      const response = await axios.get(`http://localhost:[port]/api/comment/${postId}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      setComments(response.data.comments);
    } catch (error) {
      console.error('Error fetching comments:', error.message);
    }
  };

  const handleCreateComment = async () => {
    try {
      const response = await axios.post(
        `http://localhost:[port]/api/comment/${postId}`,
        {
          commentText: newComment,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update the comments state with the new comment
      setComments([...comments, response.data.comment]);
      // Clear the new comment input
      setNewComment('');
    } catch (error) {
      console.error('Error creating comment:', error.message);
    }
  };

  return (
    <Skeleton />
  );
};

export default Comment;
