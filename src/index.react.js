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
// import Post from 'containers/post/post.react';
import List from 'containers/list/list.react';

const store = configureStore();

let counter = 0;

const routes = (
  <Route path='/' component={ Common }>
    <IndexRoute component={ Welcome } />
    <Route path='/forums/:category' component={ List } />
    <Route path='/forums/:category/post/:id' component={ List } />
    <Route path='post/:id' component={ Welcome } />
    <Route path='*' component={ () => (<h1 className='text-danger' style={ { textAlign: 'center' } }>尚未找到任何頁面</h1>) } />
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
