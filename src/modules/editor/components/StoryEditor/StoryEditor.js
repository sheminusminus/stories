import React from 'react';

import { EventUtils, FnUtils, StringUtils } from 'utils';

import { EditorTextarea } from './components';

const initialText = 'Start typing...';

const StoryEditor = ({ onChangeText, onRemoveParagraph, text }) => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [firstValueFilled, setFirstValueFilled] = React.useState(false);
  const [needsFocus, setNeedsFocus] = React.useState(false);
  const activeTextareaRef = React.useRef();

  React.useEffect(() => {
    if (needsFocus && activeTextareaRef.current) {
      activeTextareaRef.current.focus();
      setNeedsFocus(false);
    }
  }, [needsFocus, activeTextareaRef]);

  if (FnUtils.not(FnUtils.hasLen(text))) {
    return (
      <EditorTextarea
        isReadOnly
        onKeyDown={(evt) => {
          if (EventUtils.isPressedLetter(evt)) {
            onChangeText(0, evt.key);
          }
        }}
        placeholder={initialText}
        text=""
      />
    );
  }

  const onTextAreaChange = (evt, idx) => {
    const { value } = evt.target;

    if (!firstValueFilled) {
      setFirstValueFilled(true);
      return;
    }

    if (StringUtils.endsWith2xNewline(value)) {
      const nextParagraph = idx + 1;
      setActiveIndex(nextParagraph);
      onChangeText(idx, value.split('\n\n')[0]);
      onChangeText(nextParagraph, '');
    } else {
      onChangeText(idx, evt.target.value)
    }
  };

  const onTextAreaKeyDown = (evt, idx, p) => {
    if (EventUtils.isPressedBackspace(evt) && !p) {
      onRemoveParagraph(idx);

      const lastParagraph = idx - 1;

      if (lastParagraph >= 0) {
        setActiveIndex(lastParagraph);
        setNeedsFocus(true);
      } else if (FnUtils.isLen(text, 1)) {
        setFirstValueFilled(false);
      }
    }
  };

  return (
    <div>
      {text.map((paragraph, idx) => (
        <EditorTextarea
          index={idx}
          innerRef={FnUtils.valueIf(activeIndex === idx, activeTextareaRef)}
          isReadOnly={false}
          key={`editor-textarea-${idx}`}
          onChange={onTextAreaChange}
          onKeyDown={onTextAreaKeyDown}
          text={paragraph}
        />
      ))}
    </div>
  );
};

export default StoryEditor;
