import React from 'react';

const EditorTextarea = (props) => {
  const {
    index,
    innerRef,
    isReadOnly,
    onChange,
    onKeyDown,
    onKeyUp,
    placeholder,
    text,
  } = props;

  const handleChange = onChange
    ? (evt) => onChange(evt, index, text)
    : undefined;

  const handleKeyDown = onKeyDown
    ? (evt) => onKeyDown(evt, index, text)
    : undefined;

  const handleKeyUp = onKeyUp
    ? (evt) => onKeyUp(evt, index, text)
    : undefined;

  return (
    <textarea
      autoFocus
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      placeholder={placeholder}
      readOnly={isReadOnly}
      ref={innerRef}
      value={text}
    />
  );
};

export default EditorTextarea;
