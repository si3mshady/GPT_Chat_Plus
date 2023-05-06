import React, { useState, useEffect } from 'react';
import "./Chat.css"
const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const api_key = 'sk-';
  const endpoint = 'https://api.openai.com/v1/completions';
  const model = 'text-davinci-003';
  const max_tokens = 7;
  const temperature = 0;

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

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${api_key}`
        },
        body: JSON.stringify({
          model,
          prompt: inputValue,
          max_tokens,
          temperature
        })
      });

      const data = await response.json();

      const botMessage = {
        message: data.choices[0].text.trim(),
        sender: 'bot',
      };

      setMessages([...messages, botMessage]);

    } catch (error) {
      console.error(error);
    }

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
