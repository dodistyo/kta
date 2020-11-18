/** @jsx jsx */
import React, { Fragment } from 'react';
import { jsx } from '@emotion/core';
import { useTheme } from 'emotion-theming';
import { Theme } from '../../theme';
import { IconName } from '@fortawesome/fontawesome-svg-core';
import Dropdown from '../Dropdown/Dropdown';
import DropdownToggle, { DropdownToggleInjectedProps } from '../Dropdown/DropdownToggle';
import DropdownMenu from '../Dropdown/DropdownMenu';
import DropdownItem from '../Dropdown/DropdownItem';
import Icon from '../Icon/Icon';
import { eventName } from '../Modal/Modal';
import createStyles from './Dashboard.styles';
import logo from '../../img/logo.svg';
import withTheme from '../../utils/withTheme';

type State = {
  scrollbarWidth: number;
  documentWidth: number;
};

export type HeaderProps = {
  brandLabel?: React.ReactNode;
  brandUrl?: string;
  brandOnClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  dropdownMenu?: Array<{
    label: string;
    icon?: IconName;
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  }>;
  theme: Theme;
  userEmail?: string;
};

const CustomDropdownToggle = React.forwardRef<HTMLDivElement, DropdownToggleInjectedProps>(
  (props, ref) => {
    const { children, iconName } = props;
    const theme = useTheme<Theme>();
    const styles = createStyles(theme);

    return (
      <div ref={ref} css={styles.navbarNav}>
        <span>{children}</span>
        <Icon name={iconName} />
      </div>
    );
  },
);

class Header extends React.Component<HeaderProps, State> {
  state: State = {
    scrollbarWidth: 0,
    documentWidth: 0,
  };

  componentDidMount() {
    this.setState({
      documentWidth: document.body.clientWidth,
    });
    window.addEventListener(eventName, this.handleModalShowChange as EventListener);
  }

  componentWillUnmount() {
    window.removeEventListener(eventName, this.handleModalShowChange as EventListener);
  }

  handleModalShowChange = (e: CustomEvent) => {
    if (e.type === eventName) {
      this.setState({
        scrollbarWidth: e.detail,
        documentWidth: document.body.clientWidth,
      });
    }
  };

  renderMenu() {
    const { dropdownMenu, theme } = this.props;
    const styles = createStyles(theme);

    if (dropdownMenu && dropdownMenu.length > 0) {
      return dropdownMenu.map((item, index) => (
        <DropdownItem
          key={index}
          css={!!item.icon && styles.dropdownItemHasIcon}
          onClick={item.onClick}
        >
          {item.icon && <Icon name={item.icon} />}
          <span>{item.label}</span>
        </DropdownItem>
      ));
    }
    return null;
  }

  render() {
    const {
      brandLabel = (
        <Fragment>
          Admin Dasbor KTA
          <br />
          Partai Keadilan Sejahtera
        </Fragment>
      ),
      brandUrl,
      brandOnClick,
      theme,
      userEmail = 'user@pks.id',
    } = this.props;
    const { documentWidth, scrollbarWidth } = this.state;
    const styles = createStyles(theme);

    let headerLineLeftWidth;
    let headerLineRightWidth;
    if (scrollbarWidth > 0) {
      headerLineLeftWidth = documentWidth * 0.7;
      headerLineRightWidth = documentWidth * 0.3 + scrollbarWidth;
    }

    return (
      <Fragment>
        <div
          css={styles.header}
          style={{ paddingRight: scrollbarWidth > 0 ? scrollbarWidth : undefined }}
        >
          <div css={styles.navbar}>
            <a css={styles.navbarBrand} href={brandUrl} onClick={brandOnClick}>
              <img src={logo} alt="Logo" />
              {brandLabel}
            </a>
            <Dropdown menu={{ elevation: 'float', placement: 'bottom-end' }}>
              <DropdownToggle component={CustomDropdownToggle}>{userEmail}</DropdownToggle>
              <DropdownMenu>{this.renderMenu()}</DropdownMenu>
            </Dropdown>
          </div>
        </div>
        <div css={styles.headerLine}>
          <div
            css={styles.headerLineLeft}
            style={{
              width: headerLineLeftWidth,
            }}
          />
          <div
            css={styles.headerLineRight}
            style={{
              width: headerLineRightWidth,
            }}
          />
        </div>
      </Fragment>
    );
  }
}

export default withTheme(Header);
