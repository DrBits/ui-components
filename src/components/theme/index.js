import React from 'react';
import merge from 'lodash/merge';
import { object } from 'prop-types';
import { create as originalCreateJss } from 'jss';
import originalInjectSheet, { createTheming, JssProvider, SheetsRegistry } from 'react-jss';
import preset from 'jss-preset-default';
import compose from 'recompose/compose';
import getContext from 'recompose/getContext';
import withContext from 'recompose/withContext';
import withPropsOnChange from 'recompose/withPropsOnChange';
import base from './base';
import uuid from '../utils/uuid';

const UI_THEME = 'UI_THEME';
const UI_JSS = 'UI_JSS';
const UI_SHEETS_REGISTRY = 'UI_SHEETS_REGISTRY';
const UI_THEME_COUNTER = 'UI_THEME_COUNTER';
const UI_CLASS_NAME_PREFIX = 'UI_CLASS_NAME_PREFIX';

const theming = createTheming(UI_THEME);
const { ThemeProvider } = theming;

const uiPrefix = 'ui-';

export const createJss = (options = {}) =>
  originalCreateJss({
    ...preset(options),
    ...options,
  });

export const createSheetsRegistry = () => new SheetsRegistry();

export const globalSheetsRegistry = createSheetsRegistry();
export const globalJss = createJss();
export const createGenerateClassName = (themeId = 0) => (rule, sheet) => {
  const displayNamePrefix = sheet ? sheet.options[UI_CLASS_NAME_PREFIX] : '';
  const jssId = sheet ? sheet.options.jss.id : globalJss.id;
  const jssCounter = jssId === globalJss.id ? '' : `-${jssId}`;
  const themeCounter = themeId === 0 ? '' : `-${themeId}`;

  return uiPrefix + displayNamePrefix + rule.key + jssCounter + themeCounter;
};

export const Theme = compose(
  getContext({
    [UI_JSS]: object,
    [UI_SHEETS_REGISTRY]: object,
  }),
  withPropsOnChange(
    () => false,
    ({ theme = base, ...props }) => {
      let resultTheme;
      let currTheme;
      let currParentTheme;
      const sheetsRegistry =
        props.sheetsRegistry || props[UI_SHEETS_REGISTRY] || globalSheetsRegistry;
      const jss = props.jss || props[UI_JSS] || globalJss;

      if (sheetsRegistry[UI_THEME_COUNTER] == null) sheetsRegistry[UI_THEME_COUNTER] = 0;

      const themeId = sheetsRegistry[UI_THEME_COUNTER] + 1;
      console.log('theme', themeId);
      const generateClassName = props.generateClassName || createGenerateClassName(themeId);

      return {
        jss,
        sheetsRegistry,
        generateClassName,
        getResultTheme: (parentTheme) => {
          if (currTheme !== theme || currParentTheme !== parentTheme) {
            resultTheme = merge({}, parentTheme, theme);
            currParentTheme = parentTheme;
            currTheme = theme;
          }
          console.log('jss', jss);
          return resultTheme;
        },
      };
    }
  ),
  withContext(
    {
      [UI_JSS]: object,
      [UI_SHEETS_REGISTRY]: object,
    },
    ({ jss, sheetsRegistry }) => ({
      [UI_JSS]: jss,
      [UI_SHEETS_REGISTRY]: sheetsRegistry,
    })
  )
)(({ jss, sheetsRegistry, getResultTheme, generateClassName, children }) => (
  <JssProvider jss={jss} registry={sheetsRegistry} generateClassName={generateClassName}>
    <ThemeProvider theme={getResultTheme}>{children}</ThemeProvider>
  </JssProvider>
));

export const injectSheet = (styles, options = {}) => Component =>
  originalInjectSheet(styles, {
    theming,
    [UI_CLASS_NAME_PREFIX]: `${options.name || uuid()}-`,
  })(Component);
