import { FETCH_PROFILE, REGISTER_USER, SIGN_IN, SIGN_OUT } from '../actions/types';

const token = localStorage.getItem('token');

const INITIAL_STATE = {
  isSignedIn: token ? true : false,
  user: {}
};

const usersReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REGISTER_USER:
    case SIGN_IN:
      return { ...state, isSignedIn: true };
    case FETCH_PROFILE:
      return { ...state, user: action.payload };
    case SIGN_OUT: 
      return { ...state, isSignedIn: false };
    default:
      return state;
  }
}

export default usersReducer;