/** @jsx jsx */
import React, { Fragment } from 'react';
import { jsx } from '@emotion/core';
import { ComponentWithStaticMethod } from 'kta-ui-components';
import Button from '../Button/Button';
import NotificationContainer from './NotificationContainer';
import NotificationManager from './NotificationManager';
import Notification, { NotificationProps } from './Notification';

type BasicArgs = Pick<NotificationProps, 'iconType' | 'showIcon' | 'size'>;

export default { component: Notification, title: 'Components / Notification' };

const iconTypeOptions: {
  [key in BasicArgs['iconType']]: BasicArgs['iconType'];
} = {
  error: 'error',
  info: 'info',
  success: 'success',
};

const sizeOptions: {
  [key in BasicArgs['size']]: BasicArgs['size'];
} = {
  sm: 'sm',
  md: 'md',
  lg: 'lg',
};

export const Basic: ComponentWithStaticMethod<BasicArgs> = args => {
  const { iconType, showIcon, size } = args;

  React.useEffect(() => {
    showNotification();
  }, []);

  const showNotification = () => {
    NotificationManager.show({
      message: (
        <span>
          This is the notification.&nbsp;
          <a href="https://www.google.com/" target="_blank" rel="noreferrer">
            Link
          </a>
        </span>
      ),
      iconType,
      showIcon,
      size,
    });
  };

  return (
    <Fragment>
      <NotificationContainer />
      <Button onClick={showNotification}>Show Notification</Button>
    </Fragment>
  );
};

// https://storybook.js.org/docs/react/api/csf
Basic.storyName = 'basic';
Basic.argTypes = {
  iconType: {
    name: 'iconType',
    defaultValue: 'success',
    table: {
      type: { summary: 'enum' },
      defaultValue: { summary: '"success"' },
    },
    control: { type: 'select', options: iconTypeOptions },
  },
  showIcon: {
    name: 'showIcon',
    defaultValue: true,
    table: {
      type: { summary: 'boolean' },
      defaultValue: { summary: true },
    },
    control: { type: 'boolean' },
  },
  size: {
    name: 'size',
    defaultValue: 'sm',
    table: {
      type: { summary: 'enum' },
      defaultValue: { summary: '"sm"' },
    },
    control: { type: 'select', options: sizeOptions },
  },
};
