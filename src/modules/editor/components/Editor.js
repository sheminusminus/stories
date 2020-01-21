import React, { Component } from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import { Redirect } from '@reach/router';

import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment';
import Autoformat from '@ckeditor/ckeditor5-autoformat/src/autoformat';
import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import CKFinder from '@ckeditor/ckeditor5-ckfinder/src/ckfinder';
import Comments from '@ckeditor/ckeditor5-comments/src/comments';
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import FontFamily from '@ckeditor/ckeditor5-font/src/fontfamily';
import Heading from '@ckeditor/ckeditor5-heading/src/heading';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import Link from '@ckeditor/ckeditor5-link/src/link';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import PasteFromOffice from '@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice';
import PresenceList from '@ckeditor/ckeditor5-real-time-collaboration/src/presencelist';
import RealTimeCollaborativeComments from '@ckeditor/ckeditor5-real-time-collaboration/src/realtimecollaborativecomments';
import RealTimeCollaborativeTrackChanges from '@ckeditor/ckeditor5-real-time-collaboration/src/realtimecollaborativetrackchanges';
import RemoveFormat from '@ckeditor/ckeditor5-remove-format/src/removeformat';
import Strikethrough from '@ckeditor/ckeditor5-basic-styles/src/strikethrough';
import TrackChanges from '@ckeditor/ckeditor5-track-changes/src/trackchanges';
import Underline from '@ckeditor/ckeditor5-basic-styles/src/underline';
import UploadAdapter from '@ckeditor/ckeditor5-adapter-ckfinder/src/uploadadapter';

import { StringUtils } from 'utils';

import { Routes } from 'modules/router/constants';

import editorConfig from './config';

const initialData = `
	<p>
		This may be the first time you hear about this made-up disorder but it actually isn’t so far from the truth. Even the studies
		that were conducted almost half a century show that the language you speak has more effects on you than you realise.
	</p>
`;

class Editor extends Component {
  state = {
    // You need this state to render the <CKEditor /> component after the layout is ready.
    // <CKEditor /> needs HTMLElements of `Sidebar` and `PresenceList` plugins provided through
    // the `config` property and you have to ensure that both are already rendered.
    isLayoutReady: false,
    isThreadCreated: false,
  };

  sidebarElementRef = React.createRef();
  presenceListElementRef = React.createRef();

  componentDidMount() {
    this.setState({ isLayoutReady: true });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.boundRefreshDisplayMode);
    window.removeEventListener('beforeunload', this.boundCheckPendingActions);
  }

  refreshDisplayMode(editor){
    const annotations = editor.plugins.get('Annotations');
    const sidebarElement = this.sidebarElementRef.current;

    if ( window.innerWidth < 1070){
      sidebarElement.classList.remove('narrow');
      sidebarElement.classList.add('hidden');
      annotations.switchTo('inline');
    }
    else if ( window.innerWidth < 1300){
      sidebarElement.classList.remove('hidden');
      sidebarElement.classList.add('narrow');
      annotations.switchTo('narrowSidebar');
    }
    else {
      sidebarElement.classList.remove('hidden', 'narrow');
      annotations.switchTo('wideSidebar');
    }
  }

  checkPendingActions(editor, domEvt) {
    if (editor.plugins.get('PendingActions').hasAny) {
      domEvt.preventDefault();
      domEvt.returnValue = true;
    }
  }

  renderEditor() {
    return (
      <div className="row row-editor">
        {this.state.isLayoutReady && (
          <CKEditor
            onInit={(editor) => {
              console.log('Editor is ready to use!', editor);

              editor.execute('trackChanges');

              // Switch between inline and sidebar annotations according to the window size.
              this.boundRefreshDisplayMode = this.refreshDisplayMode.bind(this, editor);
              // Prevent closing the tab when any action is pending.
              this.boundCheckPendingActions = this.checkPendingActions.bind(this, editor);

              const usersPlugin = editor.plugins.get('Users');
              console.log(usersPlugin.me);
              window.addEventListener('resize', this.boundRefreshDisplayMode);
              window.addEventListener('beforeunload', this.boundCheckPendingActions);
              this.refreshDisplayMode(editor);
            }}
            onChange={(event, editor)=> {
              const data = editor.getData();
              const paragraphs = StringUtils.getParagraphs(data);
              console.log(paragraphs);
            }}
            editor={ClassicEditor}
            config={{
              plugins: [
                Alignment,
                Autoformat,
                BlockQuote,
                Bold,
                CKFinder,
                Comments,
                Essentials,
                FontFamily,
                Heading,
                Italic,
                Link,
                Paragraph,
                PasteFromOffice,
                PresenceList,
                RealTimeCollaborativeComments,
                RealTimeCollaborativeTrackChanges,
                RemoveFormat,
                Strikethrough,
                TrackChanges,
                Underline,
                UploadAdapter
              ],
              toolbar: [
                'fontfamily',
                '|',
                'undo',
                'redo',
                '|',
                'comment',
                '|',
                'trackChanges'
              ],
              cloudServices: {
                ...editorConfig,
                documentId: this.props.roomId,
              },
              sidebar: {
                container: this.sidebarElementRef.current
              },
              presenceList: {
                container: this.presenceListElementRef.current
              },
              placeholder: 'Text...',
            }}
            data={initialData}
          />
        )}
        <div ref={this.sidebarElementRef} className="sidebar" />
      </div>
    );
  }

  render() {
    const { roomId, user } = this.props;

    const canEdit = Boolean(roomId && user);
    const canJoin = Boolean(!canEdit && roomId);

    if (!canEdit) {
      if (canJoin) {
        return <Redirect noThrow to={Routes.join(roomId)} />;
      } else {
        return <Redirect noThrow to={Routes.create()} />;
      }
    }

    return (
      <div className="editor-wrapper">
        <main>
          <div className="centered">
            <div className="row-presence">
              <div ref={this.presenceListElementRef} className="presence" />
            </div>
            {this.renderEditor()}
          </div>
        </main>
      </div>
    );
  }
}

export default Editor;
