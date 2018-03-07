import React, { Component } from 'react';
import classnames from 'classnames';
import pure from 'recompose/pure';
import { renderToLayer, zIndexStack } from '../hoc';
import onClickOutside from '../events';
import { ESCAPE, POPUP_ZINDEX } from '../constants';
import { injectSheet } from '../theme';
import { isolateMixin, middleMixin, ifDesktop } from '../style/mixins';

@pure
@zIndexStack(POPUP_ZINDEX)
@renderToLayer
@injectSheet(
  theme => ({
    backdrop: {
      ...isolateMixin,
      ...middleMixin,
    },
  }),
  { name: 'Popup' }
)
export default class Popup extends Component {
  render() {
    <div />;
  }
}
