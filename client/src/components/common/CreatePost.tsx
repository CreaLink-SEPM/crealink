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
import { useToast } from '@/src/components/ui/use-toast';
import { notification } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import Comment from './Comment';

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
  const handleImageUpload = (file: File) => {
    try {
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPostState({ ...postState, image: reader.result as string });
          setImageUploaded(true);
        };
        reader.readAsDataURL(file);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === ' ' && inputValue === '') {
      event.preventDefault(); // Prevent the space from being added
      setShowAutoInput(true);
    }
  };
  const handlePost = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent
    if (!session) return;
    const token = session.user?.accessToken;
    try {
      setLoading(false);

      // Create FormData object and append form fields
      const formData = new FormData();
      const pictureInput = document.getElementById('picture') as HTMLInputElement;
      if (pictureInput.files && pictureInput.files[0]) {
        formData.append('image', pictureInput.files[0]);
      }
      formData.append('title', postState.title);
      formData.append('content', postState.content);

      // Send POST request with form data
      const response = await axios.post('http://54.169.199.32:5000/api/feed/post', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('CREATE POST RESPONE ', response);

      setLoading(false);

      setPostState({
        title: response.title,
        content: response.content,
        image: response.image,
      });
      notification.success({
        message: 'Post created',
        description: 'Try to reload the page',
      });
    } catch (error) {
      console.log('The error is ', error);
      notification.error({
        message: 'Post creation failed',
        description: 'Please fill in all required fields',
      });
    } finally {
      setLoading(false);
      setIsModalOpen(false);
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
        style={{
          backgroundColor: 'light',
          borderColor: 'lightgrey',
          width: '125%',
          padding: '14px',
          margin: '8px 8px',
          borderRadius: '8px 8px',
        }}
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="cursor-pointer relative left-[120%] top-[-45px] w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
        />
      </svg>

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
          onChange={e => setPostState({ ...postState, title: e.target.value })}
          style={{ marginBottom: 16 }}
        />

        {/* Content input */}
        <Input.TextArea
          placeholder="Content"
          rows={10}
          value={postState.content}
          onChange={e => setPostState({ ...postState, content: e.target.value })}
          style={{ marginBottom: 16 }}
        />

        {/* Image upload section */}
        <label htmlFor="picture" style={{ display: 'block', marginBottom: '8px' }}>
          Upload Image (Max: 1)
        </label>
        <input
          id="picture"
          type="file"
          lang="en"
          style={{
            padding: '8px',
            border: '1px solid #d9d9d9',
            borderRadius: '4px',
            backgroundColor: '#fff',
            cursor: 'pointer',
            marginBottom: '16px',
          }}
        />

        {/* Action buttons */}
        <div style={{ marginTop: 16, textAlign: 'right' }}>
          <Button onClick={handleCancel} style={{ marginRight: 8 }}>
            Cancel
          </Button>
          <Button type="submit" onClick={handlePost} className="bg-red-800 hover:bg-red-900" style={{ color: 'white' }}>
            Submit
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default CreatePost;
