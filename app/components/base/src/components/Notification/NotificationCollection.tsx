import React, { Fragment } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { useTheme } from 'emotion-theming';
import { Theme } from '../../theme';
import Notification from './Notification';
import { NotificationStore } from './NotificationManager';

type Props = {
  notifications: NotificationStore[];
};

const NotificationCollection: React.FC<Props> = props => {
  const { notifications } = props;
  const theme = useTheme<Theme>();

  return (
    <TransitionGroup component={Fragment}>
      {notifications.map(notification => {
        const { key, ...rest } = notification;
        return (
          <CSSTransition
            key={key}
            timeout={theme.animation.timing.normal}
            classNames={{
              enter: 'enter',
              enterActive: 'enter-active',
              enterDone: 'enter-done',
              exit: 'exit',
              exitActive: 'exit-active',
              exitDone: 'exit-done',
            }}
          >
            {transitionStatus => {
              return <Notification {...rest} uid={key} transitionStatus={transitionStatus} />;
            }}
          </CSSTransition>
        );
      })}
    </TransitionGroup>
  );
};

export default NotificationCollection;
