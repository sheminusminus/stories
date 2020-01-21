import * as constants from './constants';

export const changeText = (index, text) => ({
  payload: { index, text },
  type: constants.CHANGE_TEXT,
});

export const removeParagraph = (index, text) => ({
  payload: { index },
  type: constants.REMOVE_PARAGRAPH,
});
