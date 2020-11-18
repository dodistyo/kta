/* eslint-disable no-console */
import React from 'react';
import { ComponentWithStaticMethod, NoUndefinedField } from 'kta-ui-components';
import { action } from '@storybook/addon-actions';
import faker from 'faker/locale/id_ID';
import Button from '../Button/Button';
import Modal from './Modal';
import ModalBody from './ModalBody';
import ModalHeader from './ModalHeader';
import ModalFooter from './ModalFooter';

export type ModalProps = JSX.LibraryManagedAttributes<
  typeof Modal,
  React.ComponentProps<typeof Modal>
>;

type StoryArgs = Pick<
  ModalProps,
  'backdrop' | 'centered' | 'keyboard' | 'returnFocusAfterClose' | 'scrollable' | 'size'
>;
type RequiredModalProps = NoUndefinedField<StoryArgs>;

export default { component: Modal, title: 'Components / Modal' };

const paragraphs: string[] = [];
const paragraphsLength = 30;
for (let index = 0; index < paragraphsLength; index++) {
  const paragraph = faker.lorem.paragraph();
  paragraphs.push(paragraph);
}

export const Basic: ComponentWithStaticMethod<StoryArgs> = args => {
  const [open, setOpen] = React.useState(true);

  const toggle = () => {
    setOpen(prevOpen => !prevOpen);
  };

  return (
    <div>
      <Button onClick={toggle}>Launch Modal</Button>

      <Modal
        {...args}
        open={open}
        onEnter={action('onEnter')}
        onEntered={action('onEntered')}
        onExit={action('onExit')}
        onExited={action('onExited')}
        toggle={toggle}
      >
        <ModalHeader onClose={toggle}>Modal Header</ModalHeader>
        <ModalBody>
          Modals are built with HTML, CSS, and JavaScript. They’re positioned over everything else
          in the document and remove scroll from the {'<body>'} so that modal content scrolls
          instead.
        </ModalBody>
        <ModalFooter>
          <Button onClick={toggle}>Close</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

const backdropOptions: { [key: string]: RequiredModalProps['backdrop'] } = {
  true: true,
  false: false,
  static: 'static',
};

const sizeOptions: { [key in RequiredModalProps['size']]: RequiredModalProps['size'] } = {
  sm: 'sm',
  md: 'md',
  lg: 'lg',
  xl: 'xl',
};

Basic.storyName = 'basic';
Basic.argTypes = {
  backdrop: {
    name: 'backdrop',
    defaultValue: true,
    table: {
      type: { summary: 'enum' },
      defaultValue: { summary: true },
    },
    control: { type: 'select', options: backdropOptions },
  },
  centered: {
    name: 'centered',
    defaultValue: true,
    table: {
      type: { summary: 'boolean' },
      defaultValue: { summary: true },
    },
    control: { type: 'boolean' },
  },
  keyboard: {
    name: 'keyboard',
    defaultValue: true,
    table: {
      type: { summary: 'boolean' },
      defaultValue: { summary: true },
    },
    control: { type: 'boolean' },
  },
  returnFocusAfterClose: {
    name: 'returnFocusAfterClose',
    defaultValue: true,
    table: {
      type: { summary: 'boolean' },
      defaultValue: { summary: true },
    },
    control: { type: 'boolean' },
  },
  scrollable: {
    name: 'scrollable',
    defaultValue: false,
    table: {
      type: { summary: 'boolean' },
      defaultValue: { summary: false },
    },
    control: { type: 'boolean' },
  },
  size: {
    name: 'size',
    defaultValue: 'md',
    table: {
      type: { summary: 'enum' },
      defaultValue: { summary: '"md"' },
    },
    control: { type: 'select', options: sizeOptions },
  },
};

export const LongContent: ComponentWithStaticMethod<StoryArgs> = args => {
  const [open, setOpen] = React.useState(true);

  const toggle = () => {
    setOpen(prevOpen => !prevOpen);
  };

  return (
    <div>
      <Button onClick={toggle}>Launch Modal</Button>

      <Modal
        {...args}
        open={open}
        onEnter={action('onEnter')}
        onEntered={action('onEntered')}
        onExit={action('onExit')}
        onExited={action('onExited')}
        toggle={toggle}
      >
        <ModalBody>
          {paragraphs.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </ModalBody>
        <ModalFooter>
          <Button onClick={toggle}>Close</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

LongContent.storyName = 'long content';
LongContent.argTypes = Basic.argTypes;

export const ModalInsideModal: ComponentWithStaticMethod<StoryArgs> = () => {
  const [openFirstModal, setOpenFirstModal] = React.useState(false);
  const [openSecondModal, setOpenSecondModal] = React.useState(false);

  const toggleFirstModal = () => {
    setOpenFirstModal(prevOpen => !prevOpen);
  };

  const toggleSecondModal = () => {
    setOpenSecondModal(prevOpen => !prevOpen);
  };

  return (
    <div>
      <Button onClick={toggleFirstModal}>Launch First Modal</Button>
      <br />
      <br />

      {paragraphs.map((paragraph, i) => (
        <p key={i}>{paragraph}</p>
      ))}

      <Modal
        open={openFirstModal}
        onEnter={action('onEnter')}
        onEntered={action('onEntered')}
        onExit={action('onExit')}
        onExited={action('onExited')}
        toggle={toggleFirstModal}
      >
        <ModalHeader onClose={toggleFirstModal}>Modal Header</ModalHeader>
        <ModalBody>
          <p>First modal</p>
          <Button onClick={toggleSecondModal}>Launch Second Modal</Button>

          <Modal
            open={openSecondModal}
            onEnter={action('onEnter')}
            onEntered={action('onEntered')}
            onExit={action('onExit')}
            onExited={action('onExited')}
            toggle={toggleSecondModal}
          >
            <ModalHeader onClose={toggleSecondModal}>Modal Header</ModalHeader>
            <ModalBody>Second modal</ModalBody>
            <ModalFooter>
              <Button onClick={toggleSecondModal}>Close</Button>
            </ModalFooter>
          </Modal>
        </ModalBody>
        <ModalFooter>
          <Button onClick={toggleFirstModal}>Close</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

ModalInsideModal.storyName = 'modal inside modal';
ModalInsideModal.argTypes = {};
