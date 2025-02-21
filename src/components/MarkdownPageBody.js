import React from 'react';
import PropTypes from 'prop-types';
import Splitter from './Splitter';
import InputPath from './form/InputPath';
import InputTitle from './form/InputTitle';
import MarkdownEditor from './MarkdownEditor';
import Metadata from '../containers/MetaFields';

export default function MarkdownPageBody({
  type,
  path,
  body,
  title,
  onSave,
  updateTitle,
  updatePath,
  updateBody,
  metafields,
  staticmetafields,
  config,
}) {
  return (
    <div className="content-body">
      <InputPath onChange={updatePath} type={type} path={path} />
      <InputTitle onChange={updateTitle} title={title} />
      <MarkdownEditor
        path={path}
        onChange={updateBody}
        onSave={onSave}
        placeholder="Body"
        initialValue={body}
        config={config}
      />
      <Splitter />
      <Metadata
        fields={metafields}
        staticFields={staticmetafields}
        config={config}
      />
    </div>
  );
}

MarkdownPageBody.defaultProps = {
  path: '',
  body: '',
  title: '',
  metafields: {},
  staticmetafields: {},
};

MarkdownPageBody.propTypes = {
  updateBody: PropTypes.func.isRequired,
  updatePath: PropTypes.func.isRequired,
  updateTitle: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  path: PropTypes.string,
  body: PropTypes.string,
  title: PropTypes.string,
  metafields: PropTypes.object,
  staticmetafields: PropTypes.object,
  config: PropTypes.object.isRequired,
};
