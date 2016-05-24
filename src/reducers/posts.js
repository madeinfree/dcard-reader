import { fromJS, List } from 'immutable';

const initialPostState = fromJS({
  posts: new List(),
  forums: new List()
})

export const posts = (state = initialPostState, { type, payload }) => {
  switch(type) {
    case 'FETCH_POSTS':
      return state.setIn(['posts'], fromJS(payload.posts))
    case 'FETCH_FORUMS':
      return state.setIn(['forums'], fromJS(payload.forums))
    default:
      return state
  }
}
