import * as constants from './constants';

export const changeText = (index, text) => ({
  payload: { index, text },
  type: constants.CHANGE_TEXT,
});

export const removeParagraph = (index, text) => ({
  payload: { index },
  type: constants.REMOVE_PARAGRAPH,
});

export const undoLast = () => ({
  type: constants.UNDO_LAST,
});

export const redoLast = () => ({
  type: constants.REDO_LAST,
});

export const suggestionsRequest = (text, activeIndex) => ({
  payload: { text, activeIndex },
  type: constants.SUGGESTIONS_REQUEST,
});

export const suggestionsSuccess = (suggestions) => ({
  payload: { suggestions },
  type: constants.SUGGESTIONS_SUCCESS,
});

export const suggestionsFailure = (error) => ({
  payload: { error },
  type: constants.SUGGESTIONS_FAILURE,
});
