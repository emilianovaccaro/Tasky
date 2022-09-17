import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from './redux/actions/userActions';

const TestProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user);
  const token = localStorage.getItem('token');
  const signedIn = useSelector(state => state.user.isSignedIn)
  const [ loading, setLoading ] = useState(true);

  useEffect(() => {
    if (signedIn) {
      dispatch(getUser(token));
      setLoading(false);
    } else { 
      setLoading(true);
    }
  }, [signedIn]);

  console.log(signedIn);

  return (
    <div>
      {
        !loading ? <h2>{user.username}</h2> : <div>asd</div>
      }
    </div>
  )
}

export default TestProfile;