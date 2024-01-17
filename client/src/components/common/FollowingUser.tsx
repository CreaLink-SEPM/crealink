'use client';
import React, { useEffect, useState } from 'react';
import { Space, Button } from 'antd';
import axios from 'axios';
import { useSession } from 'next-auth/react';

function FollowingUser({ users, isFollowed }: { users: string, isFollowed: boolean }) {
  const { data: session } = useSession();
  const [isFollowing, setIsFollowing] = useState<boolean>(false);

  useEffect(() => {
    setIsFollowing(isFollowed);
  }, [isFollowed]);

  const handleFollowToggle = async () => {
    if (!session) return;

    const token = session?.user?.accessToken;
    console.log(token);

    try {
      const response = await axios.post(
        `http://54.169.199.32:5000/api/user/${isFollowing ? 'unfollow' : 'follow'}-user/${users}`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log(response);

      if (response.status === 200) {
        const data = response.data.isFollowed;
        console.log(data);
        setIsFollowing(!isFollowing);
        console.error('Error toggling follow status:', response.statusText);
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };



  return (
    <div>
      <Space direction="vertical" style={{ width: '100%', alignItems: 'center', marginTop: '10px' }}>
        <Button
          className="bg-red-700 hover:bg-red-800 text-white outline-none border-none"
          onClick={handleFollowToggle}
        >
          <span className="hover:text-white">{isFollowing ? 'Unfollow' : 'Follow'} </span>
        </Button>
      </Space>
    </div>
  );
}

export default FollowingUser;
