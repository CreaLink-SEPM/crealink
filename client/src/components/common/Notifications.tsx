'use client';
import React, { useState } from 'react';
import UserAvatar from '@/src/components/common/UserAvatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useSession } from 'next-auth/react';
import moment from 'moment';
import { notification } from 'antd';
import { Skeleton } from '@/components/ui/skeleton';

interface Notification {
  content: string;
  postId: string;
  createdAt: string;
  read: boolean;
  _id: string;
  post: {
    _id: string;
    title: string;
    imageUrl: string;
    content: string;
    creator: string;
    likes: string[];
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
}

function Notifications() {
  const { data: session } = useSession();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    if (!session) {
      return;
    }
    const token = session?.user?.accessToken;

    try {
      const response = await fetch(`http://54.169.199.32:5000/api/user/get-user-notification`, {
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }),
      });

      if (!response.ok) {
        console.error('Error fetching users. Server response:', response);
        return;
      }

      const responseData = await response.json();
      const fetchNotifi = responseData.data.notifications;
      console.log('NOTIFICATION', fetchNotifi);
      setNotifications(fetchNotifi);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    const delay = setTimeout(() => {
      fetchNotifications();
    }, 300);

    return () => clearTimeout(delay);
  }, [session]);

  const deleteNotifications = async (id: string) => {
    if (!session) {
      return;
    }
    const token = session?.user?.accessToken;
    try {
      const response = await fetch(`http://54.169.199.32:5000/api/user/get-user-notification/${id}`, {
        method: 'DELETE',
        headers: new Headers({
          Authorization: `Bearer ${token}`,
        }),
      });

      if (!response.ok) {
        console.error('Error fetching users. Server response:', response);
        return;
      }

      const responseData = await response.json();
      if (responseData.status === 'success') {
        notification.success({
          message: 'Delete successfully',
        });

        fetchNotifications();
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  return (
    <>
      {loading ? (
        <div className="relative left-[30%] top-[10%]">
          <div className="flex items-center">
            <Skeleton className="h-12 w-12 rounded-full" />
            <Skeleton className="h-3 w-[100px] mt-2 ml-5" />
          </div>
          <div className="space-y-2 mt-5 w-[500px] flex items-center justify-between">
            <div>
              <Skeleton className="h-4 w-[300px] mb-3" />
              <Skeleton className="h-4 w-[300px]" />
            </div>
            <Skeleton className="h-10 w-[100px] absolute top-10 left-[50%]" />
          </div>
        </div>
      ) : notifications.length === 0 ? (
        <div className="text-center mt-10 ml-[10%]">
          <p className="text-2xl font-bold">No notifications found.</p>
        </div>
      ) : (
        <>
          {notifications.map(notification => (
            <div className="w-[80%] mt-[5%] ml-[18%]  p-1">
              <div className="flex items-start justify-between space-x-5 mb-3 w-full md:container">
                <div className="flex items-center gap-3">
                  <UserAvatar
                    name={notification._id}
                    image={notification.post?.imageUrl || '/assets/images/avatar.png'}
                  />
                  <div className=" w-[90%]">
                    <div className="flex justify-between w-full items-center">
                      <span className="text-sm float-right">
                        {moment(notification?.post?.createdAt).startOf('hour').fromNow()}
                      </span>
                    </div>
                    <p className="text-[15px]">{notification?.content}</p>
                  </div>
                </div>
                <div className="float-right">
                  <Button
                    onClick={() => deleteNotifications(notification._id)}
                    className="w-[104px] h-[40px] hover:bg-[#a2383a] font-bold bg-slate-50 border border-black rounded-xl text-black"
                  >
                    Delete
                  </Button>
                </div>
              </div>
              <Separator className="w-[80%] ml-[15%] mt-5" />
             {/* <span className="relative flex h-3 w-3 bottom-44 left-[27rem]">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-700 opacity-75"></span>
              <span className="absolute inline-flex rounded-full h-3 w-3 bg-red-800"></span>
            </span> */}
            </div>
         
          ))}
        </>
      )}
    </>
  );
}

export default Notifications;