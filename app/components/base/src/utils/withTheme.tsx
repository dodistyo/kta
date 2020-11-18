import React from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import { ThemeContext } from '@emotion/core';
import { Theme } from '../theme';

interface WithThemeProps {
  theme: Theme;
}

// https://github.com/typescript-cheatsheets/react/issues/86#issuecomment-464714146
function withTheme<
  C extends React.ComponentType<React.ComponentProps<C> & WithThemeProps>,
  ResolvedProps = JSX.LibraryManagedAttributes<
    C,
    Omit<React.ComponentProps<C>, keyof WithThemeProps>
  >
>(Component: C) {
  const displayName = Component.displayName || Component.name || 'Component';
  class WithTheme extends React.Component<ResolvedProps> {
    static displayName = `withTheme(${displayName})`;
    static defaultProps = Component.defaultProps || {};

    render() {
      return (
        <ThemeContext.Consumer>
          {theme => {
            return (
              <Component
                theme={theme}
                {...(this.props as JSX.LibraryManagedAttributes<C, React.ComponentProps<C>>)}
              />
            );
          }}
        </ThemeContext.Consumer>
      );
    }
  }

  return hoistNonReactStatics(WithTheme, Component);
}

export default withTheme;
