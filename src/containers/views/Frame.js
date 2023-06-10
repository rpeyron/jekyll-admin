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
import { preventDefault, slugify } from '../../utils/helpers';
import { API } from '../../constants/api';

import translations from '../../translations';
const { getLeaveMessage } = translations;

export class Frame extends Component {
  render() {
    const { config, params } = this.props;

    let frameUrl = undefined;
    const frameSlug = this.props.params?.splat;
    const framesList = config.content?.jekyll_admin?.sidebarFrames;
    if (frameSlug && framesList) {
      frameUrl = framesList.find(v => frameSlug == slugify(v.title))?.url;
    }

    console.log(this.props);

    if (frameUrl) {
      return (
        <iframe
          src={frameUrl}
          style={{ width: '100%', height: 'calc(100vh - 9em)' }}
        ></iframe>
      );
    } else {
      return <span>Nothing to load</span>;
    }
  }
}

Frame.propTypes = {
  config: PropTypes.object.isRequired,
  updated: PropTypes.bool.isRequired,
  errors: PropTypes.array.isRequired,
  clearErrors: PropTypes.func.isRequired,
  params: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  config: state.config.config,
  updated: state.config.updated,
  errors: state.utils.errors,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ putConfig, onEditorChange, clearErrors }, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Frame));
