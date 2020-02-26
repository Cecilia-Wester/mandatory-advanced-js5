import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import { Dropbox } from 'dropbox';
import FontAwesome from 'react-fontawesome';
import {CLIENT_ID} from './clientId';
import {token$} from '../store';
import CloudBerry from '../CloudBerry.jpg';

export default function Header () {
    const [token, setToken] = useState(token$.value);

    const [name, setName] = useState('');

    useEffect(() => {
        const subscription = token$.subscribe(setToken);
        return () => subscription.unsubscribe();
    }, []);

    useEffect(() => {
        if (token) {
            const dbx = new Dropbox({ accessToken: token });

            dbx.usersGetCurrentAccount(null)
                .then((result) => {
                   setName(result.name.given_name);
                   console.log(name);
                });
        }
    }, [token]);

    return(
        <div>
        <div className='header'>
            <header>
                <img src={CloudBerry}  alt="cloudberry" width="150px" />
                 {name}
            </header>
        </div>
    </div>

    );
}