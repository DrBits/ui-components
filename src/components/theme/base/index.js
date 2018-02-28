import merge from 'lodash/merge';
import { fade, darken, lighten } from '../../utils/colors';
import colorsConfig from './colors';

const fontFamilies = {
  OpenSans: 'Open Sans, sans-serif',
  Roboto: 'Roboto, sans-serif',
};

export function createTheme(config) {
  const { colors } = config;
  return merge(
    {
      fontFamily: fontFamilies.OpenSans,
      button: {
        fontFamily: fontFamilies.OpenSans,
        fontWeight: 500,
        letterSpacing: 1.3,
        textTransform: 'uppercase',
        borderRadius: '2px',
        mobile: {
          sizes: {
            medium: {
              fontSize: 12,
            },
            small: {
              fontSize: 12,
            },
          },
        },
        sizes: {
          medium: {
            fontSize: 11,
            icon: 10,
            height: 45,
          },
          small: {
            fontSize: 11,
            icon: 10,
            height: 35,
          },
        },
        types: {
          primary: {
            outlineOffset: 3,
            boxShadow:
              '0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12)',
            colors: {
              default: {
                text: colors.light,
                icon: colors.light,
                loader: colors.light,
                background: colors.primary,
              },
              hover: {
                background: darken(colors.primary, 0.1),
              },
              active: {
                background: darken(colors.primary, 0.2),
                boxShadow: '5px 5px 10px rgba(0,0,0,.35)',
              },
              disabled: {
                text: fade(colors.primary, 0.1),
                icon: fade(colors.light, 0.2),
              },
              focus: {
                outline: colors.primary,
              },
            },
          },
          danger: {
            outlineOffset: 3,
            colors: {
              default: {
                text: colors.light,
                icon: colors.light,
                loader: colors.light,
                background: colors.danger,
              },
              hover: {
                background: darken(colors.danger, 0.1),
              },
              active: {
                background: darken(colors.danger, 0.2),
              },
              disabled: {
                text: fade(colors.light, 0.2),
                icon: fade(colors.light, 0.2),
              },
              focus: {
                outline: colors.danger,
              },
            },
          },
          secondary: {
            colors: {
              default: {
                text: colors.dark,
                icon: colors.primary,
                loader: colors.primary,
                background: colors.secondary,
              },
              hover: {
                text: colors.dark,
                background: lighten(colors.secondary, 0.1),
              },
              active: {
                text: darken(colors.dark, 0.2),
                icon: darken(colors.dark, 0.2),
                background: fade(colors.secondary, 0.4),
              },
              disabled: {
                text: colors.controls.grey.outline,
                icon: fade(colors.dark, 0.1),
              },
              focus: {
                outline: colors.primary,
              },
            },
          },
          outline: {
            colors: {
              default: {
                text: colors.dark,
                icon: colors.primary,
                loader: colors.primary,
                border: colors.controls.grey.default,
                background: 'transparent',
              },
              hover: {
                text: colors.primary,
                border: colors.primary,
              },
              active: {
                text: darken(colors.primary, 0.2),
                icon: darken(colors.primary, 0.2),
                border: darken(colors.primary, 0.2),
                background: colors.controls.grey.background,
              },
              disabled: {
                text: colors.controls.grey.disabled,
                icon: colors.controls.grey.disabled,
                border: colors.controls.grey.disabled,
              },
              focus: {
                outline: colors.primary,
              },
            },
          },
          flat: {
            colors: {
              default: {
                text: colors.dark,
                icon: colors.primary,
                loader: colors.primary,
                background: 'transparent',
              },
              hover: {
                background: colors.controls.grey.background,
              },
              active: {
                background: colors.controls.grey.background,
              },
              disabled: {
                text: colors.controls.grey.disabled,
                icon: colors.controls.grey.disabled,
              },
              focus: {
                outline: colors.primary,
              },
            },
          },
        },
      },
      spinner: {
        color: colors.primary,
      },
    },
    config
  );
}

export default createTheme({ colors: colorsConfig });
