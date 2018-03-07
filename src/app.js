import React from 'react';
import { hot } from 'react-hot-loader';
import 'babel-polyfill';
import { Theme } from './components/theme';
import Button from './components/Button';

const App = () => (
  <div>
    <Theme>
      <div>
        <Button type="outline" rounded size="medium" buttonType="button">
          Button
        </Button>
        <Button rounded size="medium" type="primary">
          Cancel
        </Button>
        <Button type="secondary" size="medium" rounded>
          Send
        </Button>
        <Button type="flat" size="medium" rounded>
          Send
        </Button>
      </div>
    </Theme>
  </div>
);

export default hot(module)(App);
