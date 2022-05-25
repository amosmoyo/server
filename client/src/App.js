import "./App.css";
import Header from "./components/Header";
import Home from "./pages/home/Home";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import { Container } from "react-bootstrap";
import {useDispatch, useSelector} from 'react-redux'
import React, {useEffect} from "react";
import {getProfile} from './redux/action/index';
import DashBoard from './pages/account/DashBoard';
import Activation from "./pages/auth/Activation";
import  Forgetpass from './pages/auth/Forgetpass'
import Resetpass from "./pages/auth/Resetpass";

function App() {
  const dispatch = useDispatch();

  const {loading, user, error, message} = useSelector( state => state.authReducers);

  useEffect(() => {
    dispatch(getProfile())
  }, [dispatch, message])

  return (
    <>
      <Header />
      <Container>
        <br></br>
        <Routes>
          <Route path="/" element={<Home />} exact />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />}/>
          <Route path="/user/auth/activation/:activation_token" element={<Activation />} />
          <Route path="/account" element={<DashBoard />} />
          <Route path="/forget_password" element={<Forgetpass />} />
          <Route path="/user/reset/:token" element={<Resetpass />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
