const initialState = {};

export const name = 'editor';

export const reducer = (state = initialState, action = {}) => {
  const { meta, payload, type } = action;

  switch (type) {
    default:
      return state;
  }
};
