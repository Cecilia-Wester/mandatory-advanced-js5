import React, { useState, useEffect } from 'react';
import { Dropbox } from 'dropbox';
import {token$} from '../../store';


export default function UploadFile(props) {

    const [token, setToken] = useState(token$.value);
    const [file, updatefile] = useState(0);

    const currentLocation = props.location.pathname.substring(5);
    console.log(currentLocation);


    useEffect(() => {
        const subscription = token$.subscribe(setToken);
        return () => subscription.unsubscribe();
    },[]);


    function handleUploadFile(file) {

        const dbx = new Dropbox({
            accessToken: token,
            fetch: fetch
        });
        dbx.filesUpload({
             path: currentLocation + '/' + file.name,
             contents: file
            })

          .then(response => {
            console.log(response);
            updatefile([file, response.data]);
            updatefile(0);
        })
        .catch (error => {
            console.error(error)
        });
    }

    function onChangeUploadFile(e) {
        e.preventDefault();
        handleUploadFile(e.target.files[0]);
    }



    return(
        <div>
            <form >
                <input
                    type = 'file'
                    name = 'file'
                    onChange = {onChangeUploadFile}
                />
            </form>
        </div>
    );
}
