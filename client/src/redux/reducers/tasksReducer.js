import { 
  FETCH_TASKS,
  CREATE_TASK,
  UPDATE_TASK,
  DELETE_TASK
} from "../actions/types";


const tasksReducer = ( state = [], action ) => {
  switch (action.type) {
    case FETCH_TASKS:
      return action.payload || false;
    case CREATE_TASK:
      return [ ...state, action.payload ];
    case DELETE_TASK:
      return state = state.filter(( id ) => id !== action.payload);
    case UPDATE_TASK:
      const updatedItems = state.map(item => {
        if(item._id === action.payload._id){
          return { ...item, ...action.payload }
        }
        return item
      })
      return updatedItems
    default:
      return state;
  }
}

export default tasksReducer;