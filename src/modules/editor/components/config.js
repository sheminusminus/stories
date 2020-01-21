import shortId from 'shortid';

export default {
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
