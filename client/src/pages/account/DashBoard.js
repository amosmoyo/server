import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {useNavigate} from 'react-router-dom'

const DashBoard = () => {
  const dispatch = useDispatch();
  const {isLogged} = useSelector( state => state.authReducers)
  const navigete = useNavigate()
  useEffect(() => {
    if(!isLogged) {
      navigete('/login')
    }
  })
  return (
    <div>DashBoard</div>
  )
}

export default DashBoard