import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks, createTask, deleteTask, updateTask } from './redux/actions/tasksActions';
import { signIn, getUser, signOut, register } from './redux/actions/userActions';

const taskId = "63261daeaaccacd70f14e08d";

const TestTasks = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');
  const signedIn = useSelector(state => state.user.isSignedIn);
  const tasks = useSelector(state => state.tasks);
  const [list, setList] = useState([]);

  useEffect(() => {
    dispatch(fetchTasks(token));

    if (tasks?.length) {
      setList(tasks);
    }
  }, [token, dispatch, tasks]);



  return (
    <div>
      {
        !signedIn ? (<div>HOLA</div>) : list?.length > 0 ? (
          list.map(task => <div key={task._id}>{task.title}</div>
        )) : <div>HOLA</div>
      }
      
    </div>
  )
}

export default TestTasks;