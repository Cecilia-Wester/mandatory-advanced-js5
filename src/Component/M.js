import React, { useEffect, useState} from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import { Helmet} from 'react-helmet-async';
import {token$} from '../store';
import Header from './Header/Header';
import SideBar from './Sidebar/SideBar';
import RenderTable from './Main';
import { Dropbox } from 'dropbox';

export default function M(props) {

    const [token, setToken] = useState(token$.value);
    const [files, updateFiles] = useState([]);
    const currentLocation = props.location.pathname.substring(5);
    
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
                <SideBar 
                    onUpload={onUpload}
                    onCreateFolder={}
                    location = {props.location} 
                    />
            </div>
            <div className="main">
                <RenderTable 
                    location = {props.location} 
                    files = {files}
                    updateFiles = {updateFiles}
                    updateHandleFilesList ={updateHandleFilesList}/>
            </div>
        </div>
    );
}
