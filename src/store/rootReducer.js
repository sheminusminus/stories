import { combineReducers } from 'redux';

import { reducer as editor } from '../modules/editor';
import { reducer as rooms } from '../modules/rooms';

export default combineReducers({
  [editor.name]: editor.reducer,
  [rooms.name]: rooms.reducer,
});
