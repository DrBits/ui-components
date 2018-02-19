import once from 'lodash/once';

const loadOpenSansFont = once(() => {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://fonts.googleapis.com/css?family=Open+Sans:300,400,700&subset=cyrillic"';
  const rootEl = document.querySelector('head') || document.body;
  rootEl.appendChild(link);
});

export default loadOpenSansFont;

