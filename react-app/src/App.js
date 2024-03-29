import React, {  useEffect } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { Restore } from './store/session';
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import PlayerProfilePage from "./components/PlayerProfilePage";
import NewPlayerForm from './components/NewPlayerForm';
import Evaluation from './components/Evaluation';
import Footer from './components/Footer';
import Help from './components/Help';
import Print from './components/PlayerProfilePage/Print';
import ForgotPassword from './components/auth/ForgotPassword';
import PasswordReset from './components/auth/PasswordReset';

function App() {
  const { user } = useSelector((state) => state.session); 
  const state = useSelector(state=> state)
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(Restore());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <NavBar  />
      <Switch>
        <Route path="/login" exact={true}>
          <LoginForm />
        </Route>
        <Route path="/sign-up" exact={true}>
          <SignUpForm />
        </Route>
        <Route path="/forgot-password" exact={true}>
          <ForgotPassword />
        </Route>
        <Route path="/reset/:token" exact={true}>
          <PasswordReset />
        </Route>
        <Route exact path='/players/:playerid/evaluation'>
          {user ? <Evaluation />: <LoginForm />}
        </Route>
        <Route path='/players/:playerid'>
          {user ? <PlayerProfilePage />:<LoginForm />} 
        </Route>
        <Route exact path='/newPlayer/:playerid'>
          {user ? <NewPlayerForm />:<LoginForm />}
        </Route>
        <Route exact path='/newPlayer'>
          {user ? <NewPlayerForm />:<LoginForm />}
        </Route>
        <Route exact path='/help'>
          {user  ? <Help />:<LoginForm />}
        </Route>
        <Route exact path='/share'>
          {user && state.players ? <Print load={state}/>:<Redirect to='/' />}
        </Route>
        <Route path='/'>
          {user && state.players ? <Home />: <LoginForm />}
        </Route>
      </Switch>
       <Footer />
    </BrowserRouter>
  );
}

export default App;
