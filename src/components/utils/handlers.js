import EventEmitter from 'events';
import { throttle as throttleRaf } from './raf';

export let handlers;
export const events = new EventEmitter();
events.setMaxListeners(0);

export const createHandlers = () => ({
  scroll: {
    handler: throttleRaf((e) => {
      events.emit('scroll', e);
    }),
    capture: true,
  },
  resize: {
    handler: throttleRaf((e) => {
      events.emit('resize', e);
    }),
  },
  click: {
    handler: (e) => {
      events.emit('click', e);
    },
    capture: true,
  },
  touchstart: {
    handler: (e) => {
      events.emit('touchstart', e);
    },
    capture: true,
  },
});
