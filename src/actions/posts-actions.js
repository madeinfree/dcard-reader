export function fetchPosts(posts) {
  return {
    type: 'FETCH_POSTS',
    payload: {
      posts
    }
  };
}

export function fetchForums(forums) {
  return {
    type: 'FETCH_FORUMS',
    payload: {
      forums
    }
  };
}
