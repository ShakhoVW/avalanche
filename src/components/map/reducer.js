import { combineReducers } from 'redux'
import {
  SELECT_POINT, INVALIDATE_POINT,
  REQUEST_POINTS, RECEIVE_POINTS
} from './actions'

const selectedPoint = (state = 'reactjs', action) => {
  switch (action.type) {
    case SELECT_POINT:
      return action.point
    default:
      return state
  }
}

const posts = (state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) => {
  switch (action.type) {
    case INVALIDATE_POINT:
      return {
        ...state,
        didInvalidate: true
      }
    case REQUEST_POINTS:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case RECEIVE_POINTS:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        items: action.posts,
        lastUpdated: action.receivedAt
      }
    default:
      return state
  }
}

const postsByPoint = (state = { }, action) => {
  switch (action.type) {
    case INVALIDATE_POINT:
    case RECEIVE_POINTS:
    case REQUEST_POINTS:
      return {
        ...state,
        [action.point]: posts(state[action.point], action)
      }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  postsByPoint,
  selectedPoint
})

export default rootReducer