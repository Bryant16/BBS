import React, {  useEffect, useState } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
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

function App() {
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
        <Route exact path='/players/:playerid/evaluation'>
          <Evaluation />
        </Route>
        <Route path='/players/:playerid'>
          <PlayerProfilePage /> 
        </Route>
        <Route exact path='/newPlayer/:playerid'>
          <NewPlayerForm />
        </Route>
        <Route exact path='/newPlayer'>
          <NewPlayerForm />
        </Route>
        <Route path='/'>
          <Home />
        </Route>
      </Switch>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;
