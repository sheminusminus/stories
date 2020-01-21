import React from 'react';
import shortId from 'shortid';
import { Router } from "@reach/router"

import CreateRoom from './CreateRoom';
import Editor from './Editor';
import JoinRoom from './JoinRoom';

import './App.css';

const cloudConfig = {
  tokenUrl: async () => {
    const url = process.env.REACT_APP_CK_TOKEN_URL;
    let userId = localStorage.getItem('user.id');
    let userName = localStorage.getItem('user.name');
    if (!userId) {
      userId = shortId.generate();
      localStorage.setItem('userId', userId);
    }
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId,
        userName,
      }),
    });
    return response.text();
  },
  uploadUrl: process.env.REACT_APP_CK_UPLOAD_URL,
  webSocketUrl: process.env.REACT_APP_CK_SOCKET_URL,
};

function App() {
  return (
    <div className="app">
      <Router>
        <CreateRoom path="/" />
        <JoinRoom path="/editor/:roomId/join" />
        <Editor configuration={cloudConfig} path="/editor/:roomId" />
      </Router>
    </div>
  );
}

export default App;
