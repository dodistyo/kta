/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useTheme } from 'emotion-theming';
import { Theme } from '../../theme';
import Pagination, { defaultProps as PaginationDefaultProps } from '../Pagination/Pagination';
import { TableProps, DefaultRecordType, PaginationProps } from './Table.types';
import createStyles from './Table.styles';

type Props<RecordType = unknown> = Pick<TableProps<RecordType>, 'data' | 'pagination'>;

const TableFooter = <RecordType extends DefaultRecordType>(props: Props<RecordType>) => {
  const { data, pagination } = props;
  const { perPage = 10, totalData = 10, currentPage, totalPage, ...rest }: PaginationProps = {
    ...PaginationDefaultProps,
    ...pagination,
  };
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);

  const currentTotalData = data ? data.length : 0;
  let text1 = 1;
  let text2 = currentTotalData;
  if (currentPage) {
    text1 = perPage * (currentPage - 1) + 1;
    text2 = text1 + currentTotalData - 1;
  }

  return (
    <div css={styles.footer}>
      <div css={styles.footerRow}>
        <div>
          {currentTotalData > 0
            ? `Menampilkan ${text1}-${text2} dari ${totalData} entri`
            : `Menampilkan ${totalData} entri`}
        </div>
        <div>
          <Pagination {...rest} totalPage={totalPage} currentPage={currentPage} />
        </div>
      </div>
    </div>
  );
};

export default TableFooter;
