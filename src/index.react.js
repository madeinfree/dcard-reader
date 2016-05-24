//React core
import React, { Component } from 'react';
import { render } from 'react-dom';

//React Router
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router';

//Components
import Common from 'container/common/common.react';
import Welcome from 'container/welcome/welcome.react';
import Home from 'container/home/home.react';

export default class App extends Component {
  render() {

    return (
      <Router history={ browserHistory }>
        <Route path="/" component={ Common }>
          <IndexRoute component={ Welcome } />
          <Route path="home" component={ Home } />
        </Route>
      </Router>
    );
  }
};

render(<App />, document.getElementById('app'));
