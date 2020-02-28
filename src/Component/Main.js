import React, { useEffect, useState} from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import { Dropbox } from 'dropbox';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import {token$, updateToken} from '../store';
import Header from './Header/Header';
import SideBar from './Sidebar/SideBar';
//import RenderTable from './RenderTable';



export default function Main (props) {
    console.log(props.location.pathname);
   

<<<<<<< HEAD

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
=======
    return(
        <div>
            <Helmet>
                <title>Main</title>
            </Helmet>
            <div>
                <Header/>
            </div>
            <div>
                <div>
                    <SideBar/>
                    
                </div>
                
            </div>
        </div>
>>>>>>> ce3976c46318a32d6e331c280621cf78d62305b1

    );
}
