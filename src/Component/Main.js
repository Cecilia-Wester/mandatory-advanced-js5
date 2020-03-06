import React, { useEffect, useState} from 'react';
import { Redirect } from "react-router-dom";
import { Helmet} from 'react-helmet-async';
import {token$, updateToken} from '../store';
import Header from './Header/Header';
import SideBar from './Sidebar/SideBar';
import RenderTable from './RenderTable';

export default function Main (props) {

    const [token, setToken] = useState(token$.value);
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
            <Header/>
            <SideBar location = {props.location} />
            <RenderTable location = {props.location}/>

        </div>
    );
}
