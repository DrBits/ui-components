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

function getIconColor(colorsConfig, isDisabled) {
  return (isDisabled && colorsConfig.disabled.icon) || colorsConfig.default.icon;
}

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
        cursor: 'pointer',
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
          //borderRadius: '9999px !important',
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
        const shadow = conf.boxShadow || 'none';

        const setThemeForSelector = (colors, outlineOffset, boxShadow) =>
          pickBy({
            background: colors.background,
            boxShadow,
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
            ...setThemeForSelector(conf.colors.default, offset, shadow),
          },
        };
      }, {})
    );
    return css;
  },
  { name: 'Button' }
)
export default class Button extends Component {
  get css() {
    return this.props.classes;
  }

  renderIcon(icon) {
    if (icon) {
      const { theme, size, type, disabled } = this.props;
      const iconProps = {
        size: theme.button.sizes[size].icon,
        color: getIconColor(theme.button.types[type].color, disabled),
      };
      const initialProps = icon.props || {};
      const className = classnames(initialProps.className, this.css.icon);
      const resultProps = { ...iconProps, ...initialProps, className };
      return cloneElement(icon, resultProps);
    }
    return false;
  }

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
      this.css.button,
      rounded && this.css.isRounded,
      this.css[`type-${type}`],
      this.css[`size-${size}`],
      this.css[`iconPosition-${iconPosition}`],
      className,
      {
        [this.css.block]: block,
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
      <span className={classnames(this.css.content, loading && this.css.isLoading)}>
        {iconLeft && iconEl}
        {children}
        {!iconLeft && iconEl}
        {overlay && cloneElement(overlay, { className: this.css.overlay })}
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
