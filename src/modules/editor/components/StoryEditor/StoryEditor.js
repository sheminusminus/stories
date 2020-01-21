import React from 'react';
import * as R from 'ramda';

import { EventUtils, FnUtils, Hooks, StringUtils } from 'utils';

import { EditorTextarea } from './components';

const initialText = 'Start typing...';

const a = [];
const originalAddEvent = window.addEventListener;
window.addEventListener = (...args) => {
  //console.log(arguments);
  a[a.length] = args[0];
  a[a.length] = args[1];
  originalAddEvent.apply(this, args);
};
window.removeAllEventListeners = () => {
  for (let n=0; n < a.length; n += 2) {
    window.removeEventListener(a[n], a[n+1]);
  }
};

const StoryEditor = ({ onChangeText, onRemoveParagraph, onSuggestionsRequest, onRedo, onUndo, text }) => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [firstValueFilled, setFirstValueFilled] = React.useState(false);
  const [holdingMeta, setHoldingMeta] = React.useState(false);
  const [holdingShift, setHoldingShift] = React.useState(false);
  const [lastRequestText, setLastRequestText] = React.useState(0);
  const [needsFocus, setNeedsFocus] = React.useState(false);
  const activeTextareaRef = React.useRef();

  Hooks.useRequestAnimationFrame(() => {
    if (R.not(R.equals(text, lastRequestText))) {
      setLastRequestText(text);
      onSuggestionsRequest(text, activeIndex);
    }
  }, 1000, [text, lastRequestText]);

  React.useEffect(() => {
    window.removeAllEventListeners();
    window.addEventListener('keydown', (evt) => {
      const isUndo = EventUtils.isPressedUndo(evt, holdingMeta);
      const isRedo = EventUtils.isPressedRedo(evt, holdingMeta && holdingShift);
      if (isUndo || isRedo) {
        evt.preventDefault();
        if (isRedo) {
          console.log('redo');
          onRedo();
        } else if (isUndo) {
          console.log('undo');
          onUndo();
        }
      }
    });
  }, [holdingMeta, holdingShift]);

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
      onChangeText(idx, evt.target.value);
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
    } else if (EventUtils.isPressedMeta(evt)) {
      setHoldingMeta(true);
    } else if (EventUtils.isPressedShift(evt)) {
      setHoldingShift(true);
    }
  };

  const onTextAreaKeyUp = (evt) => {
    console.log('key up', evt.key);
    if (EventUtils.isPressedMeta(evt)) {
      setHoldingMeta(false);
    }

    if (EventUtils.isPressedShift(evt)) {
      setHoldingShift(false);
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
          onKeyUp={onTextAreaKeyUp}
          text={paragraph}
        />
      ))}
    </div>
  );
};

export default StoryEditor;
