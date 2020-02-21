import React from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import { Dropbox} from 'dropbox';

export default class Login extends React.Component{
    render(){
        const dbx = new Dropbox({clientId: 'aqurdunikwsw0x7'})
        return(
            <div>
                <a href ={dbx.getAuthenticationUrl('http://localhost:3000/auth')}>Login with dropbox</a>
            </div>
            
        )
    }
}