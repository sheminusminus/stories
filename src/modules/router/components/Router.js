import React from 'react';
import { Router as ReachRouter } from '@reach/router'

import { withUser } from 'hoc';

import { Routes } from 'modules/router/constants';

import { Editor } from 'modules/editor/components';
import { CreateRoom, JoinRoom } from 'modules/rooms/components';

const EditorWithUser = withUser(Editor);

const Router = () => (
  <ReachRouter>
    <CreateRoom path={Routes.create()} />
    <JoinRoom path={Routes.join()} />
    <EditorWithUser path={Routes.edit()} />
  </ReachRouter>
);

export default Router;
