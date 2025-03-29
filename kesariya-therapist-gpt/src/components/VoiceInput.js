import React from 'react';

const VoiceInput = ({ onTranscribe }) => {
  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-IN';
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      onTranscribe(transcript);
    };
    recognition.start();
  };

  return (
    <button onClick={startListening}>🎤 Speak</button>
  );
};

export default VoiceInput;
