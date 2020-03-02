import React, {useEffect, useState} from 'react';
import { Dropbox } from 'dropbox';
import {token$, updateToken} from '../../store';
import CloudBerry from '../../CloudBerry.jpg';


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
      });
    }
  }, [token]);

  function logout(){
    updateToken(null);
  }

  return(
    <div className='header'>
      <div>
        <img src={CloudBerry}  alt="cloudberry" width="175px" />
      </div>

    

      <div className="name">
      {token ? name : null}
      {!token?<button style={{display:"none"}}></button> : <button className="logOutButton" style={{display:"block"}} onClick={logout}>Logga ut</button>}
      </div>
    </div>
 );
}
