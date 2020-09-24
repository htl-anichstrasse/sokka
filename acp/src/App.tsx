import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import LoginPage from './login/LoginPage';
import FourZeroFour from './pages/FourZeroFour';
import MainPage from './pages/MainPage';
import Test1Page from './pages/Test1Page';
import Test2Page from './pages/Test2Page';

function App() {
  if (loggedIn()) {
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
        <Route path="**" component={() => <Redirect to="/"/>} />
      </Router>
    );
  }
}

function loggedIn(): boolean {
  return false;
}

export default App;
