import axios from 'axios'
import { 
  FETCH_TASKS,
  CREATE_TASK,
  UPDATE_TASK,
  DELETE_TASK } from './types'


const API_URL = 'https://test-server-tasky.herokuapp.com'
const API_URL2 = 'http://localhost:5000'



//get
export const fetchTasks = ( token ) => async ( dispatch ) => {
  const res = await axios.get(`${API_URL}/api/task`, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  })

  dispatch({ type: FETCH_TASKS, payload: res.data })
}

//create
export const createTask = ( values, token ) => async ( dispatch ) => {
  const res = await axios.post(`${API_URL}/api/task`, values, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  dispatch({ type: CREATE_TASK, payload: res.data.task })
}

//delete
export const deleteTask = ( id, token ) => async ( dispatch ) => {
  await axios.delete(`${API_URL}/api/task/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  dispatch({ type: DELETE_TASK, payload: id })
}

//update
export const updateTask = ( id, values, token ) => async ( dispatch ) => {
  const res = await axios.patch(`${API_URL}/api/task/${id}`, values, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  dispatch({ type: UPDATE_TASK, payload: res.data })
}
