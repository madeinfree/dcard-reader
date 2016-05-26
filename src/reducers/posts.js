import { fromJS, List, Set } from 'immutable';

const initialPostState = fromJS({
  posts: new List(),
  post: new Map(),
  comments: new List(),
  forums: new List(),
  forumsRoute: new Set(),
  loading: false
});

export const posts = (state = initialPostState, { type, payload }) => {
  switch (type) {
  case 'FETCH_POSTS': {
    let newState = state.setIn([ 'posts' ], fromJS(payload.posts));
    if (payload.forumsRoute !== 'post') {
      newState = newState.setIn([ 'loading' ], false);
      newState = newState.setIn([ 'forumsRoute' ], payload.forumsRoute);
    }
    return newState;
  }
  case 'FETCH_POST' : {
    let newState = state.setIn([ 'post' ], fromJS(payload.post));
    newState = newState.setIn([ 'loading' ], false);
    return newState;
  }
  case 'FETCH_COMMENT':
    return state.setIn([ 'comments' ], fromJS(payload.comment));
  case 'FETCH_FORUMS':
    return state.setIn([ 'forums' ], fromJS(payload.forums));
  case 'LOADING_START':
    return state.setIn([ 'loading' ], true);
  default:
    return state;
  }
};
