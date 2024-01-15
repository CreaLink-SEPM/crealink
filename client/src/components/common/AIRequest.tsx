import React, { useState } from 'react';
import { Button, Input, Modal, message } from 'antd';
import { useSession } from 'next-auth/react';
import axios from 'axios';

const AIQuestionPrompt: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const { data: session } = useSession();
 
  const [aiResponse, setAIResponse] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleAIRequest = async (event: React.FormEvent) => {
    event.preventDefault();
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
      } else {
        message.error('Failed to get AI response');
      }
    } catch (error) {
      console.error('Error:', error);
      message.error('An unexpected error occurred');
    }
  };

  return (
    <div>
      <Button type="primary" onClick={showModal}>
        Open AI Prompt Modal
      </Button>

      <Modal
        title="AI Question Prompt"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Input
          placeholder="Enter your prompt here"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          style={{ marginBottom: 16 }}
        />
        <Button type="primary" onClick={handleAIRequest} style={{ marginBottom: 16 }}>
          Get AI Response
        </Button>
        {aiResponse && (
          <div>
            <h2>AI Response:</h2>
            <p>{aiResponse}</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AIQuestionPrompt;
