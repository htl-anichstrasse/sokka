import Axios from 'axios';
import { Session } from 'inspector';
import React, { useState } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import Cookies from 'universal-cookie';
import './App.css';
import Navbar from './components/Navbar';
import LoginPage from './login/LoginPage';
import FourZeroFour from './pages/FourZeroFour';
import MainPage from './pages/MainPage';
import Test1Page from './pages/Test1Page';
import Test2Page from './pages/Test2Page';
import config from './config.json';

const [loggedIn, setLoggedIn]: [boolean | undefined, (arg: boolean) => void] = useState();

function App() {
  if (loggedIn == null) {
    logIn();
    return null;
  }

  if (loggedIn) {
    return (
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={MainPage} />
          <Route path="/test1" exact component={Test1Page} />
          <Route path="/test2" exact component={Test2Page} />
          <Route path="**" component={FourZeroFour} />
        </Switch>
      </Router>
    );
  } else {
    return (
      <Router>
        <Route path="/" exact component={LoginPage} />
        <Route path="**" component={() => <Redirect to="/" />} />
      </Router>
    );
  }
}

function logIn() {
  const cookies = new Cookies();
  let cookiesToken: string = cookies.get('sokka_token');
  let cookiesUsername: string = cookies.get('sokka_username');
  if (!cookiesToken || !cookiesUsername) {
    setLoggedIn(false);
    return;
  }
  Axios.get(`${config.api.url}/acp/validate`, {
    username: cookiesUsername,
    token: cookiesToken
  }).then((response) => {
    setLoggedIn(response.data.success);
  });
}

export default App;
