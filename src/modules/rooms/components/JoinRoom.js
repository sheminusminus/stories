import React from 'react';
import { navigate } from '@reach/router';

import { EventUtils, FnUtils } from 'utils';

import { SetUser } from 'components';

import { Routes } from 'modules/router/constants';

const JoinRoom = ({ roomId }) => {
  const handleJoin = React.useCallback(() => {
    const id = localStorage.getItem('user.id');
    const name = localStorage.getItem('user.name');

    if (name && id) {
      navigate(Routes.edit(roomId));
    }
  }, [roomId]);

  return (
    <div>
      <SetUser
        onKeyPress={(evt) => {
          FnUtils.callIf(EventUtils.isPressedEnter(evt), handleJoin);
        }}
      />
      <button type="button" onClick={handleJoin}>
        Join Room
      </button>
    </div>
  );
};

export default JoinRoom;
