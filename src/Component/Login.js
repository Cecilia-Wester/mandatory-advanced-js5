import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import { Dropbox } from 'dropbox';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import {CLIENT_ID} from './clientId';
import {token$} from '../store';
import './Login.css'

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: token$.value,
        }
        this.onClickConnect = this.onClickConnect.bind(this);
    }
    
    componentDidMount() {
        this.subscription = token$.subscribe(token => {
            this.setState({token});
        }); // varför kan jag inte kalla på onClickConnect här? kanske jag ska ta bort componentdidmounten?
    }

    componentWillUnmount() {
        this.subscription.unsubscribe();
    }

    onClickConnect(e) {
        e.preventDefault();

        const dbx = new Dropbox({clientId: CLIENT_ID});
        
        let dbxUrl = dbx.getAuthenticationUrl('http://localhost:3000/auth');
        
        window.location.href = dbxUrl; //will open the new URL in your current window.
    }

    render() {

        if(this.state.tolken) {
            return <Redirect to='/main' />
        } else {

            return (
                <div>
                    <Helmet>
                        <title>Login</title>
                    </Helmet>
                <div className= 'container'>
                    <header>
                        <h1>Cloudberry</h1>
                    </header>
                    <div className='dialogbox'>
                        <p>Välkommen! <br /> Detta är en enkel molntjänst som är lätt att använda. Du sparar, förvarar och hanterar lätt dina filer och mappar i en lagringsplats utanför din dator.</p>
                        <button
                            onClick = {this.onClickConnect}>Connect to DropBox
                        </button>
                    </div>
                </div>
            </div>
        )}
    }      
    
}

