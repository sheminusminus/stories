import { createSelector } from 'reselect';

import { name } from './reducer';

const getState = state => state[name];

export const getEditor = createSelector(
  [getState],
  state => state,
);

export const getEditorActiveParagraph = createSelector(
  [getEditor],
  editor => editor.activeParagraph,
);

export const getEditorText = createSelector(
  [getEditor],
  editor => editor.text,
);
