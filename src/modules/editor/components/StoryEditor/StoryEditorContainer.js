import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { actions, selectors } from 'modules/editor';

import StoryEditor from './StoryEditor';

const mapStateToProps = createStructuredSelector({
  activeParagraph: selectors.getEditorActiveParagraph,
  text: selectors.getEditorText,
});

const mapDispatchToProps = {
  onChangeText: actions.changeText,
  onRemoveParagraph: actions.removeParagraph,
};

export default connect(mapStateToProps, mapDispatchToProps)(StoryEditor);
