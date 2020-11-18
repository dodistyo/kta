import React from 'react';
import isObject from 'lodash/isObject';
import isString from 'lodash/isString';
import Notification from './Notification';

export type NotificationProps = JSX.LibraryManagedAttributes<
  typeof Notification,
  React.ComponentProps<typeof Notification>
>;

export type NotificationStore = Omit<NotificationProps, 'uid'> & {
  key: NotificationProps['uid'];
};

type Options = Partial<NotificationStore> | JSX.Element | string;

export const eventName = '__NOTIFICATION__';

let notifications: Array<Partial<NotificationStore>> = [];

function emitChange() {
  // https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Creating_and_triggering_events
  // To add more data to the event object, the CustomEvent interface exists
  // and the detail property can be used to pass custom data.
  const event = new CustomEvent(eventName, { detail: notifications });
  window.dispatchEvent(event);
}

function createNotification(options: Options) {
  let data: Partial<NotificationStore> = {
    ...Notification.defaultProps,
    key: new Date().getTime(),
    message: null,
  };

  if (React.isValidElement(options) || isString(options)) {
    data = {
      ...data,
      message: options,
    };
  } else if (isObject(options)) {
    data = {
      ...data,
      ...options,
    } as NotificationStore;
  }

  notifications.unshift(data);
  emitChange();

  return data.key;
}

function addChangeListener(callback: (e: CustomEvent) => void) {
  window.addEventListener(eventName, callback as EventListener);
}

function removeChangeListener(callback: (e: CustomEvent) => void) {
  window.removeEventListener(eventName, callback as EventListener);
}

function reset() {
  notifications = [];
  emitChange();
}

function show(options: Options) {
  return createNotification(options);
}

function dismiss(key: NotificationProps['uid']) {
  notifications = notifications.filter(n => key !== n.key);
  emitChange();
}

function dismissOldest() {
  notifications.pop();
  emitChange();
}

function dismissAll() {
  notifications = [];
  emitChange();
}

export default {
  addChangeListener,
  removeChangeListener,
  reset,
  show,
  dismiss,
  dismissOldest,
  dismissAll,
};
