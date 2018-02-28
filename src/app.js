import React from 'react';
import { hot } from 'react-hot-loader';
import 'babel-polyfill';
import { Theme } from './components/theme';
import Button from './components/Button';

const App = () => (
  <div>
    <Theme>
      <div>
        <Button
          style={{ margin: 20 }}
          type="outline"
          rounded
          size="medium"
          buttonType="button"
          loading
        >
          Button
        </Button>
        <Button style={{ margin: 20 }} rounded size="medium" type="primary">
          Cancel
        </Button>
        <Button type="secondary" size="medium" rounded>
          Send
        </Button>
        <Button style={{ margin: 20 }} type="flat" size="medium" rounded>
          Send
        </Button>
      </div>
    </Theme>
  </div>
);

export default hot(module)(App);
