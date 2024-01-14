  'use client';
  import React, { useEffect, useRef, useState } from 'react';
  import { Button, Modal, Input, Upload, Space } from 'antd';
  import TextArea from 'antd/es/input/TextArea';
  import AutoInput from '@/src/components/common/AutoInput';
  import UploadImage from '@/src/components/common/UploadImage';
  import DropdownSelect from '@/src/components/common/DropdownSelect';
  import Image from 'next/image';
  import { useSession } from 'next-auth/react';
  import { Skeleton } from '@/components/ui/skeleton';
  import axios from 'axios';
  import { useRouter } from 'next/router';
  import { useToast } from "@/src/components/ui/use-toast"
  import { notification } from 'antd';
  import { UploadOutlined } from '@ant-design/icons';


  const SkeletonImage = () => {
    return (
      <div className="h-[36px] w-[36px] bg-neutral-100 rounded-[18px]">
        <Skeleton className="h-10 w-10 rounded-full" />
      </div>
    );
  };

  const CreatePost: React.FC = () => {
    const [postState, setPostState] = useState<AuthStateType>({
      title: '',
      content: '',
      image: '',
    });
    const [errors, setErrors] = useState<AuthErrorType>({});
    const { data: session } = useSession();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [autoInputValue, setAutoInputValue] = useState('');

    const [inputValue, setInputValue] = useState('');
    const [imageUploaded, setImageUploaded] = useState(false);

    const [showAutoInput, setShowAutoInput] = useState(false);
    const [loading, setLoading] = useState(false);
    const inputRef = useRef(null);
    const [modal1Open, setModal1Open] = useState(false);
    const [modal2Open, setModal2Open] = useState(false);


    const handleImageUpload = file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPostState({ ...postState, image: reader.result as string });
        setImageUploaded(true);
      };
      reader.readAsDataURL(file);
      console.log(file);
    };
    
    useEffect(() => {
      const delay = setTimeout(() => {
        setLoading(true);
      }, 300);

      // Clear the timeout on component unmount
      return () => clearTimeout(delay);
    }, [session]);

    useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Backspace' && inputValue === '') {
          setShowAutoInput(false);
        }
      };

      if (showAutoInput) {
        window.addEventListener('keydown', handleKeyDown);
      }

      return () => {
        window.removeEventListener('keydown', handleKeyDown);
      };

    }, [showAutoInput, inputValue]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(event.target.value);
    };

    const handleKeyPress = (event: React.KeyboardEvent) => {
      if (event.key === ' ' && inputValue === '') {
        event.preventDefault(); // Prevent the space from being added
        setShowAutoInput(true);
      }
    };
    const handlePost = async () => {
      if (!session) return;
      const token = session.user?.accessToken;
      try {
        setLoading(true);
  
        // Create FormData object and append form fields
        const formData = new FormData();
        formData.append('title', postState.title);
        formData.append('content', postState.content);
        formData.append('image', postState.image);
  
        // Send POST request with form data
        const response = await axios.post('http://54.169.199.32:5000/api/feed/post', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`
          }
        });

  
        setLoading(false);
  
        if (response.data.status === 'success') {
          router.push(`/success?message=${response.data.message}`);
          notification.success({
            message: 'Post created successfully',
            description: response.data.message,
          });
          console.log(response)
        } else if (response.data.status === 'error') {
          setErrors(response.data.message.error);
        }
      } catch (error) {
        console.error(error);
        notification.error({
          message: 'Post creation failed',
          description: 'Please fill in all required fields',
        });
        setLoading(false);
      }
    };
    const handleCancel = () => {
      setIsModalOpen(false);
    };
  
    const handleOk = () => {
      // Handle submit logic here
      console.log('Title:', postState.title);
      console.log('Content:', postState.content);
      console.log('Image:', postState.image);
      
      // Close the modal
      setIsModalOpen(false);
    };
  
    return (
      <>
        {/* <Button type="primary" onClick={() => setIsModalOpen(true)} style={{ backgroundColor: 'lightgrey', borderColor: 'lightgrey' }}>
          Click here to create new post
        </Button> */}
        <Input
          type="text"
          placeholder="Click here to create new post"
          onClick={() => setIsModalOpen(true)}
          onChange={handleInputChange}
          style={{ backgroundColor: 'light', borderColor: 'lightgrey' }}
        />

        <Modal
          title="Create New Post"
          centered
          visible={isModalOpen}
          onOk={handlePost}
          footer={null}
          onCancel={handleCancel}
        >
          {/* Your form content */}
          {/* Title input */}
          <Input
            placeholder="Title"
            value={postState.title}
            onChange={(e) => setPostState({ ...postState, title: e.target.value })}
            style={{ marginBottom: 16 }}
          />
  
          {/* Content input */}
          <Input.TextArea
            placeholder="Content"
            value={postState.content}
            onChange={(e) => setPostState({ ...postState, content: e.target.value })}
            style={{ marginBottom: 16 }}
          />
  
          {/* Image upload section */}
          <Space direction="vertical" style={{ width: '100%' }} size="large">
            <Upload
              action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
              listType="picture"
              maxCount={1}
              onChange={handleImageUpload }
            >
              <Button icon={<UploadOutlined />}>Upload (Max: 1)</Button>
            </Upload>
          </Space>
  
          {/* Action buttons */}
          <div style={{ marginTop: 16, textAlign: 'right' }}>
            <Button onClick={handleCancel} style={{ marginRight: 8 }}>
              Cancel
            </Button>
            <Button type="primary" onClick={handlePost} style={{
            backgroundColor: 'lightgrey',
            borderColor: 'lightgrey',
            ':hover': { backgroundColor: 'blue' },
      }}>
              Submit
            </Button>
          </div>
        </Modal>
      </>
    );
};

  export default CreatePost;
