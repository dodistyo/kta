/** @jsx jsx */
import React, { Fragment } from 'react';
import { jsx } from '@emotion/core';
import { useTheme } from 'emotion-theming';
import { Theme } from '../../theme';
import { IconName } from '@fortawesome/fontawesome-svg-core';
import kebabCase from 'lodash/kebabCase';
import Icon from '../Icon/Icon';
import Tooltip from '../Tooltip/Tooltip';
import createStyles from './Dashboard.styles';

export type SidebarProps = {
  menu?: Array<{
    label: string;
    url?: string;
    icon: IconName;
    active?: boolean;
    onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  }>;
  collapsed: boolean;
  toggleCollapsed: () => void;
};

const Sidebar: React.FC<SidebarProps> = props => {
  const { collapsed, menu, toggleCollapsed } = props;
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);

  const renderMenu = () => {
    if (menu && menu.length > 0) {
      return menu.map((item, index) => {
        const key = kebabCase(`${item.label}-${index + 1}`);
        return (
          <Fragment key={key}>
            <a
              data-key={key}
              href={item.url}
              css={[styles.sidebarMenu, item.active && styles.sidebarMenuActive]}
              onClick={item.onClick}
            >
              <Icon name={item.icon} />
              <span>{item.label}</span>
            </a>
            {collapsed && (
              <Tooltip target={`[data-key=${key}]`} placement="right">
                {item.label}
              </Tooltip>
            )}
          </Fragment>
        );
      });
    }
    return null;
  };

  return (
    <aside css={[styles.sidebar, collapsed && styles.sidebarCollapsed]}>
      <nav css={styles.sidebarInner}>{renderMenu()}</nav>
      <a css={styles.sidebarCollapsedBtn} onClick={toggleCollapsed}>
        <Icon name={collapsed ? 'chevron-right' : 'chevron-left'} />
      </a>
    </aside>
  );
};

export default Sidebar;
