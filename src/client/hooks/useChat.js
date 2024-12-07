import { useState } from 'react';
import axios from 'axios';

export function useChat() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async (content) => {
    try {
      setLoading(true);
      
      // Add user message
      const userMessage = { role: 'user', content };
      setMessages(prev => [...prev, userMessage]);

      // Prepare message history for API
      const messageHistory = messages.map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      // Get AI response
      const response = await axios.post('/api/chat', {
        message: content,
        history: messageHistory
      });

      // Add AI response
      const aiMessage = { role: 'assistant', content: response.data.message };
      setMessages(prev => [...prev, aiMessage]);

      return response.data;
    } catch (error) {
      console.error('Chat error:', error);
      // Add error message
      const errorMessage = {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
  };

  return {
    messages,
    sendMessage,
    clearChat,
    loading
  };
}