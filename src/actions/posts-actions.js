require('es6-promise').polyfill();
require('isomorphic-fetch');

const apiUrl = window.config.apiUrl;

export function loadingAction(isLoading) {
  return {
    type: isLoading ? 'LOADING_START' : 'LOADING_OVER',
    payload: {
      loading: isLoading
    }
  };
}

export function fetchPosts(forums, shouldUpdate = true) {
  const url = forums === undefined ? `${apiUrl}/api/news/` : `${apiUrl}/api/forums/${forums}`;
  if (shouldUpdate) {
    loadingAction(true);
    return (dispatch) => {
      dispatch({
        type: 'LOADING_START'
      });
      fetch(url)
      .then((res) => {
        res.json().then((data) => {
          dispatch({
            type: 'FETCH_POSTS',
            payload: {
              posts: data,
              forumsRoute: forums
            }
          });
        });
      });
    };
  } else {
    return (dispatch) => {
      dispatch({
        type: '@@FETCH_OLD_POSTS'
      });
    };
  }
}

export function fetchPost(postId) {
  return (dispatch) => {
    dispatch({
      type: 'LOADING_START'
    });
    fetch(`${apiUrl}/api/post/${postId}`)
    .then((res) => {
      res.json().then((data) => {
        dispatch({
          type: 'FETCH_POST',
          payload: {
            post: data
          }
        });
      });
    });
  };
}

export function fetchComment(postId) {
  return (dispatch) => {
    fetch(`${apiUrl}/api/post/${postId}/comments`)
    .then((res) => {
      res.json().then((data) => {
        dispatch({
          type: 'FETCH_COMMENT',
          payload: {
            comment: data
          }
        });
      });
    });
  };
}

export function fetchForums() {
  return (dispatch) => {
    fetch(`${apiUrl}/api/forums/`)
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
