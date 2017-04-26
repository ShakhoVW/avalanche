export const REQUEST_POINTS = 'REQUEST_POINTS'
export const RECEIVE_POINTS = 'RECEIVE_POINTS'
export const SELECT_POINT = 'SELECT_POINT'
export const INVALIDATE_POINT = 'INVALIDATE_POINT'

export const selectPoint = point => ({
  type: SELECT_POINT,
  point
})

export const invalidatePoint = point => ({
  type: INVALIDATE_POINT,
  point
})

export const requestPosts = point => ({
  type: REQUEST_POINTS,
  point
})

export const receivePosts = (point, json) => ({
  type: RECEIVE_POINTS,
  point,
  posts: json,
  receivedAt: Date.now()
})

const fetchPosts = point => dispatch => {
  dispatch(requestPosts(point))
  return fetch(`http://localhost:8081/api/v1/points`)
    .then(response => response.json())
    .then(json => dispatch(receivePosts(point, json)))
}

const shouldFetchPosts = (state, point) => {
  const posts = state.postsByPoint[point]
  if (!posts) {
    return true
  }
  if (posts.isFetching) {
    return false
  }
  return posts.didInvalidate
}

export const fetchPointIfNeeded = point => (dispatch, getState) => {
  if (shouldFetchPosts(getState(), point)) {
      return dispatch(fetchPosts(point))
  }
}