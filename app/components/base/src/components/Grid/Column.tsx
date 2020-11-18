/** @jsx jsx */
import React from 'react';
import { css, jsx } from '@emotion/core';
import { useTheme } from 'emotion-theming';
import { Theme } from '../../theme';
import GridContext, { GridContextValue } from './GridContext';

export type ColumnProps = React.HTMLAttributes<HTMLDivElement> & {
  /**
   * Column width order: [xs, sm, md, lg, xl]
   * @example <Column col={[12, 6]} />
   * @default []
   */
  col?: number[];
  width?: number;
};

export type ColumnRef = HTMLDivElement;

const Column = React.forwardRef<ColumnRef, ColumnProps>((props, ref) => {
  const theme = useTheme<Theme>();
  const { col = [], width, ...rest } = props;

  return (
    <GridContext.Consumer>
      {({ gutter }: GridContextValue) => {
        let styles = css`
          position: relative;
          flex-basis: 0;
          flex-grow: 1;
          min-width: 1px;
          padding-left: ${gutter ? theme.grid.gutter / 2 : 0}px;
          padding-right: ${gutter ? theme.grid.gutter / 2 : 0}px;
        `;

        if (width) {
          styles = css`
            ${styles};
            flex: 0 0 ${width}px;
            max-width: ${width}px;
          `;
        } else {
          styles = css`
            ${styles};
            ${theme.mq({
              flex: col.map(c => `0 0 ${100 * (c / theme.grid.column)}%`),
              maxWidth: col.map(c => `${100 * (c / theme.grid.column)}%`),
            })}
          `;
        }

        return <div {...rest} ref={ref} css={styles} />;
      }}
    </GridContext.Consumer>
  );
});

export default Column;
