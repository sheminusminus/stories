import React from 'react';

import Editor from './Editor';

import './App.css';

const cloudConfig = {
  tokenUrl: process.env.REACT_APP_CK_TOKEN_URL,
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
