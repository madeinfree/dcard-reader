// font awesome
import 'font-awesome/css/font-awesome.css';

// React core
import React from 'react';
import { render } from 'react-dom';

// React Router
import { Provider } from 'react-redux';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

// redux store
import configureStore from './store/configureStore';

// Components
import Common from 'containers/common/common.react';
import Welcome from 'containers/welcome/welcome.react';
import Post from 'containers/post/post.react';
import List from 'containers/list/list.react';

const store = configureStore();

let counter = 0;

const routes = (
  <Route path='/' component={ Common }>
    <IndexRoute component={ Welcome } />
    <Route path='forums/:category' component={ List } />
    <Route path='/forums/post/:id' component={ Post } />
    <Route path='post/:id' component={ Post } />
  </Route>
);

const App = () => (
  <Provider store={ store }>
    <Router history={ browserHistory } routes={ routes } />
  </Provider>
);

render(<App />, document.getElementById('app'));

if (module.hot) {
  counter++;
  module.hot.accept();
}
