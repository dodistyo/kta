// https://fontawesome.com/how-to-use/on-the-web/using-with/react
import React from 'react';
import {
  IconName,
  SizeProp,
  IconLookup,
  IconDefinition,
  library,
  findIconDefinition,
} from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

export type IconProps = Omit<FontAwesomeIconProps, 'children' | 'icon' | 'size'> & {
  name: IconName;
  /**
   * "fas" is for Solid, "far" is for Regular, and "fab" is for Brand.
   * @default 'fas'
   */
  prefix?: 'fas' | 'far' | 'fab';
  /**
   * @default '1x'
   */
  size?: SizeProp;
};

library.add(fas, far, fab);

const Icon: React.FC<IconProps> = props => {
  const { name, prefix = 'fas', size = '1x', ...rest } = props;
  delete rest.children;

  const iconLookup: IconLookup = { prefix, iconName: name };
  const iconDefinition: IconDefinition = findIconDefinition(iconLookup);

  return <FontAwesomeIcon {...rest} icon={iconDefinition} size={size} />;
};

export default Icon;
