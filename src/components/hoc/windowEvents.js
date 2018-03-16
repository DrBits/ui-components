import React, { Component } from 'react';
import wrapDisplayName from 'recompose/wrapDisplayName';
import { events, handlers, createHandlers } from '../utils/handlers';

export const windowEvents = (...types) =>
  (wrap = OriginalComponent =>
    class WrappedComponent extends Component {
      displayName = wrapDisplayName(OriginalComponent, 'windowEvents');

      componentDidMount() {
        handlers = handlers || createHandlers();
        types.forEach((type) => {
          if (!handlers[type].listenerCount) {
            handlers[type].listenerCount = 0;
            window.addEventListener(type, handlers[type].handler, handlers[type].capture);
          }
          handlers[type].listenerCount += 1;
        });
      }

      render() {
        return <OriginalComponent {...this.props} windowEvents={events} />;
      }
    });
