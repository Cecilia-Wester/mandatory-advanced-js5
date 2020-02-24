import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import { Dropbox } from 'dropbox';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import {CLIENT_ID} from './clientId';
import {token$, updateToken} from '../store';

export default function Main () {

    return(
        <div>
            <div>
                <Helmet>
                    <title>Main</title>
                </Helmet>
            </div>
            <div>
                <h1>HEJ</h1>
            </div>
        </div>
    );
}