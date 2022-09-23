import axios from 'axios'
import {
  SIGN_IN,
  SIGN_OUT,
  REGISTER_USER,
  FETCH_PROFILE,
  FETCH_TEAM
} from './types'


const API_URL = 'https://test-server-tasky.herokuapp.com'
const API_URL2 = 'http://localhost:5000'


//login
export const signIn = ( values ) => async ( dispatch ) => {
  
  const res = await axios.post(`${API_URL}/api/users/login`, values)
  localStorage.setItem('token', res.data.userToken)
    
  dispatch({ type: SIGN_IN })
  
  
}

//register
export const register = ( values ) => async ( dispatch ) => {
  const res = await axios.post(`${API_URL}/api/users/register`, values)

  localStorage.setItem('token', res.data.userToken)
  dispatch({ type: REGISTER_USER })
}



//get info
export const getUser = ( token ) => async ( dispatch ) => {
  const res = await axios.get(`${API_URL}/api/users/profile`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  dispatch({ type: FETCH_PROFILE, payload: res.data })
}

export const getTeam = ( token ) => async (dispatch) => {
  const res = await axios.get(`${API_URL}/api/users/all`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  dispatch({ type: FETCH_TEAM, payload: res.data })
}

//sign out
export const signOut = ( ) => async ( dispatch ) => {
  localStorage.removeItem('token')
  dispatch({ type: SIGN_OUT })
}
