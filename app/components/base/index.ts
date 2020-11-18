import React from 'react';
import globalStyles from './src/globalStyles';
import theme, { Theme as ThemeBase } from './src/theme';
import styled from './src/styled';

// Components
import Button, { ButtonProps as ButtonPropsBase } from './src/components/Button/Button';
import Container, { ContainerProps as ContainerPropsBase } from './src/components/Grid/Container';
import Row, { RowProps as RowPropsBase } from './src/components/Grid/Row';
import Column, { ColumnProps as ColumnPropsBase } from './src/components/Grid/Column';
import Icon, { IconProps as IconPropsBase } from './src/components/Icon/Icon';
import Spinner, { SpinnerProps as SpinnerPropsBase } from './src/components/Spinner/Spinner';
import Input, { InputProps as InputPropsBase } from './src/components/Input/Input';
import InputMask, {
  InputMaskProps as InputMaskPropsBase,
} from './src/components/InputMask/InputMask';
import Textarea, { TextareaProps as TextareaPropsBase } from './src/components/Textarea/Textarea';
import Tooltip from './src/components/Tooltip/Tooltip';
import Label, { LabelProps as LabelPropsBase } from './src/components/Label/Label';
import Delay from './src/components/Delay/Delay';
import Dropdown, { DropdownProps as DropdownPropsBase } from './src/components/Dropdown/Dropdown';
import DropdownToggle, {
  DropdownToggleInjectedProps as DropdownToggleInjectedPropsBase,
  DropdownToggleProps as DropdownTogglePropsBase,
} from './src/components/Dropdown/DropdownToggle';
import DropdownMenu from './src/components/Dropdown/DropdownMenu';
import DropdownItem, {
  DropdownItemInjectedProps as DropdownItemInjectedPropsBase,
  DropdownItemProps as DropdownItemPropsBase,
} from './src/components/Dropdown/DropdownItem';
import Panel, { PanelProps as PanelPropsBase } from './src/components/Panel/Panel';
import FormGroup, {
  FormGroupProps as FormGroupPropsBase,
} from './src/components/FormGroup/FormGroup';
import LeafletMap from './src/components/LeafletMap/LeafletMap';
import LeafletMapDisplay, {
  LeafletMapDisplayProps as LeafletMapDisplayPropsBase,
} from './src/components/LeafletMapDisplay/LeafletMapDisplay';
import LeafletMapPicker, {
  LeafletMapPickerProps as LeafletMapPickerPropsBase,
} from './src/components/LeafletMapPicker/LeafletMapPicker';
import UploadBox, {
  UploadBoxProps as UploadBoxPropsBase,
  UploadBoxOnChangeType as UploadBoxOnChangeTypeBase,
} from './src/components/UploadBox/UploadBox';
import Checkbox, { CheckboxProps as CheckboxPropsBase } from './src/components/Checkbox/Checkbox';
import FormErrorMessage, {
  FormErrorMessageProps as FormErrorMessagePropsBase,
} from './src/components/FormErrorMessage/FormErrorMessage';
import Select, {
  SelectProps as SelectPropsBase,
  SelectOptionTypeBase,
} from './src/components/Select/Select';
import Modal from './src/components/Modal/Modal';
import ModalHeader, {
  ModalHeaderProps as ModalHeaderPropsBase,
} from './src/components/Modal/ModalHeader';
import ModalBody, { ModalBodyProps as ModalBodyPropsBase } from './src/components/Modal/ModalBody';
import ModalFooter, {
  ModalFooterProps as ModalFooterPropsBase,
} from './src/components/Modal/ModalFooter';
import Dashboard, {
  DashboardProps as DashboardPropsBase,
} from './src/components/Dashboard/Dashboard';
import Table, { TableProps as TablePropsBase } from './src/components/Table/Table';
import QRCode, { QRCodeProps as QRCodePropsBase } from './src/components/QRCode/QRCode';
import NotificationContainer from './src/components/Notification/NotificationContainer';
import NotificationManager from './src/components/Notification/NotificationManager';
import Pagination from './src/components/Pagination/Pagination';
import Widget from './src/components/Widget/Widget';
import Tab, { TabProps as TabPropsBase } from './src/components/Tab/Tab';
import TabItem, { TabItemProps as TabItemPropsBase } from './src/components/Tab/TabItem';
import MemberImage, {
  MemberImageProps as MemberImagePropsBase,
} from './src/components/MemberImage/MemberImage';

// Types
export type Theme = ThemeBase;
export type ButtonProps = ButtonPropsBase;
export type ContainerProps = ContainerPropsBase;
export type RowProps = RowPropsBase;
export type ColumnProps = ColumnPropsBase;
export type IconProps = IconPropsBase;
export type SpinnerProps = SpinnerPropsBase;
export type InputProps = InputPropsBase;
export type InputMaskProps = InputMaskPropsBase;
export type TextareaProps = TextareaPropsBase;
export type TooltipProps = JSX.LibraryManagedAttributes<
  typeof Tooltip,
  React.ComponentProps<typeof Tooltip>
>;
export type LabelProps = LabelPropsBase;
export type DelayProps = JSX.LibraryManagedAttributes<
  typeof Delay,
  React.ComponentProps<typeof Delay>
>;
export type DropdownProps = DropdownPropsBase;
export type DropdownToggleInjectedProps = DropdownToggleInjectedPropsBase;
export type DropdownToggleProps = DropdownTogglePropsBase;
export type DropdownMenuProps = JSX.LibraryManagedAttributes<
  typeof DropdownMenu,
  React.ComponentProps<typeof DropdownMenu>
>;
export type DropdownItemInjectedProps = DropdownItemInjectedPropsBase;
export type DropdownItemProps = DropdownItemPropsBase;
export type PanelProps = PanelPropsBase;
export type FormGroupProps = FormGroupPropsBase;
export type LeafletMapProps = JSX.LibraryManagedAttributes<
  typeof LeafletMap,
  React.ComponentProps<typeof LeafletMap>
>;
export type LeafletMapDisplayProps = LeafletMapDisplayPropsBase;
export type LeafletMapPickerProps = LeafletMapPickerPropsBase;
export type UploadBoxProps = UploadBoxPropsBase;
export type UploadBoxOnChangeType = UploadBoxOnChangeTypeBase;
export type CheckboxProps = CheckboxPropsBase;
export type FormErrorMessageProps = FormErrorMessagePropsBase;
export type SelectProps<T = SelectOptionTypeBase> = SelectPropsBase<T>;
export type ModalProps = JSX.LibraryManagedAttributes<
  typeof Modal,
  React.ComponentProps<typeof Modal>
>;
export type ModalBodyProps = ModalBodyPropsBase;
export type ModalHeaderProps = ModalHeaderPropsBase;
export type ModalFooterProps = ModalFooterPropsBase;
export type DashboardProps = DashboardPropsBase;
export type TableProps<RecordType = unknown> = TablePropsBase<RecordType>;
export type QRCodeProps = QRCodePropsBase;
export type PaginationProps = JSX.LibraryManagedAttributes<
  typeof Pagination,
  React.ComponentProps<typeof Pagination>
>;
import { WidgetTotalDataProps as WidgetTotalDataPropsBase } from './src/components/Widget/WidgetTotalData';
import { WidgetAgeDistributionProps as WidgetAgeDistributionPropsBase } from './src/components/Widget/WidgetAgeDistribution';
import { WidgetDomicileDistributionProps as WidgetDomicileDistributionPropsBase } from './src/components/Widget/WidgetDomicileDistribution';
import { WidgetGenderRatioProps as WidgetGenderRatioPropsBase } from './src/components/Widget/WidgetGenderRatio';

export type WidgetTotalDataProps = WidgetTotalDataPropsBase;
export type WidgetAgeDistributionProps = WidgetAgeDistributionPropsBase;
export type WidgetDomicileDistributionProps = WidgetDomicileDistributionPropsBase;
export type WidgetGenderRatioProps = WidgetGenderRatioPropsBase;
export type TabProps = TabPropsBase;
export type TabItemProps = TabItemPropsBase;
export type MemberImageProps = MemberImagePropsBase;

export {
  globalStyles,
  theme,
  styled,
  Button,
  Checkbox,
  Column,
  Container,
  Dashboard,
  Delay,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  FormErrorMessage,
  FormGroup,
  Icon,
  Input,
  InputMask,
  Label,
  LeafletMap,
  LeafletMapDisplay,
  LeafletMapPicker,
  MemberImage,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  NotificationContainer,
  NotificationManager,
  Pagination,
  Panel,
  QRCode,
  Row,
  Select,
  Spinner,
  Tab,
  TabItem,
  Table,
  Textarea,
  Tooltip,
  UploadBox,
  Widget,
};
