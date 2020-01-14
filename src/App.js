import React from 'react';
import shortId from 'shortid';

import Editor from './Editor';

import './App.css';

const cloudConfig = {
  tokenUrl: async () => {
    const url = process.env.REACT_APP_CK_TOKEN_URL;
    let userId = localStorage.getItem('userId');
    if (!userId) {
      userId = shortId.generate();
      localStorage.setItem('userId', userId);
    }
    const response = await fetch(`${url}?userId=${userId}`);
    return response.text();
  },
  uploadUrl: process.env.REACT_APP_CK_UPLOAD_URL,
  webSocketUrl: process.env.REACT_APP_CK_SOCKET_URL,
  documentId: process.env.REACT_APP_CK_DOC_ID,
};

function App() {
  return (
    <div className="App">
      <Editor configuration={cloudConfig} />
    </div>
  );
}

export default App;
