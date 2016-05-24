import { fromJS } from 'immutable';

const initialPostState = fromJS({
  posts: []
})

export const posts = (state = initialPostState, { type, payload }) => {
  switch(type) {
    case 'FETCH_POSTS':
      return state.setIn(['posts'], fromJS(payload.posts))
    default:
      return state
  }
}
