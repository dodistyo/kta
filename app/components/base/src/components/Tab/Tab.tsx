/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/core';
import { useTheme } from 'emotion-theming';
import { Theme } from '../../theme';

import TabItem, { TabItemProps } from './TabItem';
import createStyles from './Tab.styles';

export type TabProps = React.HTMLAttributes<HTMLDivElement> & {
  /** @default 1 */
  activeTab?: number;
  /** @default "minimum" */
  menuSize?: 'even' | 'minimum';
  onActiveTabChange?: (index: number) => void;
};

const Tab: React.FC<TabProps> = props => {
  const {
    activeTab: activeIndex = 1,
    children: _children,
    menuSize = 'minimum',
    onActiveTabChange,
    ...rest
  } = props;

  const totalChild = React.Children.toArray(_children).length;
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);

  const handleTabMenuClick = (
    index: number,
    onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void,
  ) => (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault();

    onClick && onClick(event);
    onActiveTabChange && onActiveTabChange(index + 1);
  };

  return (
    <div {...rest}>
      {/* Menu */}
      <ul css={styles.menuContainer}>
        {React.Children.map(_children, (child, index) => {
          if (!React.isValidElement(child) || child.type !== TabItem) {
            return null;
          }

          const { key: childKey, props: childProps } = child;
          const { onClick, title } = childProps as TabItemProps;
          const isActive = activeIndex === index + 1;

          return (
            <li
              key={childKey || index}
              css={[
                styles.menu,
                isActive && styles.menuActive,
                menuSize === 'even' && styles.menuEven,
              ]}
              style={{ width: menuSize === 'even' ? `${100 / totalChild}%` : undefined }}
            >
              <a onClick={handleTabMenuClick(index, onClick)} tabIndex={0}>
                <span css={styles.menuTitle}>{title}</span>
              </a>
            </li>
          );
        })}
      </ul>

      {/* Body */}
      <div css={styles.bodyContainer}>
        {React.Children.map(_children, (child, index) => {
          if (!React.isValidElement(child) || child.type !== TabItem) {
            return null;
          }

          const { key: childKey, props: childProps } = child;
          const { children } = childProps as TabItemProps;
          const isActive = activeIndex === index + 1;

          return (
            <div
              key={childKey || index}
              css={styles.body}
              style={{ display: isActive ? 'block' : 'none' }}
            >
              {children}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Tab;
