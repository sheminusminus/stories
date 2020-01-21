import React from 'react';
import ContentEditable from 'react-contenteditable';

import { FnUtils } from 'utils';

const initialText = 'Start typing...';

const StoryEditor = ({ activeParagraph, changeText, text }) => {
  const textareaRef = React.useRef();
  const [firstValueFilled, setFirstValueFilled] = React.useState(false);

  if (FnUtils.not(FnUtils.hasLen(text))) {
    return (
      <ContentEditable
        html={initialText}
        onKeyDown={(evt) => {
          changeText(0, evt.key);
        }}
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

            if (value.endsWith('\n\n')) {
              changeText(idx + 1, '')
            } else {
              changeText(idx, evt.target.value)
            }
          }}
          ref={textareaRef}
          value={paragraph}
        />
      ))}
    </div>
  );
};

export default StoryEditor;
