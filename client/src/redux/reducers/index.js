import { combineReducers } from 'redux'
import usersReducer from './usersReducer'
import tasksReducer from './tasksReducer'

const reducers = combineReducers({
  user: usersReducer,
  tasks: tasksReducer
})

export default reducers