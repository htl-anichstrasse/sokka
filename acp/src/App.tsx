import React, { useState } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import Cookies from 'universal-cookie';
import './App.css';
import Navbar from './components/Navbar';
import LoginPage from './login/LoginPage';
import ConfigPage from './pages/config/ConfigPage';
import FourZeroFour from './pages/FourZeroFour';
import GroupsPage from './pages/groups/GroupsPage';
import HomePage from './pages/HomePage';
import MenusPage from './pages/menus/MenusPage';
import AddProductPage from './pages/products/AddProductPage';
import EditProductPage from './pages/products/EditProductPage';
import ProductsPage from './pages/products/ProductsPage';
import UsersPage from './pages/users/UsersPage';
import { sendRequest } from './Util';

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
    sendRequest('/acp/validate', 'POST', false, {
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
          <Route path="/products/add" exact component={AddProductPage} />
          <Route path="/products/:id" exact component={EditProductPage} />
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
