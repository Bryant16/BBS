import React, {  useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
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
import Splash from './components/auth/SplashPage';

function App() {
  const { user } = useSelector((state) => state.session); 
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
          {user? <Evaluation />: <LoginForm />}
        </Route>
        <Route path='/players/:playerid'>
          {user?<PlayerProfilePage />:<LoginForm />} 
        </Route>
        <Route exact path='/newPlayer/:playerid'>
          {user?<NewPlayerForm />:<LoginForm />}
        </Route>
        <Route exact path='/newPlayer'>
          {user?<NewPlayerForm />:<LoginForm />}
        </Route>
        <Route path='/'>
          {user? <Home />: <LoginForm />}
        </Route>
      </Switch>
       <Footer />
    </BrowserRouter>
  );
}

export default App;
