import React from 'react';
import { Provider } from 'react-redux';
import APOD from './apod/apod';
import configureStore from './configureStore';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import './index.css';
import injectTabEventPlugin from 'react-tap-event-plugin';
import { Router, Route, browserHistory } from 'react-router';


injectTabEventPlugin();

ReactDOM.render(
  <Provider store={configureStore()}>
    <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
      <Router history={browserHistory}>
        <Route path="/(:date)" component={APOD}/>
      </Router>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
);