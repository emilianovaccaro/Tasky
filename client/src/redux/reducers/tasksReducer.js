import { 
  FETCH_TASKS,
  CREATE_TASK,
  UPDATE_TASK,
  DELETE_TASK
} from "../actions/types";


const tasksReducer = ( state = [], action ) => {
  switch (action.type) {
    case FETCH_TASKS:
      return action.payload || null;
    case CREATE_TASK:
      return [ ...state, action.payload ];
    case DELETE_TASK:
      return state = state.filter(( id ) => id !== action.payload);
    case UPDATE_TASK:
      return [ ...state, action.payload ];
    default:
      return state;
  }
}

export default tasksReducer;