import React, {useState, useEffect} from 'react';
import { Redirect } from "react-router-dom";
import { Dropbox } from 'dropbox';
import { Helmet } from 'react-helmet-async';
import {CLIENT_ID} from './clientId';
<<<<<<< HEAD
import {token$, updateToken} from '../store';


export default function Header(){
    const [token, updateToken] = useState(token$.value);
=======
import {token$} from '../store';
import './Login.css'
import CloudBerry from "./CloudBerry.jpg";

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
>>>>>>> 692e067a628fb4c49e923f2d558c7db1ba3dda74

    useEffect(()=> {
        const subscription = token$.subscribe(updateToken);
        return () => subscription.unsubscribe();
    }, []);

<<<<<<< HEAD
    function onClickConnect(e) {
       e.preventDefault();
=======
    onClickConnect(e) {
        e.preventDefault();
>>>>>>> 692e067a628fb4c49e923f2d558c7db1ba3dda74

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
<<<<<<< HEAD
                <div>
                    <h1>Something</h1>
                    <button
                     onClick = {onClickConnect}>Connect to DropBox</button>
                </div>
            </div>
        )}     
}
=======
                <div className= 'login'>
                    <header>
                        <img src={CloudBerry}  alt="cloudberry" width="150px" />
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
>>>>>>> 692e067a628fb4c49e923f2d558c7db1ba3dda74

}
