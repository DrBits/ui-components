import React, { Component } from 'react';
import {
  unmountComponentAtNode,
  unstable_renderSubtreeIntoContainer as renderSubtreeIntoContainer,
} from 'react-dom';

export default (renderToLayer = Target =>
  class RenderToLayer extends Component {
    componentDidMount() {
      const { isOpened } = this.props;

      if (isOpened) this.mountPortal();
    }

    componentDidUpdate(prevProps) {
      const { isOpened } = this.props;

      if (isOpened !== prevProps.isOpened) {
        if (isOpened) this.mountPortal();
        else this.unmountPortal();
      } else if (isOpened) this.renderPortal();
    }

    componentWillMount() {
      this.unmountPortal(true);
    }

    mountPortal = () => {
      const { onOpen, zIndex, containerRef } = this.props;

      if (!this.node) {
        new Promise((resolve) => {
          this.node = document.createElement('div');
          this.node.style = { position: 'absolute', zIndex };

          document.body.appendChild(this.node);
          containerRef(this.node);
          this.resolvingOpening = resolve;
          this.renderPortal();
        }).then(() => {
          this.resolvingOpening = null;
          onOpen();
        });
      }
    };

    renderPortal = () => {
      if (this.node) renderSubtreeIntoContainer(this, this.renderContent(), this.node);
    };

    unmountPortal = (force) => {
      const { containerRef, onClose } = this.props;
      if (this.node) {
        new Promise((resolve) => {
          if (force) resolve();
          this.resolveClosing = resolve;
          this.renderPortal();
        }).then(() => {
          unmountComponentAtNode(this.node);
          document.body.removeChild(this.node);
          this.node = null;
          this.resolveClosing = null;
          containerRef();
          onClose();
        });
      }
    };

    onOpen = () => {
      if (this.resolvingOpening) this.resolvingOpening();
    };

    onClose = () => {
      if (this.resolveClosing) this.resolveClosing();
    };

    renderContent = () => <Target {...this.props} onOpen={this.onOpen} onClose={this.onClose} />;

    render() {
      return null;
    }
  });
