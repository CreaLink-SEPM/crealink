import React, { useState } from 'react';
import { Button, Input, Modal, message, Form, Space } from 'antd';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import CopyToClipboard from 'react-copy-to-clipboard';
import { FloatButton } from 'antd';
import { MessageOutlined, MessageFilled } from '@ant-design/icons';

const { TextArea } = Input;

const AIQuestionPrompt: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const { data: session } = useSession();
  const [isHovered, setIsHovered] = useState(false);
  const [aiResponse, setAIResponse] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleAIRequest = async () => {
    if (!session) return;
    const token = session.user?.accessToken;
    if (!prompt.trim()) {
      message.error('Prompt cannot be empty');
      return;
    }
    try {
      const response = await axios.post(
        'http://54.169.199.32:5000/api/feed/generativeAI',
        {
          prompt: prompt.trim(),
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setAIResponse(response.data.message);
        setCopied(false); // Reset copied state when generating a new response
      } else {
        message.error('Failed to get AI response');
      }
    } catch (error) {
      console.error('Error:', error);
      message.error('An unexpected error occurred');
    }
  };

  const handleCopy = () => {
    setCopied(true);
    message.success('Text copied to clipboard');
  };

  return (
    <div>
     <button
        style={{
          position: 'fixed',
          right: 30,
          bottom: 30,
          background: isHovered ? '#801c1c' : '#a2383a', // Darker red on hover
          border: 'none',
          color: 'white',
          padding: '10px',
          borderRadius: '50%',
          cursor: 'pointer',
          transition: 'background 0.3s ease-out', // Smooth transition on hover
          width: isHovered ? '60px' : '50px',
        }}
        onClick={showModal}
      >
        <MessageFilled />
      </button>
      
      <Modal
        title="AI Question Prompt"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form onFinish={handleAIRequest}>
          <Form.Item>
            <Input
              placeholder="Enter your prompt here"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              style={{ marginBottom: 16 }}
              allowClear
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginBottom: 16 }} className="bg-red-800 hover:bg-red-900">
              Get AI Response
            </Button>
          </Form.Item>
        </Form>

        {aiResponse && (
          <div>
            <h2>AI Response:</h2>
            <TextArea
              value={aiResponse}
              autoSize={{ minRows: 3, maxRows: 6 }}
            />
            <Space>
              <CopyToClipboard text={aiResponse} onCopy={handleCopy}>
                <Button type="primary" disabled={copied} className="bg-red-800 hover:bg-red-900">
                  {copied ? 'Copied!' : 'Copy to Clipboard'}
                </Button>
              </CopyToClipboard>
            </Space>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AIQuestionPrompt;
