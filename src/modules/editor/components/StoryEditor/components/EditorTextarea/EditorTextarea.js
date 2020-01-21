import React from 'react';

const EditorTextarea = (props) => {
  const {
    index,
    innerRef,
    isReadOnly,
    onChange,
    onKeyDown,
    placeholder,
    text,
  } = props;

  return (
    <textarea
      autoFocus
      onChange={(evt) => onChange(evt, index, text)}
      onKeyDown={(evt) => onKeyDown(evt, index, text)}
      placeholder={placeholder}
      readOnly={isReadOnly}
      ref={innerRef}
      value={text}
    />
  );
};

export default EditorTextarea;
