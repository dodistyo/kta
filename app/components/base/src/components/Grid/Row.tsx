/** @jsx jsx */
import React, { forwardRef } from 'react';
import { css, jsx } from '@emotion/core';
import { useTheme } from 'emotion-theming';
import { Theme } from '../../theme';
import GridContext, { GridContextValue } from './GridContext';

export type HorizontalAlign = 'left' | 'right' | 'center' | 'around' | 'between';
export type VerticalAlign = 'baseline' | 'top' | 'middle' | 'bottom';

export type RowProps = React.HTMLAttributes<HTMLDivElement> &
  GridContextValue & {
    horizontalAlign?: HorizontalAlign;
    verticalAlign?: VerticalAlign;
  };
export type RowRef = HTMLDivElement;

const horizontalAlignMap: { [key in HorizontalAlign]: string } = {
  left: 'flex-start',
  right: 'flex-end',
  center: 'center',
  around: 'space-around',
  between: 'space-between',
};

const verticalAlignMap: { [key in VerticalAlign]: string } = {
  baseline: 'baseline',
  top: 'flex-start',
  middle: 'center',
  bottom: 'flex-end',
};

const Row = forwardRef<RowRef, RowProps>((props, ref) => {
  const theme = useTheme<Theme>();
  const { children, horizontalAlign, gutter = true, verticalAlign, ...rest } = props;
  const styles = css`
    display: flex;
    flex-wrap: wrap;
    margin-left: ${gutter ? -1 * (theme.grid.gutter / 2) : 0}px;
    margin-right: ${gutter ? -1 * (theme.grid.gutter / 2) : 0}px;
    justify-content: ${horizontalAlign ? horizontalAlignMap[horizontalAlign] : undefined};
    align-items: ${verticalAlign ? verticalAlignMap[verticalAlign] : undefined};
  `;

  return (
    <div {...rest} ref={ref} css={styles}>
      <GridContext.Provider value={{ gutter }}>{children}</GridContext.Provider>
    </div>
  );
});

export default Row;
