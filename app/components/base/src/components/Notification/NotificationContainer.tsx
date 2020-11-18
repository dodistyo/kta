import React from 'react';
import ReactDOM from 'react-dom';
import NotificationManager, { NotificationStore, eventName } from './NotificationManager';
import NotificationCollection from './NotificationCollection';
import isBrowser from '../../utils/isBrowser';

type State = {
  notifications: NotificationStore[];
};

class NotificationContainer extends React.Component<unknown, State> {
  container: HTMLDivElement | null;

  constructor(props: unknown) {
    super(props);

    this.container = null;
    this.state = {
      notifications: [],
    };

    if (isBrowser) {
      this.container = document.createElement('div');
      this.container.setAttribute('id', 'notification-container');
      document.body.appendChild(this.container);
      NotificationManager.addChangeListener(this.handleStoreChange);
    }
  }

  componentWillUnmount() {
    NotificationManager.reset();
    NotificationManager.removeChangeListener(this.handleStoreChange);
    if (this.container) {
      document.body.removeChild(this.container);
      this.container = null;
    }
  }

  handleStoreChange = (e: CustomEvent) => {
    if (this.container && e.type === eventName) {
      this.setState({ notifications: e.detail });
    }
  };

  render() {
    if (this.container) {
      return ReactDOM.createPortal(
        <NotificationCollection notifications={this.state.notifications} />,
        this.container,
      );
    }

    return null;
  }
}

export default NotificationContainer;
