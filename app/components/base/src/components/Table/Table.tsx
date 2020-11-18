/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/core';
import { useTheme } from 'emotion-theming';
import { Theme } from '../../theme';
import { CSSTransition } from 'react-transition-group';
import Spinner from '../Spinner/Spinner';
import { TableProps as TablePropsBase, DefaultRecordType } from './Table.types';
import TableColgroup from './TableColgroup';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import TableFooter from './TableFooter';
import createStyles from './Table.styles';

export type TableProps<RecordType = unknown> = TablePropsBase<RecordType>;

const Table = <RecordType extends DefaultRecordType>(props: TableProps<RecordType>) => {
  const {
    columns,
    data,
    emptyText = 'Tidak ada data',
    layout = 'auto',
    loading = false,
    pagination,
    scroll,
  } = props;
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);

  const contentStyle: React.CSSProperties = {};
  if (scroll && scroll.x) {
    contentStyle.overflow = 'auto hidden';
  }

  const tableStyle: React.CSSProperties = { tableLayout: layout };
  if (scroll && scroll.x) {
    tableStyle.width = scroll.x;
    tableStyle.minWidth = '100%';
  }

  return (
    <div css={styles.wrapper}>
      <div css={styles.container}>
        {/* Content */}
        <div style={contentStyle}>
          <table css={styles.table} style={tableStyle}>
            <TableColgroup<RecordType> columns={columns} />
            <TableHeader<RecordType> columns={columns} />
            <TableBody<RecordType> columns={columns} data={data} emptyText={emptyText} />
          </table>
        </div>
        {/* Footer */}
        <TableFooter<RecordType> data={data} pagination={pagination} />
        {/* Loading */}
        <CSSTransition timeout={theme.animation.timing.express} in={loading} unmountOnExit>
          <div css={styles.loadingBox}>
            <Spinner size="lg" />
          </div>
        </CSSTransition>
      </div>
    </div>
  );
};

export default Table;
