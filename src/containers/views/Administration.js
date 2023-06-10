import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { HotKeys } from 'react-hotkeys';
import DocumentTitle from 'react-document-title';
import ApiArea from '../../components/ApiArea';
import Errors from '../../components/Errors';
import Button from '../../components/Button';
import { putConfig, onEditorChange } from '../../ducks/config';
import { clearErrors } from '../../ducks/utils';
import { preventDefault } from '../../utils/helpers';
import { API } from '../../constants/api';

import translations from '../../translations';
import { Combobox } from 'react-widgets';
const { getLeaveMessage } = translations;

const reads = [
  { id: '/action/log', name: 'Internal Logs' },
  { id: '/action/logfile', name: 'External log file' },
  { id: '/action/ls', name: 'List of files' },
  { id: '/action/config', name: 'Internal configuration' },
  { id: '/action/ping', name: 'Ping' },
];

const triggers = [
  { id: '/action/process', name: 'Process' },
  { id: '/action/reset', name: 'Reset' },
  { id: '/action/build', name: 'Build' },
  { id: '/action/shutdown', name: 'Shutdown' },
];

export class Administration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      read: reads[0].id,
      refresh: false,
    };
  }

  render() {
    const { editorChanged, fieldChanged, updated, errors, config } = this.props;
    const { raw_content, content } = config;

    const keyboardHandlers = {
      save: this.handleClickSave,
    };

    return (
      <DocumentTitle title="Administration">
        <HotKeys handlers={keyboardHandlers} className="single">
          {errors && errors.length > 0 && <Errors errors={errors} />}
          <div className="content-header">
            <h1>Administration</h1>
            <div className="page-buttons multiple">
              <Button
                /*onClick={this.handleClickSave}*/
                type="save"
                active={editorChanged || fieldChanged}
                triggered={updated}
                block
              />
            </div>
          </div>
          <div className="content-body">
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1em',
                marginBottom: '0.2em',
              }}
            >
              <label htmlFor="read">Read</label>
              <Combobox
                name="read"
                defaultValue={
                  (reads.find(v => v.id == this.state.read) ?? { name: '' })
                    .name
                }
                data={reads}
                dataKey="id"
                textField="name"
                onChange={value => this.setState({ read: value.id })}
                style={{ flex: '1' }}
              ></Combobox>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label htmlFor="check_refresh">Refresh</label>
                <input
                  type="checkbox"
                  id="check_refresh"
                  defaultChecked={this.state.refresh}
                  onChange={value =>
                    this.setState({ refresh: !this.state.refresh })
                  }
                />
              </div>
            </div>
            <ApiArea
              url={this.state.read}
              refresh={this.state.refresh}
              style={{
                height: 'calc(100vh - 26em)',
              }}
            />
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1em',
                marginBottom: '0.2em',
              }}
            >
              <label>Command:</label>
              <Combobox
                defaultValue={
                  (reads.find(v => v.id == this.state.trigger) ?? { name: '' })
                    .name
                }
                data={triggers}
                dataKey="id"
                textField="name"
                onChange={value => this.setState({ trigger: value.id })}
                style={{ flex: '1' }}
                dropUp
              ></Combobox>
              <button
                style={{ height: '2em' }}
                onClick={() => {
                  try {
                    if (this.state.trigger) fetch(API + this.state.trigger);
                  } catch (e) {
                    console.error('Failed to fetch', e);
                  }
                }}
              >
                Trigger
              </button>
            </div>
          </div>
        </HotKeys>
      </DocumentTitle>
    );
  }
}

Administration.propTypes = {
  config: PropTypes.object.isRequired,
  onEditorChange: PropTypes.func.isRequired,
  putConfig: PropTypes.func.isRequired,
  updated: PropTypes.bool.isRequired,
  editorChanged: PropTypes.bool.isRequired,
  fieldChanged: PropTypes.bool.isRequired,
  errors: PropTypes.array.isRequired,
  clearErrors: PropTypes.func.isRequired,
  router: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  config: state.config.config,
  updated: state.config.updated,
  editorChanged: state.config.editorChanged,
  fieldChanged: state.metadata.fieldChanged,
  errors: state.utils.errors,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ putConfig, onEditorChange, clearErrors }, dispatch);

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Administration)
);
