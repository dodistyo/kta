import React from 'react';
import isFunction from 'lodash/isFunction';

type DelayProps = {
  children: React.ReactNode | (() => React.ReactNode);
  wait: number;
};

type State = {
  waiting: boolean;
};

class Delay extends React.Component<DelayProps, State> {
  static defaultProps: Pick<DelayProps, 'wait'> = {
    wait: 250,
  };

  state: State = {
    waiting: true,
  };

  timer?: number;

  componentDidMount() {
    this.timer = window.setTimeout(() => {
      this.setState({
        waiting: false,
      });
    }, this.props.wait);
  }

  componentWillUnmount() {
    window.clearTimeout(this.timer);
  }

  render() {
    if (!this.state.waiting) {
      if (isFunction(this.props.children)) {
        return this.props.children();
      } else {
        return this.props.children;
      }
    }

    return null;
  }
}

export default Delay;
