import React from 'react';
import { NoUndefinedField, ComponentWithStaticMethod } from 'kta-ui-components';
import Container, { ContainerProps } from './Container';
import Row, { RowProps } from './Row';
import Column from './Column';

type RequiredContainerProps = NoUndefinedField<ContainerProps>;
type RequiredRowProps = NoUndefinedField<RowProps>;

type Fluid = RequiredContainerProps['fluid'];
type HorizontalAlign = RequiredRowProps['horizontalAlign'];
type VerticalAlign = RequiredRowProps['verticalAlign'];
type Gutter = RequiredRowProps['gutter'];

type BasicArgs = {
  fluid: Fluid;
  horizontalAlign: HorizontalAlign;
  verticalAlign: VerticalAlign;
  gutter: Gutter;
};

export default {
  title: 'Components / Grid',
  subcomponents: [Container, Row, Column],
};

const horizontalAlignOptions: { [key in RequiredRowProps['horizontalAlign']]: HorizontalAlign } = {
  around: 'around',
  between: 'between',
  center: 'center',
  left: 'left',
  right: 'right',
};

const verticalAlignOptions: { [key in VerticalAlign]: VerticalAlign } = {
  baseline: 'baseline',
  bottom: 'bottom',
  middle: 'middle',
  top: 'top',
};

export const Basic: ComponentWithStaticMethod<BasicArgs> = args => {
  const { fluid, horizontalAlign, verticalAlign, gutter } = args;

  return (
    <Container fluid={fluid}>
      <h3>Container + Row + Column</h3>
      <Row horizontalAlign={horizontalAlign} verticalAlign={verticalAlign} gutter={gutter}>
        <Column col={[12, 6, 6, 4, 3]}>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
            has been the industry's standard dummy text ever <i>since the 1500s</i>, when an unknown
            printer took a galley of type and scrambled it to make a type specimen book.
            <br />
          </p>
        </Column>
        <Column col={[12, 6, 6, 4, 3]}>
          <p>
            It has survived not only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged.
          </p>
        </Column>
        <Column col={[12, 6, 6, 4, 3]}>
          <p>
            It was popularised in the 1960s with the release of Letraset sheets containing Lorem
            Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker
            including versions of Lorem Ipsum.
          </p>
        </Column>
        <Column col={[12, 6, 6, 4, 3]}>
          <p>
            Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a
            piece of classical Latin literature from 45 BC, making it over 2000 years old.
          </p>
        </Column>
      </Row>
    </Container>
  );
};

Basic.storyName = 'basic';
Basic.argTypes = {
  fluid: {
    name: 'fluid',
    defaultValue: false,
    description: '&lt;Container&gt; props',
    table: {
      type: { summary: 'boolean' },
      defaultValue: { summary: false },
    },
    control: { type: 'boolean' },
  },
  horizontalAlign: {
    name: 'horizontalAlign',
    defaultValue: 'left',
    description: '&lt;Row&gt; props',
    table: {
      type: { summary: 'enum' },
    },
    control: { type: 'select', options: horizontalAlignOptions },
  },
  verticalAlign: {
    name: 'verticalAlign',
    defaultValue: 'baseline',
    description: '&lt;Row&gt; props',
    table: {
      type: { summary: 'enum' },
    },
    control: { type: 'select', options: verticalAlignOptions },
  },
  gutter: {
    name: 'gutter',
    defaultValue: true,
    description: '&lt;Row&gt; props',
    table: {
      type: { summary: 'boolean' },
      defaultValue: { summary: true },
    },
    control: { type: 'boolean' },
  },
};
