import * as constants from './constants';

const initialState = {
  text: [],
};

export const name = 'editor';

export const reducer = (state = initialState, action = {}) => {
  const { meta, payload, type } = action;

  switch (type) {
    case constants.CHANGE_TEXT:
      return {
        ...state,
        text: payload.text,
      };

    default:
      return state;
  }
};
