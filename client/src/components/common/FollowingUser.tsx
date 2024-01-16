'use client';
import React, { useState } from 'react';
import { Space, Button } from 'antd';
import axios from 'axios';
import { useSession } from 'next-auth/react';

function FollowingUser({ users }: { users: string }) {
  console.log(users)  
  const { data: session } = useSession();
  const [isFollowing, setIsFollowing] = useState<boolean>(false); 

  const handleFollowToggle = async () => {
    if (!session) return;

    const token = session?.user?.accessToken;
    console.log('USER', token);
    try {
      const response = await axios.post(`http://54.169.199.32:5000/api/user/follow-user/${users}`,{}, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      
      console.log(response)
      if (response.status === 200) {
        const data = response.data;
        console.log(data);
        setIsFollowing(data);
      } else {
        console.error('Error fetching posts:', response.statusText);
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  return (
    <div>
      <Space direction="vertical" style={{ width: '100%', alignItems: 'center', marginTop: '10px' }}>
        <Button
          className='bg-red-700 hover:bg-red-800 text-white outline-none border-none'
          onClick={handleFollowToggle}
        >
          <span className='hover:text-white'>{isFollowing ? 'Unfollow' : 'Follow'} </span>
        </Button>
      </Space>
    </div>
  );
}

export default FollowingUser;