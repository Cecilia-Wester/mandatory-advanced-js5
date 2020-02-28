import React, { useEffect, useState} from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import { Dropbox } from 'dropbox';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import {token$, updateToken} from '../store';
import Header from './Header';
import SideBar from './Sidebar/SideBar';
//import RenderTable from './RenderTable';



export default function Main (props) {
    console.log(props.location.pathname);
   

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

    );
}
