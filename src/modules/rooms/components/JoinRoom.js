import React from 'react';
import { navigate } from '@reach/router';

import SetUser from './SetUser';

const JoinRoom = ({ roomId }) => {
  const handleJoin = React.useCallback(() => {
    const id = localStorage.getItem('user.id');
    const name = localStorage.getItem('user.name');

    if (name && id) {
      navigate(`/editor/${roomId}`);
    }
  }, [roomId]);

  return (
    <div>
      <SetUser />
      <button type="button" onClick={handleJoin}>
        Join Room
      </button>
    </div>
  );
};

export default JoinRoom;
