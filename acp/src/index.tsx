import 'animate.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Footer from './components/Footer';
import './index.css';

// Render react base app
ReactDOM.render(
  <React.Fragment>
    <App />
  </React.Fragment>,
  document.getElementById('root')
);

// Render footer
ReactDOM.render(
  <Footer year={new Date().getFullYear()} />,
  document.getElementById('footer')
);
