import React, { useEffect, useState } from 'react';
import { token$, updateToken} from '../../store';
import { Dropbox } from 'dropbox';

export default function CreateFolder() {
    const [token, setToken] = useState(token$.value);

    useEffect(() => {
        const subscription = token$.subscribe(setToken);
        return () => subscription.unsubscribe();
    });

    function createFolder() {
        const dbx = new Dropbox({ accessToken: token });
        dbx.filesCreateFolder({ path: '/abcde' })
            .then((response) => {
                console.log(response);
            });
    }

    function onChange(e){
        
    }

    function onSubmit(e){
        e.preventDefault()

    }

    return(
        <div>
            <button onClick={createFolder}>Skapa mapp</button>
            <div>
                <form onSubmit={onSubmit}>
                    <input onChange={onChange}/>
                </form>
            </div>
        </div>

    );
}