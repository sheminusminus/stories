export const isPressedEnter = (evt) => {
  const { key } = evt;
  return key === 'Enter';
};

export const isPressedBackspace = (evt) => {
  const { key } = evt;
  return key === 'Backspace';
};

export const isPressedLetter = (evt) => {
  const { keyCode } = evt;
  return keyCode >= 65 && keyCode <= 90;
};
