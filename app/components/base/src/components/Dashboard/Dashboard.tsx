/** @jsx jsx */
import React, { Fragment } from 'react';
import { jsx, Global } from '@emotion/core';
import { useTheme } from 'emotion-theming';
import { Theme } from '../../theme';
import Container from '../Grid/Container';
import Row from '../Grid/Row';
import Header from './Header';
import Sidebar, { SidebarProps } from './Sidebar';
import createStyles from './Dashboard.styles';

export type HeaderProps = JSX.LibraryManagedAttributes<
  typeof Header,
  React.ComponentProps<typeof Header>
>;

export type DashboardProps = {
  children?: React.ReactNode;
  header: HeaderProps;
  sidebar: SidebarProps;
};

const Dashboard: React.FC<DashboardProps> = props => {
  const { children, header, sidebar } = props;
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);

  return (
    <Fragment>
      <Global styles={styles.global} />

      <Header {...header} />
      <Container fluid>
        <Row>
          <Sidebar {...sidebar} />
          <main css={[styles.content, sidebar.collapsed && styles.contentCollapsed]}>
            {children}
          </main>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Dashboard;
