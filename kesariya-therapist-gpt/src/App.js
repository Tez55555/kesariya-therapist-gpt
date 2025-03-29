import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FaithSelector from './pages/FaithSelector';
import ChatPage from './pages/ChatPage';

function App() {
  const [faith, setFaith] = useState(localStorage.getItem('userFaith') || '');

  return (
    <Router>
      <Routes>
        <Route path="/" element={<FaithSelector setFaith={setFaith} />} />
        <Route path="/chat" element={<ChatPage faith={faith} />} />
      </Routes>
    </Router>
  );
}

export default App;
