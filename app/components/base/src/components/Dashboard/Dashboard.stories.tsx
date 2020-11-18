/** @jsx jsx */
import React, { Fragment } from 'react';
import { ComponentWithStaticMethod } from 'kta-ui-components';
import { jsx, css, Global } from '@emotion/core';
import Icon from '../Icon/Icon';
import Panel from '../Panel/Panel';
import Row from '../Grid/Row';
import Column from '../Grid/Column';
import Widget from '../Widget/Widget';
import Tab from '../Tab/Tab';
import TabItem from '../Tab/TabItem';
import Dashboard, { DashboardProps } from './Dashboard';

type Args = unknown;

export default { component: Dashboard, title: 'Components / Dashboard' };

const getMenu = (activeIndex: number, cb?: (index: number) => void) => {
  const menu: DashboardProps['sidebar']['menu'] = [
    { label: 'Ringkasan', icon: 'columns', url: '#' },
    { label: 'Tambah Data', icon: 'plus-circle', url: '#' },
    { label: 'Validasi', icon: 'tasks', url: '#' },
    { label: 'Data KTA', icon: 'id-card', url: '#' },
    { label: 'Laporan', icon: 'chart-area', url: '#' },
    { label: 'Pengaturan', icon: 'cogs', url: '#' },
  ];
  return menu.map((item, index) => ({
    ...item,
    active: index === activeIndex,
    onClick: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      e.preventDefault();
      cb && cb(index);
    },
  }));
};

export const Basic: ComponentWithStaticMethod<Args> = () => {
  const [collapsed, setCollapsed] = React.useState<boolean>(false);
  const [sidebarMenuActiveIndex, setSidebarMenuActiveIndex] = React.useState(0);

  const toggleCollapsed = () => {
    setCollapsed(prev => !prev);
  };

  const dashboardProps: DashboardProps = {
    header: {
      dropdownMenu: [{ label: 'Logout', icon: 'sign-out-alt' }],
    },
    sidebar: {
      collapsed,
      toggleCollapsed,
      menu: getMenu(sidebarMenuActiveIndex, index => {
        setSidebarMenuActiveIndex(index);
      }),
    },
  };

  return (
    <Fragment>
      {/* ----- Ignore ----- */}
      <Global
        styles={css`
          #root {
            padding: 0;
          }
        `}
      />
      {/* ----- End ignore ----- */}

      <Dashboard {...dashboardProps}>
        <Panel elevation="container">Content</Panel>
      </Dashboard>
    </Fragment>
  );
};

Basic.storyName = 'basic';
Basic.argTypes = {};

export const WidgetInContent: ComponentWithStaticMethod<Args> = () => {
  const [collapsed, setCollapsed] = React.useState<boolean>(false);
  const [sidebarMenuActiveIndex, setSidebarMenuActiveIndex] = React.useState(0);

  const toggleCollapsed = () => {
    setCollapsed(prev => !prev);
  };

  const dashboardProps: DashboardProps = {
    header: {
      dropdownMenu: [{ label: 'Logout', icon: 'sign-out-alt' }],
    },
    sidebar: {
      collapsed,
      toggleCollapsed,
      menu: getMenu(sidebarMenuActiveIndex, index => {
        setSidebarMenuActiveIndex(index);
      }),
    },
  };

  const marginBottom = css`
    margin-bottom: 20px;
  `;

  const dataDummy = {
    message: 'Success',
    data: {
      age: {
        '< 20': 1,
        '20 - 29': 8,
        '30 - 39': 6,
        '40 - 49': 6,
        '50 - 59': 1,
        '> 70': 1,
      },
      gender: {
        'Laki - Laki': 18,
        Perempuan: 5,
      },
      location: {
        'DKI JAKARTA': 7,
        'JAWA BARAT': 6,
        'SUMATERA UTARA': 4,
        'KALIMANTAN SELATAN': 1,
        RIAU: 2,
        'JAWA TIMUR': 1,
        ACEH: 1,
        'KALIMANTAN TIMUR': 1,
      },
      total: 23,
      total_loc: 'se-Indonesia',
    },
  };

  return (
    <Fragment>
      {/* ----- Ignore ----- */}
      <Global
        styles={css`
          #root {
            padding: 0;
          }
        `}
      />
      {/* ----- End ignore ----- */}

      <Dashboard {...dashboardProps}>
        <Row>
          <Column>
            <Widget.TotalData total={dataDummy.data.total} css={marginBottom} />
            <Widget.AgeDistribution data={dataDummy.data.age} />
          </Column>
          <Column>
            <Widget.DomicileDistribution data={dataDummy.data.location} css={marginBottom} />
            <Widget.GenderRatio data={dataDummy.data.gender} />
          </Column>
        </Row>
      </Dashboard>
    </Fragment>
  );
};

WidgetInContent.storyName = 'widget in content';
WidgetInContent.argTypes = {};

export const TabInContent: ComponentWithStaticMethod<Args> = () => {
  const [collapsed, setCollapsed] = React.useState<boolean>(false);
  const [sidebarMenuActiveIndex, setSidebarMenuActiveIndex] = React.useState(0);

  const toggleCollapsed = () => {
    setCollapsed(prev => !prev);
  };

  const dashboardProps: DashboardProps = {
    header: {
      dropdownMenu: [{ label: 'Logout', icon: 'sign-out-alt' }],
    },
    sidebar: {
      collapsed,
      toggleCollapsed,
      menu: getMenu(sidebarMenuActiveIndex, index => {
        setSidebarMenuActiveIndex(index);
      }),
    },
  };

  return (
    <Fragment>
      {/* ----- Ignore ----- */}
      <Global
        styles={css`
          #root {
            padding: 0;
          }
        `}
      />
      {/* ----- End ignore ----- */}

      <Dashboard {...dashboardProps}>
        <Panel elevation="container" style={{ padding: 0 }}>
          <Tab>
            <TabItem
              title={
                <span>
                  <Icon name="users" />
                  &nbsp;&nbsp;Pengguna
                </span>
              }
            >
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
              has been the industry's standard dummy text ever since the 1500s, when an unknown
              printer took a galley of type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into electronic typesetting,
              remaining essentially unchanged. It was popularised in the 1960s with the release of
              Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </TabItem>
            <TabItem
              title={
                <span>
                  <Icon name="address-card" />
                  &nbsp;&nbsp;Desain Kartu
                </span>
              }
            >
              It is a long established fact that a reader will be distracted by the readable content
              of a page when looking at its layout. The point of using Lorem Ipsum is that it has a
              more-or-less normal distribution of letters, as opposed to using 'Content here,
              content here', making it look like readable English. Many desktop publishing packages
              and web page editors now use Lorem Ipsum as their default model text, and a search for
              'lorem ipsum' will uncover many web sites still in their infancy. Various versions
              have evolved over the years, sometimes by accident, sometimes on purpose (injected
              humour and the like).
            </TabItem>
            <TabItem
              title={
                <span>
                  <Icon name="key" />
                  &nbsp;&nbsp;Lisensi
                </span>
              }
            >
              Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a
              piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard
              McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of
              the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going
              through the cites of the word in classical literature, discovered the undoubtable
              source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et
              Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a
              treatise on the theory of ethics, very popular during the Renaissance. The first line
              of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
            </TabItem>
          </Tab>
        </Panel>
      </Dashboard>
    </Fragment>
  );
};

TabInContent.storyName = 'tab in content';
TabInContent.argTypes = {};
