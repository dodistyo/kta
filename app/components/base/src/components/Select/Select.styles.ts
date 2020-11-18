import { css } from '@emotion/core';
import { StylesConfig } from 'react-select';
import { rgba, borderRadius, darken } from 'polished';
import { Theme } from '../../theme';

const createStyles = (t: Theme) => {
  return {
    description: css`
      display: block;
      margin-top: ${t.spacing.xxs}px;
      font-size: ${t.typography.size.small}px;
      color: ${t.color.lightSecondary};
    `,
  };
};

const createSelectStyles = (
  t: Theme,
  isError: boolean,
  elevation: 'none' | keyof Theme['elevation'],
): StylesConfig => {
  let elevationStyle: string;
  const {
    elevation: { container, raised, float, hover },
  } = t;
  switch (elevation) {
    case 'container':
      elevationStyle = `${container.shadowOffset.width}px ${container.shadowOffset.height}px
      ${container.shadowRadius}px ${rgba(container.shadowColor, container.shadowOpacity)}`;
      break;
    case 'raised':
      elevationStyle = `${raised.shadowOffset.width}px ${raised.shadowOffset.height}px
          ${raised.shadowRadius}px ${rgba(raised.shadowColor, raised.shadowOpacity)}`;
      break;
    case 'float':
      elevationStyle = `${float.shadowOffset.width}px ${float.shadowOffset.height}px
          ${float.shadowRadius}px ${rgba(float.shadowColor, float.shadowOpacity)}`;
      break;
    case 'hover':
      elevationStyle = `${hover.shadowOffset.width}px ${hover.shadowOffset.height}px
          ${hover.shadowRadius}px ${rgba(hover.shadowColor, hover.shadowOpacity)}`;
      break;
    default:
      elevationStyle = `none`;
  }

  // https://github.com/JedWatson/react-select/issues/1322#issuecomment-591189551
  const targetHeight = 35;

  return {
    clearIndicator: provided => ({
      ...provided,
      // 20 is icon height
      // 2 is from border top and bottom
      padding: `${(targetHeight - 20 - 2) / 2}px`,
      color: t.color.lightNeutral,
      cursor: 'pointer',
      '&:hover': {
        color: t.color.lightNeutral,
      },
    }),
    control: (provided, state) => ({
      ...provided,
      borderColor: (() => {
        let value: string = t.color.lightSecondary;
        if (state.isFocused) {
          value = t.color.yellowSecondary;
        }
        if (isError) {
          value = t.color.redPrimary;
        }
        if (state.isDisabled) {
          value = '#E4E4E4';
        }
        return value;
      })(),
      borderRadius: t.border.radius.default,
      boxShadow: (() => {
        let value;
        if (state.isFocused) {
          value = `0px 0px 0px 3px ${rgba(t.color.yellowPrimary, t.opacity.seeThrough)}`;
          if (isError) {
            value = `0px 0px 0px 3px ${rgba(t.color.redPrimary, t.opacity.seeThrough)}`;
          }
        }
        return value;
      })(),
      '&:hover': {
        borderColor: (() => {
          let value;
          if (state.isFocused) {
            value = t.color.yellowSecondary;
            if (isError) {
              value = t.color.redPrimary;
            }
          }
          return value;
        })(),
      },
      minHeight: 'initial',
    }),
    dropdownIndicator: (provided, state) => {
      return {
        ...provided,
        ...borderRadius('right', t.border.radius.default),
        padding: `${(targetHeight - 20 - 1 - 1) / 2}px`,
        backgroundColor: state.isDisabled ? '#f2f2f2' : t.color.lightStain,
        borderLeft: `1px solid ${state.isDisabled ? '#e4e4e4' : t.color.lightSecondary}`,
        color: t.color.lightNeutral,
        cursor: 'pointer',
        height: '100%',
        display: 'inline-flex',
        alignItems: 'center',
        '&:hover': {
          color: t.color.lightNeutral,
        },
      };
    },
    indicatorsContainer: provided => ({
      ...provided,
      ...borderRadius('right', t.border.radius.default),
    }),
    indicatorSeparator: provided => ({
      ...provided,
      marginBottom: 0,
      marginTop: 0,
      // backgroundColor: state.isDisabled ? '#E4E4E4' : t.color.lightSecondary,
      display: 'none',
    }),
    loadingIndicator: provided => ({
      ...provided,
      color: t.color.lightNeutral,
    }),
    menu: provided => ({
      ...provided,
      // boxShadow: '0 4px 11px hsla(0, 0%, 0%, 0.1)',
      boxShadow: elevationStyle,
      border: `1px solid ${rgba(t.color.lightNeutral, 0.75)}`,
      zIndex: t.zIndex.dropdownMenu,
    }),
    multiValue: provided => {
      return {
        ...provided,
        backgroundColor: '#f2f2f2',
        borderRadius: t.border.radius.default,
      };
    },
    multiValueLabel: (provided, state) => {
      return {
        ...provided,
        label: 'multiValueLabel',
        paddingRight: state.data.fixed ? provided.paddingLeft : provided.paddingRight,
        fontSize: t.typography.size.small,
      };
    },
    multiValueRemove: (provided, state) => {
      return {
        ...provided,
        label: 'multiValueRemove',
        cursor: 'pointer',
        display: state.data.fixed ? 'none' : undefined,
      };
    },
    option: (provided, state) => ({
      ...provided,
      color: t.color.darkPrimary,
      backgroundColor: (() => {
        let val = 'transparent';
        if (state.isFocused) {
          val = darken(0.01, t.color.lightStain);
        }
        if (state.isSelected) {
          val = t.color.yellowLight;
        }
        return val;
      })(),
      padding: '6px 12px',
      ':active': {
        backgroundColor: !state.isSelected ? darken(0.01, t.color.lightStain) : t.color.yellowLight,
      },
      ':hover': {
        cursor: 'pointer',
      },
      ':focus': {
        outline: 0,
      },
    }),
    placeholder: (provided, state) => ({
      ...provided,
      color: state.isDisabled ? '#aaaaaa' : t.color.lightSecondary,
    }),
    singleValue: (provided, state) => ({
      ...provided,
      color: state.isDisabled ? '#999999' : t.color.darkPrimary,
    }),
    valueContainer: provided => {
      return {
        ...provided,
        label: 'valueContainer',
        // 29 is from Input
        // 2 is from border top and bottom
        padding: `${(targetHeight - 29 - 2) / 2}px 12px`,
      };
    },
  };
};

export { createStyles, createSelectStyles };
