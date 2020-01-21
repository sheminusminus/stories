import React from 'react';

import { EventUtils, FnUtils, StringUtils } from 'utils';

const initialText = 'Start typing...';

const StoryEditor = ({ onChangeText, onRemoveParagraph, text }) => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [firstValueFilled, setFirstValueFilled] = React.useState(false);
  const [needsFocus, setNeedsFocus] = React.useState(false);
  const activeTextarea = React.useRef();

  React.useEffect(() => {
    if (needsFocus && activeTextarea.current) {
      activeTextarea.current.focus();
      setNeedsFocus(false);
    }
  }, [needsFocus, activeTextarea]);

  if (FnUtils.not(FnUtils.hasLen(text))) {
    return (
      <textarea
        autoFocus
        onKeyDown={(evt) => {
          onChangeText(0, evt.key);
        }}
        placeholder={initialText}
      />
    );
  }

  return (
    <div>
      {text.map((paragraph, idx) => (
        <textarea
          autoFocus
          key={`paragraph-${idx}`}
          onChange={(evt) => {
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
          }}
          onKeyDown={(evt) => {
            if (EventUtils.isPressedBackspace(evt) && !paragraph) {
              onRemoveParagraph(idx);

              const lastParagraph = idx - 1;

              if (lastParagraph >= 0) {
                setActiveIndex(lastParagraph);
                setNeedsFocus(true);
              } else if (FnUtils.isLen(text, 1)) {
                setFirstValueFilled(false);
              }
            }
          }}
          ref={activeIndex === idx ? activeTextarea : undefined}
          value={paragraph}
        />
      ))}
    </div>
  );
};

export default StoryEditor;
