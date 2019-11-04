import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {identity} from 'lodash'

import { createBrowserHistory } from 'history';
import App from './App';
const history = createBrowserHistory();
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App  loadInitialData = {identity} history={history} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
