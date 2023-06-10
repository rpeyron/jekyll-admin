import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Icon from './Icon';
import { API } from '../constants/api';

import translations from '../translations';
import { isReactChildren } from 'react-router/lib/RouteUtils';
const { labels } = translations;

const iconMap = {
  create: 'plus-square',
  delete: 'trash',
  publish: 'send-o',
  save: 'save',
  upload: 'upload',
  view: 'eye',
};

export default function Button({
  type,
  active,
  triggered,
  onClick,
  block,
  thin,
  icon,
  to,
  label,
  className,
  api,
}) {
  const btnClass = className
    ? 'btn btn-view btn-active ' + className
    : classnames('btn', {
        'btn-active': active,
        'btn-success': active && (type === 'save' || type === 'create'),
        'btn-delete': type === 'delete',
        'btn-view': type === 'view' || type === 'publish',
        'btn-inactive': !active,
        'btn-fat': block,
        'btn-thin': thin,
      });

  let typeLabel, triggeredLabel;
  switch (type) {
    case 'save':
    case 'create':
      typeLabel = labels[type].label;
      triggeredLabel = labels[type].triggeredLabel;
      break;
    case 'view-toggle':
      typeLabel = labels.viewToggle.label;
      triggeredLabel = labels.viewToggle.triggeredLabel;
      break;
    case 'view':
    case 'delete':
    case 'upload':
    case 'publish':
      typeLabel = labels[type].label;
      break;
    default:
      typeLabel = '<LABEL>';
      triggeredLabel = '<NEXT LABEL>';
  }

  const iconName = icon || iconMap[type];
  const iconNode = iconName && <Icon name={iconName} />;

  if (api) {
    onClick = async event => {
      let target = event?.currentTarget;
      if (target && target.classList) target.classList.add('pending');

      // We call API and ignore result
      await fetch(api.includes('://') ? api : API + '/' + api).catch(e => {});

      let isReady = async () => {
        try {
          let response = await fetch(API + '/action/ping');
          return response.ok;
        } catch (e) {
          return false;
        }
      };
      function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }

      try {
        let max = 120;
        await sleep(1000);
        while (!(await isReady()) && max-- > 0) {
          await sleep(1000);
        }
      } finally {
        if (target && target.classList) target.classList.remove('pending');
      }
    };
  }

  if (to) {
    return (
      <a
        href={to}
        target="_blank"
        rel="noopener noreferrer"
        className={btnClass}
      >
        {iconNode}
        {label ?? typeLabel}
      </a>
    );
  } else if (onClick) {
    return (
      <button onClick={onClick} className={btnClass}>
        {iconNode}
        {label ?? (triggered ? triggeredLabel : typeLabel)}
      </button>
    );
  }

  return null;
}

Button.propTypes = {
  type: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  onClick: PropTypes.func,
  triggered: PropTypes.bool,
  block: PropTypes.bool,
  thin: PropTypes.bool,
  icon: PropTypes.string,
  to: PropTypes.string,
};
