import React, { useState, useEffect } from 'react';
import axios from 'axios';
import type Icon from '@ant-design/icons';
import { Avatar, List, Skeleton, Form, Button, Input, Modal,  Typography, Comment as AntComment } from 'antd';
import { useSession } from 'next-auth/react';


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
  postId: string,
  token: string,
  modal20pen: boolean,
}

const Comment: React.FC<CommentProps> = ({ postId, token, modal20pen }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  console.log('COMMENTS ', comments);
  const [newComment, setNewComment] = useState<string>('');
  const {data: session} = useSession(); 
  const [visible, setVisible] = useState<boolean>(false);
  const [loadingInitial, setLoadingInitial] = useState<boolean>(true);
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [isModalOpen, setIsModalOpen] = useState();

  const showModal = () => {
    setIsModalOpen(true);
  }

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const fetchComments = async () => {
    try {
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
    } finally {
      setLoadingInitial(false);
    }
  };


  
useEffect(() => {
  // Fetch comments when the component mounts
  fetchComments();
}, [postId, token]);
  return (
    <div>
      {loadingInitial ? (
        <Skeleton avatar paragraph={{ rows: 1 }} active />
      ) : (
        <>

<Modal
  title="Comments"
  centered
  open={modal20pen}
  onOk={handleOk}
  onCancel={handleCancel}
>
  {/* <List
    bordered
    dataSource={comments}
    renderItem={(item) => (
      <List.Item>
        <List.Item.Meta
          avatar={<Avatar src={item.userId.user_image} />}
          title={item.userId.username}
          description={item.commentText}
        />
      </List.Item>
    )}
  /> */}
</Modal>

    </>
          )}
    </div>
    )
} 

          {/* <Form onFinish={handleCreateComment}>
            <Form.Item name="newComment">
              <Input.TextArea
                rows={4}
                placeholder="Write a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Add Comment
              </Button>
            </Form.Item>
          </Form> */}
        {/* </> */}
      {/* )} */}
//     </div>
//   );
// };

export default Comment;
