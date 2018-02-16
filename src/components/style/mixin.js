import isArray from 'lodash/isArray';

export const middleMixin = {
  '&:before': {
    display: 'inline-block',
    height: '100%',
    verticalAlign: 'middle',
    content: '""',
    width: 0,
  },
  '& > *': {
    verticalAlign: 'middle',
  },
};

export const isolateMixin = {
  borderCollapse: 'separate',
  borderSpacing: 0,
  borderRadius: 0,
  captionSide: 'top',
  cursor: 'auto',
  direction: 'ltr',
  emptyCells: 'show',
  fontFamily: 'inherit',
  fontSize: 'medium',
  fontStyle: 'normal',
  fontWeight: 'normal',
  fontScretch: 'normal',
  lineHeight: 'normal',
  verticalAlign: 'baseline',
  hyphens: 'none',
  letterSpacing: 'normal',
  listStyle: 'disc outside none',
  tabSize: '8',
  textAlign: 'left',
  textAlignLast: 'auto',
  textIndent: '0',
  textShadow: 'none',
  textTransform: 'none',
  visibility: 'visible',
  whiteSpace: 'normal',
  widows: '2',
  wordSpacing: 'normal',
  padding: 0,
  margin: 0,
};

export const fontSmoothingMixin = {
  '-webkit-font-smoothing': 'antialiassed',
  '-moz-osx-font-smoothing': 'grayscale',
};

const responsiveFactory = (rule) => {
  const replaceResponsiveKeys = (options) => {
    const result = {};
    Object.keys(options).forEach((key) => {
      const value = options[key];
      if (
        /[$&]/.test(key) &&
        !(key === 'composes' && (isArray(value) || typeof value === 'string'))
      ) {
        result[key] = replaceResponsiveKeys(options[key]);
      } else {
        if (!result[rule]) result[rule] = {};
        result[rule][key] = value;
      }
    });
    return result;
  };
  return replaceResponsiveKeys;
};

export const ifMobile = responsiveFactory('@media (max-device-width: 767px)');

export const focusSourceMixin = (sourceType, selector, declaration) => ({
  [`html[data-focus-source="${sourceType}"] ${selector}`]: declaration,
});
