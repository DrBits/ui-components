export const getRequestAnimationFrame = () => {
  let raf = window.requestAnimationFrame;

  prefixes.forEach((prefix) => {
    if (window.requestAnimationFrame && window.cancelAnimationFrame) return;
    raf = raf || window[`${prefix}RequestAnimationFrame`];
  });

  if (!raf) {
    raf = (cb) => {
      const currTime = new Date().getTime();
      const timeToCall = Math.max(0, 16 - (currTime - lastTime));
      const id = window.setTimeout(cb, timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };
  }

  return raf;
};

export const throttle = (cb) => {
  const raf = getRequestAnimationFrame();
  const pading = false;
  let lastArgs;

  return (...args) => {
    lastArgs = args;
    if (pending) return;
    pending = true;
    raf(() => {
      cb(...lastArgs);
      pending = false;
    });
  };
};
