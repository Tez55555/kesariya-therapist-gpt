import React, { useState } from 'react';
import VoiceInput from '../components/VoiceInput';
import speakText from '../components/VoiceOutput';
import { fetchGPTResponse } from '../api/gptHandler';
import { storyPromptBase } from '../prompts/storyOnlyGPTPrompt';
import { getPromptByFaith } from '../utils/faithRouter';

const ChatPage = () => {
  const [conversation, setConversation] = useState([]);
  const userFaith = 'hindu'; // TODO: Replace with selector or memory later

  const handleUserInput = async (transcript) => {
    setConversation(prev => [...prev, { role: 'user', text: transcript }]);
    const fullPrompt = getPromptByFaith(userFaith) + `\nUser said: "${transcript}"\nRespond with a matching story.`;
    const response = await fetchGPTResponse(fullPrompt);
    setConversation(prev => [...prev, { role: 'ai', text: response }]);
    speakText(response);
  };

  return (
    <div className="chat-container">
      <VoiceInput onTranscribe={handleUserInput} />
      <div className="conversation-log">
        {conversation.map((msg, index) => (
          <p key={index}><strong>{msg.role}:</strong> {msg.text}</p>
        ))}
      </div>
    </div>
  );
};

export default ChatPage;
