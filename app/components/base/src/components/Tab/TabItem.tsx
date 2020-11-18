import React from 'react';

export type TabItemProps = {
  children?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  title: React.ReactNode;
};

const TabItem: React.FC<TabItemProps> = () => {
  return null;
};

export default TabItem;
