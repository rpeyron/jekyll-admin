import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import Icon from '../components/Icon';
import Button from '../components/Button';

export class Header extends Component {
  render() {
    const { config } = this.props;
    return (
      <div className="header">
        <h3 className="title">
          <Link target="_blank" to={config.url || '/'}>
            <Icon name="home" />
            <span>{config.title || 'You have no title!'}</span>
          </Link>
        </h3>
        {config.jekyll_admin?.header_buttons && (
          <span className="header_buttons">
            {' '}
            {config.jekyll_admin?.header_buttons.map((button, i) => {
              if (button.items) {
                return (
                  <span className="btn-menu-header">
                    <Button
                      key={'header_button_' + i}
                      active
                      thin
                      type="view"
                      onClick={() => {}}
                      icon={button.icon}
                      label={button.title ?? 'Click me'}
                    />
                    <span className="btn-menu-body">
                      {button.items.map((button, j) => (
                        <Button
                          key={'header_button_' + i + '_' + j}
                          active
                          thin
                          type="view"
                          to={button.url}
                          icon={button.icon}
                          label={button.title ?? 'Click me'}
                          class={button.class}
                          api={button.api}
                        />
                      ))}
                    </span>
                  </span>
                );
              } else {
                return (
                  <Button
                    key={'header_button_' + i}
                    active
                    thin
                    type="view"
                    to={button.url}
                    icon={button.icon}
                    label={button.title ?? 'Click me'}
                    className={button.class}
                    api={button.api}
                  />
                );
              }
            })}
          </span>
        )}
        <span className="version">v{process.env.REACT_APP_VERSION}</span>
      </div>
    );
  }
}

Header.propTypes = {
  config: PropTypes.object.isRequired,
};

export default Header;
