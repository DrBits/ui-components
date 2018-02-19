import React, { Component, cloneElement, isValidElement } from 'react';
import classnames from 'classnames';
import omit from 'lodash/omit';
import pickBy from 'lodash/pickBy';
import merge from 'lodash/merge';
import pure from 'recompose/pure';
import Spinner from '../Spinner';
import { injectSheet } from '../theme';
import {
  middleMixin,
  isolateMixin,
  fontSmoothingMixin,
  ifMobile,
  focusSourceMixin,
} from '../style/mixin';

@pure
@injectSheet(
  (theme) => {
    const css = {
      button: {
        ...isolateMixin,
        fontFamily: theme.button.fontFamily,
        fontStyle: theme.button.fontStyle,
        fontWeight: theme.button.fontWeight,
        letterSpacing: theme.button.letterSpacing,
        textTransform: theme.button.textTransform,
        textAlign: 'center',
        curosr: 'pointer',
        boxSizing: 'border-box',
        textDecoration: 'none !important',
        outline: 'none !important',
        position: 'relative',
        display: 'inline-block',
        border: 'none',
        userSelect: 'none',
        borderRadius: theme.button.borderRadius,
        '&, & *': { transition: 'background-color .2s, border .2s, box-shadow .2s' },
        '&:before, &:after': {
          content: '""',
          display: 'block',
          position: 'absolute',
          pointerEvents: 'none',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          border: '1px solid transparent',
          transition: 'all .2s',
          borderRadius: theme.button.borderRadius,
        },
        '&[disabled]': { pointerEvents: 'none' },
        '&::-moz-focus-inner': {
          border: 'none !important',
          outline: 'none !important',
        },
      },
      isRounded: {
        '&$button, &:before, &:after': {
          borderRadius: '9999px !important',
        },
      },
      isLoading: {
        pointerEvents: 'none',
        opacity: 0,
      },
      content: {
        ...middleMixin,
        ...fontSmoothingMixin,
        display: 'block',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        position: 'relative',
      },
      block: {
        display: 'block',
        width: '100%',
      },
      'size-medium': {
        fontSize: theme.button.sizes.medium.fontSize,
        ...ifMobile({
          fontSize: theme.button.mobile.sizes.medium.fontSize,
        }),
        '& $content': {
          height: theme.button.sizes.medium.height,
          lineHeight: `${theme.button.sizes.medium.height}px`,
          padding: '0 20px',
        },
      },
      'size-small': {
        fontSize: theme.button.sizes.small.fontSize,
        ...ifMobile({
          fontSize: theme.button.mobile.sizes.small.fontSize,
        }),
        '& $content': {
          height: theme.button.sizes.small.height,
          lineHeight: `${theme.button.sizes.small.height}px`,
          padding: '0 20px',
        },
      },
      overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1,
        opacity: 0,
        width: '100%',
        cursor: 'pointer',
      },
      icon: {
        display: 'inline-block',
        marginTop: -2,
      },
      'iconPosition-right': {
        '& $icon': {
          marginLeft: 6,
        },
      },
      'iconPosition-left': {
        '& $icon': {
          marginRight: 6,
        },
      },
    };

    merge(
      css,
      ['primary', 'secondary', 'outline', 'flat', 'danger'].reduce((result, type) => {
        const conf = theme.button.types[type];
        const offset = conf.outlineOffset || 0;

        const setThemeForSelector = (colors, outlineOffset) =>
          pickBy({
            background: colors.background,
            '&, & *': {
              color: colors.text,
            },
            '&:before': colors.border && {
              borderColor: colors.border,
            },
            '&:after':
              colors.outline &&
              pickBy({
                left: -outlineOffset,
                right: -outlineOffset,
                top: -outlineOffset,
                bottom: -outlineOffset,
                borderColor: colors.outline,
                borderRadius: theme.button.borderRadius + outlineOffset / 1.5,
              }),
          });
        return {
          ...result,
          [`type-${type}`]: {
            '&:active:active': setThemeForSelector(conf.colors.active, offset),
            '&:hover': setThemeForSelector(conf.colors.hover, offset),
            '&[disabled]': setThemeForSelector(conf.colors.disabled, offset),
            ...focusSourceMixin('other', '&:focus', setThemeForSelector(conf.colors.focus, offset)),
            ...setThemeForSelector(conf.colors.default, offset),
          },
        };
      }, {})
    );
    return css;
  },
  { name: 'Button' }
)
export default class Button extends Component {
  render() {
    const {
      icon,
      children,
      size,
      type,
      href,
      container,
      buttonType,
      disabled,
      loading,
      block,
      className,
      overlay,
      width,
      iconPosition,
      rounded,
      style = {},
      theme,
      ...other
    } = omit(this.props, 'classes');
    const { css } = this.css;
    const iconLeft = iconPosition === 'left';
    const iconEl = this.renderIcon(icon);

    const resultStyle = {
      width,
      ...style,
    };

    const resultClassName = classnames(
      css.button,
      rounded && css.isRounded,
      css[`type-${type}`],
      css[`size-${size}`],
      css[`iconPosition-${iconPosition}`],
      className,
      {
        [css.block]: block,
      }
    );

    let resultContainer;

    if (isValidElement(container)) {
      resultContainer = container;
    } else if (href) {
      resultContainer = <a href={href}>{children}</a>;
    } else if (overlay) {
      resultContainer = overlay;
    } else {
      resultContainer = <button type={buttonType} />;
    }

    const resultProps = {
      ...other,
      style: resultStyle,
      className: resultClassName,
      disabled: disabled ? 'disabled' : null,
    };

    const resultChildren = (
      <span className={classnames(css.content, loading && css.isLoading)}>
        {iconLeft && iconEl}
        {children}
        {!iconLeft && iconEl}
        {overlay && cloneElement(overlay, { className: css.overlay })}
      </span>
    );

    return cloneElement(
      resultContainer,
      resultProps,
      resultChildren,
      loading && <Spinner color={theme.button.types[type].colors.default.loader} size={3} />
    );
  }
}
