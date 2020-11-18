import Pagination from '../Pagination/Pagination';

export type DefaultRecordType = Record<string, unknown>;

export type PaginationProps = JSX.LibraryManagedAttributes<
  typeof Pagination,
  React.ComponentProps<typeof Pagination>
> & {
  perPage?: number;
  totalData?: number;
};

export type Column<RecordType> = {
  dataIndex?: string;
  key: string;
  onSortChange?: (direction: 'asc' | 'desc' | undefined) => void;
  render?: (value: React.ReactNode, record: RecordType) => React.ReactNode;
  sort?: boolean;
  title?: React.ReactNode;
  width?: string | number;
};

export type State = {
  column: string | number | undefined;
  direction: 'asc' | 'desc' | undefined;
};

export type TableProps<RecordType = unknown> = {
  columns?: Array<Column<RecordType>>;
  data?: Array<RecordType>;
  /** @default "Tidak ada data" */
  emptyText?: React.ReactNode;
  layout?: 'fixed' | 'auto';
  loading?: boolean;
  pagination?: PaginationProps;
  scroll?: { x?: number };
};
