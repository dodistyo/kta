import React from 'react';
import { ComponentWithStaticMethod, NoUndefinedField } from 'kta-ui-components';
import Icon from '../Icon/Icon';
import Panel from '../Panel/Panel';
import Tab, { TabProps } from './Tab';
import TabItem from './TabItem';

type RequiredTabProps = NoUndefinedField<TabProps>;
type Args = Pick<RequiredTabProps, 'activeTab' | 'menuSize'>;

export default { component: Tab, title: 'Components / Tab' };

const menuSizeOptions: {
  [key in RequiredTabProps['menuSize']]: RequiredTabProps['menuSize'];
} = {
  even: 'even',
  minimum: 'minimum',
};

export const Basic: ComponentWithStaticMethod<Args> = args => {
  const { activeTab: _activeTab, ...rest } = args;
  const [activeTab, setActiveTab] = React.useState<number>(_activeTab);

  React.useEffect(() => {
    setActiveTab(_activeTab);
  }, [_activeTab]);

  const handleActiveTabChange = (index: number) => {
    setActiveTab(index);
  };

  return (
    <Tab {...rest} activeTab={activeTab} onActiveTabChange={handleActiveTabChange}>
      <TabItem
        title={
          <span>
            <Icon name="users" />
            &nbsp;&nbsp;Pengguna
          </span>
        }
      >
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
        been the industry's standard dummy text ever since the 1500s, when an unknown printer took a
        galley of type and scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
        It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum
        passages, and more recently with desktop publishing software like Aldus PageMaker including
        versions of Lorem Ipsum.
      </TabItem>
      <TabItem
        title={
          <span>
            <Icon name="address-card" />
            &nbsp;&nbsp;Desain Kartu
          </span>
        }
      >
        It is a long established fact that a reader will be distracted by the readable content of a
        page when looking at its layout. The point of using Lorem Ipsum is that it has a
        more-or-less normal distribution of letters, as opposed to using 'Content here, content
        here', making it look like readable English. Many desktop publishing packages and web page
        editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will
        uncover many web sites still in their infancy. Various versions have evolved over the years,
        sometimes by accident, sometimes on purpose (injected humour and the like).
      </TabItem>
      <TabItem
        title={
          <span>
            <Icon name="key" />
            &nbsp;&nbsp;Lisensi
          </span>
        }
      >
        Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece
        of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock,
        a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure
        Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the
        word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from
        sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and
        Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very
        popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit
        amet..", comes from a line in section 1.10.32.
      </TabItem>
    </Tab>
  );
};

Basic.storyName = 'basic';
Basic.argTypes = {
  activeTab: {
    name: 'activeTab',
    defaultValue: 1,
    table: {
      type: { summary: 'number' },
      defaultValue: { summary: 1 },
    },
    control: { type: 'number', min: 1, max: 3 },
  },
  menuSize: {
    name: 'menuSize',
    defaultValue: 'minimum',
    table: {
      type: { summary: 'enum' },
      defaultValue: { summary: '"minimum"' },
    },
    control: { type: 'select', options: menuSizeOptions },
  },
};

export const InsidePanel: ComponentWithStaticMethod<Args> = args => {
  return (
    <Panel elevation="container" style={{ padding: 0 }}>
      {Basic(args)}
    </Panel>
  );
};

InsidePanel.storyName = 'inside panel';
InsidePanel.argTypes = Basic.argTypes;
