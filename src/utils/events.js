export const isPressedEnter = (evt) => {
  const { key } = evt;
  return key === 'Enter';
};

export const isPressedBackspace = (evt) => {
  const { key } = evt;
  return key === 'Backspace';
};

export const isPressedMeta = (evt) => {
  const { key } = evt;
  return key === 'Meta';
};

export const isPressedShift = (evt) => {
  const { key } = evt;
  return key === 'Shift';
};

export const isPressedUndo = (evt, holdingMeta) => {
  const { key } = evt;
  return key === 'z' && holdingMeta;
};

export const isPressedRedo = (evt, holdingMeta) => {
  const { key } = evt;
  return key === 'z' && holdingMeta;
};

export const isPressedLetter = (evt) => {
  const { keyCode } = evt;
  return keyCode >= 65 && keyCode <= 90;
};
