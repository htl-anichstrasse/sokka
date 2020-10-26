import Axios from 'axios';
import React, { useState } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import Cookies from 'universal-cookie';
import './App.css';
import Navbar from './components/Navbar';
import config from './config.json';
import LoginPage from './login/LoginPage';
import ConfigPage from './pages/config/ConfigPage';
import FourZeroFour from './pages/FourZeroFour';
import GroupsPage from './pages/GroupsPage';
import HomePage from './pages/HomePage';
import MenusPage from './pages/MenusPage';
import ProductsPage from './pages/ProductsPage';
import UsersPage from './pages/UsersPage';

function App() {
  const [loggedIn, setLoggedIn] = useState(true);
  const logIn = () => {
    const cookies = new Cookies();
    let cookiesToken: string = cookies.get('sokka_token');
    let cookiesUsername: string = cookies.get('sokka_username');
    if (!cookiesToken || !cookiesUsername) {
      setLoggedIn(false);
      return;
    }
    Axios.post(`${config.api.url}/acp/validate`, {
      username: cookiesUsername,
      token: cookiesToken
    }).then((response) => {
      setLoggedIn(response.data.success);
    });
  }

  if (loggedIn) {
    logIn();
    return (
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/config" exact component={ConfigPage} />
          <Route path="/products" exact component={ProductsPage} />
          <Route path="/menus" exact component={MenusPage} />
          <Route path="/groups" exact component={GroupsPage} />
          <Route path="/users" exact component={UsersPage} />
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

export default App;
