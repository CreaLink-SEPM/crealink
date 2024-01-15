import React, { useState } from 'react';
import { Button, Input, Modal, message, Form, Space } from 'antd';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import CopyToClipboard from 'react-copy-to-clipboard';
import { FloatButton } from 'antd';
import { MessageOutlined } from '@ant-design/icons';

const AIQuestionPrompt: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const { data: session } = useSession();
 
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
      <FloatButton
        shape="circle"
        type="primary"
        style={{ position: 'fixed', right: 16, bottom: 16, backgroundColor: 'red'}}
        icon={<MessageOutlined />}
        onClick={showModal}
      />

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
            <p>{aiResponse}</p>
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
