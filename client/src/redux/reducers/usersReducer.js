import { FETCH_PROFILE, FETCH_TEAM, REGISTER_USER, SIGN_IN, SIGN_OUT, UPDATE_USER } from '../actions/types'

const token = localStorage.getItem('token')

const INITIAL_STATE = {
  isSignedIn: token ? true : false,
  user: {},
  team: []
}

const usersReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REGISTER_USER:
  case SIGN_IN:
    return { ...state, isSignedIn: true }
  case UPDATE_USER:
  case FETCH_PROFILE:
    return { ...state, user: action.payload }
  case FETCH_TEAM: 
    return { ...state, team: action.payload }
  case SIGN_OUT: 
    return { ...state, isSignedIn: false }
  default:
    return state
  }
}

export default usersReducer