export const isPressedEnter = (evt) => {
  const { key } = evt;
  return key === 'Enter';
};

export const isPressedBackspace = (evt) => {
  const { key } = evt;
  return key === 'Backspace';
};
