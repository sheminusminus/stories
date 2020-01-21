import React from 'react';
import shortId from 'shortid';
import { navigate } from '@reach/router';

import SetUser from './SetUser';

const CreateRoom = () => {
  const createRoom = React.useCallback(() => {
    const roomId = shortId.generate();
    localStorage.setItem('room.id', roomId);
    const id = localStorage.getItem('user.id');
    const name = localStorage.getItem('user.name');
    if (id && name) {
      navigate(`/editor/${roomId}`);
    }
  }, []);

  return (
    <div>
      <SetUser />
      <button type="button" onClick={createRoom}>
        Create Room
      </button>
    </div>
  );
};

export default CreateRoom;
