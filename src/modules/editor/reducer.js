import * as constants from './constants';

const initialState = {
  activeParagraph: 0,
  text: [],
  history: [],
  future: [],
};

export const name = 'editor';

const getUndoValues = (state) => {
  const nextText = state.history[Math.max(state.history.length - 1, 0)];

  const nextFuture = nextText
    ? [state.text, ...state.future.slice(Math.min(state.future.length - 1, 0), state.future.length)]
    : state.future;

  const nextHistory = nextText
    ? state.history.slice(Math.max(state.history.length - 20, 0), state.history.length - 1)
    : state.history;

  return {
    text: nextText || state.text,
    future: nextFuture,
    history: nextHistory,
  };
};

const getRedoValues = (state) => {
  const nextText = state.future[0];

  const nextFuture = nextText
    ? [...state.future.slice(Math.min(1, state.future.length))]
    : state.future;

  const nextHistory = nextText
    ? [...state.history.slice(Math.max(state.history.length - 20, 0), state.history.length - 2), state.text]
    : state.history;

  return {
    text: nextText || state.text,
    future: nextFuture,
    history: nextHistory,
  };
};

export const reducer = (state = initialState, action = {}) => {
  const { meta, payload, type } = action;

  switch (type) {
    case constants.CHANGE_TEXT:
      return {
        ...state,
        text: [...state.text.slice(0, payload.index), payload.text, ...state.text.slice(payload.index + 1)],
        history: [...state.history.slice(Math.max(state.history.length - 20, 0), state.history.length), state.text],
      };

    case constants.REMOVE_PARAGRAPH:
      return {
        ...state,
        text: [...state.text.slice(0, payload.index), ...state.text.slice(payload.index + 1)],
        history: [...state.history.slice(Math.max(state.history.length - 20, 0), state.history.length), state.text],
      };

    case constants.UNDO_LAST:
      return {
        ...state,
        ...getUndoValues(state),
      };

    case constants.REDO_LAST:
      return {
        ...state,
        ...getRedoValues(state),
      };

    default:
      return state;
  }
};
