import React, {useState, useEffect} from 'react';
import { Redirect } from "react-router-dom";
import { Dropbox } from 'dropbox';
import { Helmet } from 'react-helmet-async';
import {CLIENT_ID} from './clientId';
import {token$, updateToken} from '../store';
import Header from './Header/Header';


export default function Login(){
    const [token,updateToken] = useState(token$.value);

    useEffect(()=> {
        const subscription = token$.subscribe(updateToken);
        return () => subscription.unsubscribe();
    }, []);

    function onClickConnect(e) {
       e.preventDefault();

        const dbx = new Dropbox({clientId: CLIENT_ID});

        let dbxUrl = dbx.getAuthenticationUrl('http://localhost:3000/auth');

        window.location.href = dbxUrl; //will open the new URL in your current window.
    }

        if(token) {
            return <Redirect to='/main' />
        } else {

            return (
                <div>
                    <Helmet>
                        <title>Login</title>
                    </Helmet>
                    <Header />

                    <div className ='login'>


                    <div className='dialogbox'>
                        <p>Välkommen! <br /> Detta är en enkel molntjänst som är lätt att använda. Du sparar, förvarar och hanterar lätt dina filer och mappar i en lagringsplats utanför din dator.</p>
                        <button
                            onClick = {onClickConnect}>Connect to DropBox
                        </button>
                    </div>
                  </div>
            </div>
        )}
}
