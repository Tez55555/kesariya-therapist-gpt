import React from 'react';
import { useNavigate } from 'react-router-dom';

const FaithSelector = ({ setFaith }) => {
  const navigate = useNavigate();

  const handleSelect = (faith) => {
    localStorage.setItem('userFaith', faith);
    setFaith(faith);
    navigate('/chat');
  };

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>🙏 Choose Your Faith</h2>
      <button onClick={() => handleSelect('hindu')}>🕉 Hindu</button>
      <button onClick={() => handleSelect('sikh')}>🛕 Sikh</button>
      <button onClick={() => handleSelect('christian')}>✝️ Christian</button>
      <button onClick={() => handleSelect('islam')}>☪️ Muslim</button>
    </div>
  );
};

export default FaithSelector;
