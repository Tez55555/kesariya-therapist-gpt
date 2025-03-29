import React, { useState, useRef } from 'react';
import axios from 'axios';

function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef();

  const handleSend = async () => {
    const input = inputRef.current.value.trim();
    if (!input) return;

    const userMessage = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    inputRef.current.value = '';

    try {
      const response = await axios.post('/api/gptHandler', { prompt: input });
      console.log("🧠 GPT Response:", response.data);

      const assistantReply = response.data.reply;

      if (!assistantReply) {
        throw new Error("Empty GPT reply");
      }

      const assistantMessage = { role: 'assistant', content: assistantReply };
      setMessages((prev) => [...prev, assistantMessage]);

    } catch (err) {
      console.error("🚨 GPT Chat Error:", err.message || err);
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: '⚠️ No response from GPT. Try again.' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', maxWidth: 800, margin: 'auto' }}>
      <h2>🧘 Kesariya Therapist GPT</h2>

      <div style={{ minHeight: '300px', marginBottom: '1rem', border: '1px solid #ccc', padding: '1rem', borderRadius: '8px' }}>
        {messages.map((msg, i) => (
          <p key={i}><strong>{msg.role}:</strong> {msg.content}</p>
        ))}
        {isLoading && <p><em>Thinking...</em></p>}
      </div>

      <div>
        <input
          ref={inputRef}
          placeholder="Ask your question..."
          style={{ padding: '0.5rem', width: '70%' }}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <button onClick={handleSend} style={{ marginLeft: '1rem' }}>Send</button>
      </div>
    </div>
  );
}

export default ChatPage;

