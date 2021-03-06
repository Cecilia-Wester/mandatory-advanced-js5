import React from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import Login from './Component/Login';
import Auth from './Component/Auth';
import Main from './Component/Main';
import './App.css';


export default function App() {
  return (
    <HelmetProvider>
      <Router>
        <div className="App">
          <Route exact path= '/' component = {Login}/>
          <Route path = '/auth' component = {Auth} />
          <Route path = '/main' component = {Main}/>
          <Route path = '/favorites' render= {(props) => <Main showFavorites={true} {...props} />}/>
        </div>
      </Router>
    </HelmetProvider>
  );
}
