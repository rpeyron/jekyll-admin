import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { API } from '../constants/api';

class ApiArea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
    };
    this.refArea = element => {
      this.area = element;
    };
    this.updateApi();
  }

  componentDidMount() {
    this.create();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // Update API if URL is changed
    if (prevProps?.url != this.props.url) this.updateApi();
    // Start refresh loop if refresh modified
    if (this.props.refresh && !prevProps.refresh) {
      this.updateApi();
      this.timer = setInterval(() => this.updateApi(), 5000);
    }
    // Clear Interval if deselected
    if (!this.props.refresh && prevProps.refresh) {
      clearInterval(this.timer);
      this.timer = undefined;
    }

    // Scroll to bottom if refresh
    if (this.props.refresh) {
      this.area.scrollTop = this.area.scrollHeight;
    }

    this.destroy();
    this.create();
  }

  componentWillUnmount() {
    this.destroy();
  }

  create() {
    // this.updateApi()
  }

  async updateApi() {
    console.log('updateApi', this.props, this.state);
    if (this.props.url) {
      try {
        let result = await fetch(API + this.props.url);
        let text = await result.text();
        // Pretty print JSON
        if (result.headers.get('Content-Type').includes('json')) {
          try {
            text = JSON.stringify(JSON.parse(text), null, 2);
          } catch (e) {}
        }
        console.log('Result', text, result);
        if (result.ok) {
          if (text.length == 0) text = 'OK';
          this.setState({ content: text });
        } else {
          this.setState({
            content:
              'Error ' +
              result.status +
              ' - ' +
              result.statusText +
              '\n\n' +
              text,
          });
        }
      } catch (e) {
        this.setState({ content: 'Exception' + e });
      }
    }
  }

  destroy() {}

  render() {
    const { url } = this.props;
    return (
      <div>
        <textarea
          ref={this.refArea}
          readOnly={true}
          value={this.state.content}
          style={{
            width: '100%',
            resize: 'vertical',
            fontFamily: 'monospace',
            fontSize: 'small',
            ...(this.props.style ?? {}),
          }}
        />
      </div>
    );
  }
}

ApiArea.propTypes = {
  url: PropTypes.string.isRequired,
  style: PropTypes.any,
};

export default ApiArea;
