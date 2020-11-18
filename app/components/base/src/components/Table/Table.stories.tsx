import React from 'react';
import { ComponentWithStaticMethod } from 'kta-ui-components';
import faker from 'faker/locale/id_ID';
import Button from '../Button/Button';
import Checkbox from '../Checkbox/Checkbox';
import Table, { TableProps } from './Table';

type RecordType = {
  registration_date: string;
  nik: number;
  fullname: string;
  registration_number: string;
  key: string;
};

type CheckboxState = {
  [key: string]: boolean; // checkbox-1, checkbox-2, etc
};

type BasicArgs = Pick<TableProps<RecordType>, 'loading' | 'emptyText'> & {
  scrollX: number;
};

export default { component: Table, title: 'Components / Table' };

const totalData = 100;
const originalData: Array<RecordType> = [];
for (let i = 0; i < totalData; i++) {
  const pastDate = faker.date.past();
  const month =
    String(pastDate.getMonth() + 1).length < 2
      ? `0${String(pastDate.getMonth() + 1)}`
      : String(pastDate.getMonth() + 1);
  const date =
    String(pastDate.getDate()).length < 2
      ? `0${String(pastDate.getDate())}`
      : String(pastDate.getDate());
  const hour =
    String(pastDate.getHours()).length < 2
      ? `0${String(pastDate.getHours())}`
      : String(pastDate.getHours());
  const minute =
    String(pastDate.getMinutes()).length < 2
      ? `0${String(pastDate.getMinutes())}`
      : String(pastDate.getMinutes());
  const second =
    String(pastDate.getSeconds()).length < 2
      ? `0${String(pastDate.getSeconds())}`
      : String(pastDate.getSeconds());
  const registration_date = `${pastDate.getFullYear()}/${month}/${date} ${hour}:${minute}:${second}`;
  const nik = faker.random.number({ min: 1000000000000000, max: 2000000000000000 });
  const fullname = `${faker.name.firstName()} ${faker.name.lastName()}`;
  const registration_number = `${faker.random.number({
    min: 1000,
    max: 9999,
  })}-${faker.random.number({
    min: 1000,
    max: 9999,
  })}-${faker.random.number({
    min: 1000,
    max: 9999,
  })}`;
  originalData.push({ key: `${i + 1}`, registration_date, nik, fullname, registration_number });
}

const initialCheckboxState: CheckboxState = {};
for (const key in originalData) {
  initialCheckboxState[`checkbox-${originalData[key].key}`] = false;
}

export const Basic: ComponentWithStaticMethod<BasicArgs> = args => {
  const { loading, scrollX } = args;
  const [data, setData] = React.useState(originalData);
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [checkboxState, setCheckboxState] = React.useState<CheckboxState>(initialCheckboxState);

  const perPage = 10;
  const totalPage = Math.ceil(data.length / perPage);
  const paginatedData = data.slice((currentPage - 1) * perPage, currentPage * perPage);

  const handleHeadCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.currentTarget;
    const newState: CheckboxState = {};
    for (const key in checkboxState) {
      newState[key] = checked;
    }
    setCheckboxState(newState);
  };

  const handleBodyCheckboxChange = (record: RecordType) => (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { checked } = e.currentTarget;
    setCheckboxState(prevState => ({
      ...prevState,
      [`checkbox-${record.key}`]: checked,
    }));
  };

  const handlePageChange = (pageNum: number) => {
    setCurrentPage(pageNum);
  };

  const columns: TableProps<RecordType>['columns'] = [
    {
      title: <Checkbox onChange={handleHeadCheckboxChange} />,
      dataIndex: '',
      key: 'checkbox',
      width: 40,
      render: (value, record) => {
        return (
          <Checkbox
            checked={checkboxState[`checkbox-${record.key}`]}
            onChange={handleBodyCheckboxChange(record)}
          />
        );
      },
    },
    {
      title: 'Tanggal Registrasi',
      dataIndex: 'registration_date',
      key: 'registration_date',
      width: '16%',
    },
    {
      title: 'NIK',
      sort: true,
      onSortChange: direction => {
        const sortedData = [...data].sort((a, b) =>
          direction === 'asc' ? a.nik - b.nik : b.nik - a.nik,
        );
        setData(direction !== undefined ? sortedData : originalData);
      },
      dataIndex: 'nik',
      key: 'nik',
      width: '16%',
    },
    {
      title: 'Nama Lengkap',
      sort: true,
      onSortChange: direction => {
        const sortedData = [...data].sort((a, b) => {
          if (direction === 'asc') {
            return a.fullname > b.fullname ? 1 : -1;
          }
          return a.fullname > b.fullname ? -1 : 1;
        });
        setData(direction !== undefined ? sortedData : originalData);
      },
      dataIndex: 'fullname',
      key: 'fullname',
      width: '18%',
    },
    {
      title: 'Kode Registrasi',
      dataIndex: 'registration_number',
      key: 'registration_number',
      width: '14%',
    },
    {
      title: 'Tindakan',
      dataIndex: '',
      key: 'action',
      render: () => (
        <div>
          <Button size="sm" icon={{ name: 'address-card' }}>
            Lihat
          </Button>
          <Button size="sm" variant="success" icon={{ name: 'check-circle' }}>
            Validasi
          </Button>
          <Button size="sm" variant="destructive" icon={{ name: 'trash-alt' }}>
            Hapus
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Table<RecordType>
      columns={columns}
      data={paginatedData}
      loading={loading}
      scroll={{ x: scrollX }}
      pagination={{
        onPageChange: handlePageChange,
        currentPage,
        perPage,
        totalData,
        totalPage,
      }}
    />
  );
};

Basic.storyName = 'basic';
Basic.argTypes = {
  emptyText: {
    name: 'emptyText',
    defaultValue: 'Tidak ada data',
    table: {
      type: { summary: 'react node' },
      defaultValue: { summary: '"Tidak ada data"' },
    },
    control: { type: 'text' },
  },
  loading: {
    name: 'loading',
    defaultValue: false,
    table: {
      type: { summary: 'boolean' },
      defaultValue: { summary: false },
    },
    control: { type: 'boolean' },
  },
  scrollX: {
    name: 'scroll.x',
    defaultValue: undefined,
    table: {
      type: { summary: 'number' },
      defaultValue: { summary: 'undefined' },
    },
    control: { type: 'number', min: 0 },
  },
};
