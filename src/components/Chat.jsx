import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Chat.css'
const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const initialMessage = {
      message: 'Hello, how can I assist you?',
      sender: 'bot',
    };

    setMessages([initialMessage]);
  }, []);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const newMessage = {
      message: inputValue,
      sender: 'user',
    };

    setMessages([...messages, newMessage]);

    // Call GPT API to get bot response
    const response = await axios.post('/gpt-api', { input: inputValue });

    const botMessage = {
      message: response.data.message,
      sender: 'bot',
    };

    setMessages([...messages, botMessage]);

    setInputValue('');
  };

  return (
    <div className="chatbot">
      <div className="chatbot-messages">
        {messages.map((message, index) => (
          <div key={index} className={`chatbot-message chatbot-${message.sender}`}>
            {message.message}
          </div>
        ))}
      </div>
      <form onSubmit={handleFormSubmit} className="chatbot-input">
        <input type="text" value={inputValue} onChange={handleInputChange} placeholder="Type your message..." />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chatbot;
