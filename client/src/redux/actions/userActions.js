import axios from 'axios';
import {
  SIGN_IN,
  SIGN_OUT,
  REGISTER_USER,
  FETCH_PROFILE
} from './types';


const API_URL = 'http://localhost:5000';


//login
export const signIn = ( values ) => async ( dispatch ) => {
  const res = await axios.post(`${API_URL}/api/users/login`, values);
  
  console.log(res);

  localStorage.setItem('token', res.data.userToken);
  
  dispatch({ type: SIGN_IN });
};

//register
export const register = ( values ) => async ( dispatch ) => {
  const res = await axios.post(`${API_URL}/api/users/register`, values);

  localStorage.setItem('token', res.data.userToken);

  dispatch({ type: REGISTER_USER });
};



//get info
export const getUser = ( token ) => async ( dispatch ) => {
  const res = await axios.get(`${API_URL}/api/users/profile`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  dispatch({ type: FETCH_PROFILE, payload: res.data });
};

//sign out
export const signOut = ( ) => async ( dispatch ) => {
  dispatch({ type: SIGN_OUT });
};
