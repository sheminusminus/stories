import React from 'react';
import { Router as ReachRouter } from '@reach/router'

import { Editor } from '../modules/editor/components';
import { CreateRoom, JoinRoom } from '../modules/rooms/components';

const Router = () => (
  <ReachRouter>
    <CreateRoom path="/" />
    <JoinRoom path="/editor/:roomId/join" />
    <Editor path="/editor/:roomId" />
  </ReachRouter>
);

export default Router;
