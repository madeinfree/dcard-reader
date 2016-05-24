//React core
import React, { Component } from 'react';
import { render } from 'react-dom';

//React Router
import { Provider } from 'react-redux';
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router';

//redux store
import configureStore from './store/configureStore'

//Components
import Common from 'containers/common/common.react';
import Welcome from 'containers/welcome/welcome.react';
import Funny from 'containers/home/home.react';
import Post from 'containers/post/post.react';

const store = configureStore();

let counter = 0;

const routes = (
  <Route path="/" component={ Common }>
    <IndexRoute component={ Welcome } />
    <Route path="funny" component={ Funny } />
    <Route path="post/:id" component={ Post } />
  </Route>
)

export default class App extends Component {

  render() {

    return (
      <Provider store={ store }>
        <Router history={ browserHistory } routes={ routes } />
      </Provider>
    );
  }
};

render(<App />, document.getElementById('app'));

if (module.hot) {
    counter++;
    module.hot.accept();
}
