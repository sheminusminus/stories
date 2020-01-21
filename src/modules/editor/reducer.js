import * as constants from './constants';

const initialState = {
  activeParagraph: 0,
  text: [],
};

export const name = 'editor';

export const reducer = (state = initialState, action = {}) => {
  const { meta, payload, type } = action;

  switch (type) {
    case constants.CHANGE_TEXT:
      return {
        ...state,
        text: [...state.text.slice(0, payload.index), payload.text, ...state.text.slice(payload.index + 1)],
      };

    case constants.REMOVE_PARAGRAPH:
      return {
        ...state,
        text: [...state.text.slice(0, payload.index), ...state.text.slice(payload.index + 1)],
      };

    default:
      return state;
  }
};
