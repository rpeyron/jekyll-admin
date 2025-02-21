import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FilePicker from './FilePicker';
import { getExtensionFromPath } from '../utils/helpers';

import { Editor, CommandBar } from 'tiny-markdown-editor';
import 'tiny-markdown-editor/dist/tiny-mde.min.css';

// https://github.com/jefago/tiny-markdown-editor/

class MarkdownEditor_TinyMDE extends Component {
  specificOptions = {};

  componentDidMount() {
    this.create();
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.initialValue !== this.props.initialValue;
  }

  componentDidUpdate() {
    this.destroy();
    this.create();
  }

  componentWillUnmount() {
    this.destroy();
  }

  create() {
    const { onChange, onSave } = this.props;

    var tinyMDE = new Editor({
      element: this.refs.mde_editor,
      textarea: this.refs.mde_textarea,
      content: this.props.initialValue,
    });

    var commandBar = new CommandBar({
      element: this.refs.mde_toolbar,
      editor: tinyMDE,
      commands: [
        'h1',
        'h2',
        '|',
        'bold',
        'italic',
        'strikethrough',
        'code',
        'ul',
        'ol',
        'blockquote',
        'hr',
        '|',
        'insertLink',
        'insertImage',
        '|',
        {
          name: 'Pick',
          title: 'Pick',
          innerHTML:
            '<a title="Insert Static File" tabindex="-1" class="fa fa-paperclip"  style="color: #404040"></a>',
          action: editor => {
            this.refs.filepicker.refs.trigger.click();
          },
          hotkey: 'Ctrl-W',
        },
        {
          name: 'Save',
          title: 'Save',
          innerHTML:
            "<a class='fa fa-floppy-o' title='Save' style='color: #404040'></a>",
          action: onSave,
          hotkey: 'Ctrl-S',
        },
        '|',
        {
          name: 'Styles',
          name: 'Styles',
          innerHTML: `
          <div class="menu-hover">
           <div class="menu-title">Styles</div>
           <div class="menu-contents" id="mde-styles">
           </div>
          </div>
          `,
          hotkey: 'Ctrl-<',
        },
        {
          name: 'Shortcuts',
          name: 'Shortcuts',
          innerHTML: `
          <div class="menu-hover">
           <div class="menu-title">Shortcuts</div>
           <div class="menu-contents" id="mde-shortcuts">
           </div>
          </div>
          `,
          hotkey: 'Ctrl->',
        },
      ],
    });

    var stylesEl = document.querySelector('#mde-styles');
    if (stylesEl) {
      let styles = this.props.config.content?.jekyll_admin?.commandbar?.styles;
      if (styles) {
        try {
          Object.entries(styles).forEach(([key, value]) => {
            var el = document.createElement('div');
            el.innerHTML = key;
            el.onclick = () => {
              tinyMDE.wrapSelection('', '{: ' + value + '}');
            };
            stylesEl.appendChild(el);
          });
          stylesEl.parentElement.parentElement.querySelector(
            '.menu-title'
          ).onclick = () => {
            tinyMDE.wrapSelection('', '{: }');
          };
        } catch (e) {}
      } else {
        stylesEl.parentElement.parentElement.querySelector(
          '.menu-title'
        ).style.display = 'none';
      }
    }

    var shortcutsEl = document.querySelector('#mde-shortcuts');
    if (shortcutsEl) {
      let shortcuts = this.props.config.content?.jekyll_admin?.commandbar
        ?.shortcuts;
      if (shortcuts) {
        try {
          Object.entries(shortcuts).forEach(([key, value]) => {
            var el = document.createElement('div');
            el.innerHTML = key;
            el.onclick = () => {
              tinyMDE.wrapSelection('', value);
            };
            shortcutsEl.appendChild(el);
          });
        } catch (e) {}
      } else {
        shortcutsEl.parentElement.parentElement.querySelector(
          '.menu-title'
        ).style.display = 'none';
      }
    }

    this.editor = tinyMDE;

    // Add change handler to update state
    this.editor.addEventListener('change', event => {
      onChange(event.content);
    });
  }

  destroy() {
    if (this.refs.mde_toolbar) this.refs.mde_toolbar.innerHTML = '';
    if (this.refs.mde_editor) this.refs.mde_editor.innerHTML = '';
    if (this.refs.mde_textarea) this.refs.mde_textarea.innerHTML = '';
  }

  handleFilePick = path => {
    const url = `{{ '${path}' | relative_url }}`;
    const ext = getExtensionFromPath(path);
    const type = /png|jpg|gif|jpeg|svg|ico/i.test(ext) ? 'addImage' : 'addLink';
    this.editor.wrapSelection(
      type == 'addImage' ? '![' : '[',
      '](' + url + ')'
    );
  };

  render() {
    return (
      <div>
        <div style={{ display: 'none' }}>
          <FilePicker ref="filepicker" onPick={this.handleFilePick} />
        </div>
        <div ref="container" className="tinymde">
          <div ref="mde_toolbar"></div>
          <div
            ref="mde_editor"
            style={{ width: '100%', resize: 'vertical', minHeight: '20em' }}
          ></div>
          <textarea ref="mde_textarea" />
        </div>
      </div>
    );
  }
}

MarkdownEditor_TinyMDE.propTypes = {
  initialValue: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  config: PropTypes.object.isRequired,
};

export default MarkdownEditor_TinyMDE;
