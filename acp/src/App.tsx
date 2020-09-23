import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import FourZeroFour from './pages/FourZeroFour';
import MainPage from './pages/MainPage';
import Test1Page from './pages/Test1Page';
import Test2Page from './pages/Test2Page';

function App() {
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
}

export default App;
