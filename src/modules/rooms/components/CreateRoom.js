import React from 'react';
import shortId from 'shortid';
import { navigate } from '@reach/router';

import { EventUtils, FnUtils } from 'utils';

import { SetUser } from 'components';

import { Routes } from 'modules/router/constants';

const CreateRoom = () => {
  const createRoom = React.useCallback(() => {
    const roomId = shortId.generate();

    localStorage.setItem('room.id', roomId);

    const id = localStorage.getItem('user.id');
    const name = localStorage.getItem('user.name');

    if (id && name) {
      navigate(Routes.edit(roomId));
    }
  }, []);

  return (
    <div>
      <SetUser
        onKeyPress={(evt) => {
          FnUtils.callIf(EventUtils.isPressedEnter(evt), createRoom);
        }}
      />
      <button type="button" onClick={createRoom}>
        Create Room
      </button>
    </div>
  );
};

export default CreateRoom;
