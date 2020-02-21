import React from 'react';
import './App.css';
import Login from './Login';
import Main from './Main';
import Navbar from './Navbar';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import FontAwesome from 'react-fontawesome';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";


function App() {
  return (
    <div className="App">
      <Login />
    </div>
  );
}

export default App;
