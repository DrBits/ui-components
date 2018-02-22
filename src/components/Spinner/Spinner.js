import React, { Component } from 'react';
import classnames from 'classnames';
import range from 'lodash/range';
import pure from 'recompose/pure';
import { injectSheet } from '../theme';
import { isolateMixin, middleMixin } from '../style/mixin';

const getKeyFrames = (delay = 0) => ({
  [`${0 + delay}%`]: {
    transform: 'scale(1) translate3d(0, 0, 0)',
  },
  [`${20 + delay}%`]: {
    transform: 'scale(1) translate(0, 100%, 0)',
  },
  [`${80 + delay}%`]: {
    transform: 'scale(1) translate3d(0, 0, 0)',
  },
});

@pure
@injectSheet(
  theme => ({
    '@keyframes uiAnimateDot1': getKeyFrames(),
    '@keyframes uiAnimateDot2': getKeyFrames(100 / (600 / 80)),
    '@keyframes uiAnimateDot3': getKeyFrames(100 / (600 / 160)),
    spinner: {
      ...isolateMixin,
      ...middleMixin,
      display: 'inline-block',
      color: theme.spinner.color,
      verticalAlign: 'middle',
      pointerEvents: 'none',
      fontSize: 5,
    },
    position: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      textAlign: 'center',
    },
    dot: {
      display: 'inline-block',
      verticalAlign: 'middle',
      height: '1em',
      width: '1em',
      position: 'relative',
      top: `-${2 / 5}em`,
      borderRadius: '50%',
      color: 'inherit!important',
      background: 'currentColor',
      transition: 'transform .6s ease-out',
      transform: 'translate3d(0, 0, 0)',
      animation: '.6s ease-out',
      animationFillMode: 'forwards',
      animationIterationCount: 'infinite',
      '&:nth-child(1)': {
        animationName: 'uiAnimateDot1',
      },
      '&:nth-child(2)': {
        animationName: 'uiAnimateDot2',
        margin: '0 1em',
      },
      '&:nth-child(3)': {
        animationName: 'uiAnimateDot3',
      },
    },
  }),
  { name: 'Spinner' }
)
export default class Spinner extends Component {
  get css() {
    return this.props.classes;
  }
  render() {
    const { className, style, color, size, inline } = this.props;

    const resultStyle = {
      fontSize: size,
      color,
      ...style,
    };
    return (
      <span
        style={resultStyle}
        className={classnames(className, this.css.spinner, !inline && this.css.position)}
      >
        {range(3).map(i => <span className={this.css.dot} key={i} />)}
      </span>
    );
  }
}
