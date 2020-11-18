/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/core';
import { useTheme } from 'emotion-theming';
import { Theme } from '../../theme';
import createStyles from './MemberImage.styles';
import Spinner from '../Spinner/Spinner';
import { useDidMount, useDidUpdate } from '../../utils';

export type MemberImageProps = {
  height?: number | string;
  src?: string;
  width?: number | string;
};

const MemberImage: React.FC<MemberImageProps> = props => {
  const { height = 148, src: _src, width = '100%' } = props;
  const [src, setSrc] = React.useState<string | undefined>(undefined);
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);

  useDidMount(() => {
    loadImage();
  });

  useDidUpdate(() => {
    setSrc(undefined);
    loadImage();
  }, [_src]);

  const loadImage = () => {
    if (_src) {
      let img: HTMLImageElement | null = new Image();
      img.onload = () => {
        setSrc(_src);
      };
      img.src = _src;
      img = null;
    }
  };

  return (
    <div css={styles.container} style={{ height, width }}>
      {src ? <img src={src} /> : <Spinner />}
    </div>
  );
};

export default MemberImage;
