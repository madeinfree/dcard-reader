require('es6-promise').polyfill();
require('isomorphic-fetch');

export function fetchPosts(forums) {
  const url = forums === undefined ? 'http://store.growth.tw:3001/api/news/' : `http://store.growth.tw:3001/api/forums/${forums}`;
  return (dispatch) => {
    fetch(url)
    .then((res) => {
      res.json().then((data) => {
        dispatch({
          type: 'FETCH_POSTS',
          payload: {
            posts: data
          }
        });
      });
    });
  };
}

export function fetchForums() {
  return (dispatch) => {
    fetch('http://store.growth.tw:3001/api/forums/')
    .then((res) => {
      res.json().then((data) => {
        dispatch({
          type: 'FETCH_FORUMS',
          payload: {
            forums: data
          }
        });
      });
    });
  };
}
