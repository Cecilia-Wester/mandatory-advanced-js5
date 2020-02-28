import React, { useEffect, useState} from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import { Dropbox } from 'dropbox';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import {CLIENT_ID} from './clientId';
import {token$, updateToken} from '../store';
import Header from './Header/Header';
import SideBar from './Sidebar/SideBar';



export default function Main () {
    const [token, setToken] = useState(token$.value);


    useEffect(() => {
        const subscription = token$.subscribe(setToken);
        return () => subscription.unsubscribe();
    }, []);

    if (!token) {
      return <Redirect to="/" />;
    }

  return(
  <div>
      <Helmet>
        <title>Main</title>
      </Helmet>
    <div>
      <Header/>
    </div>
    <div>
      <SideBar/>
    </div>
    <div className="main">
    </div>
  </div>

    );
}
