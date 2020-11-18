/* eslint-disable no-console */
import React from 'react';
import { ComponentWithStaticMethod } from 'kta-ui-components';
import faker from 'faker/locale/id_ID';
import Select, { SelectProps } from './Select';

type Option = {
  value: number;
  label: string;
};

type BasicArgs = Partial<SelectProps<Option>>;

export default { component: Select, title: 'Components / Select' };

const options = Array.from({ length: 100 }, (_, i) => {
  const country = faker.address.country();
  return { value: i + 1, label: country };
})
  .filter((item, index, self) => index === self.findIndex(t => t.label === item.label))
  .sort((a, b) => {
    if (a.label < b.label) {
      return -1;
    }
    if (a.label > b.label) {
      return 1;
    }
    return 0;
  });

export const Basic: ComponentWithStaticMethod<BasicArgs> = args => {
  const ref = React.useRef(null);
  const innerRef = React.useRef(null);

  React.useEffect(() => {
    console.log('select ref', ref);
    console.log('select innerRef', innerRef);
  }, []);

  return (
    <div>
      <p>
        See{' '}
        <a href="https://react-select.com" target="_blank" rel="noreferrer">
          React Select
        </a>{' '}
        website for complete documentation
      </p>
      <Select<Option> {...args} ref={ref} innerRef={innerRef} options={options} />
    </div>
  );
};

Basic.storyName = 'basic';
Basic.argTypes = {
  description: {
    name: 'description',
    defaultValue: 'Example description',
    table: {
      type: { summary: 'react node' },
    },
    control: { type: 'text' },
  },
  disabled: {
    name: 'disabled',
    defaultValue: false,
    table: {
      type: { summary: 'boolean' },
      defaultValue: { summary: false },
    },
    control: { type: 'boolean' },
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
};

export const ErrorState: ComponentWithStaticMethod<BasicArgs> = () => {
  return (
    <Select
      options={options}
      description="Example description"
      errorMessage="Example error message"
    />
  );
};

ErrorState.storyName = 'error state';
