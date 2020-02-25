import React, {Component, useEffect, useState} from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import { Dropbox } from 'dropbox';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import {CLIENT_ID} from './clientId';
import {token$, updateToken} from '../store';

export default function Main () {
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
      });
    }
  }, [token]);

  return(
        <div>
          <Helmet>
            <title>Main</title>
          </Helmet>
        <div>
            <h1>HEJ {name}</h1>
        </div>
      </div>
    );
}
