import React, { useState, useEffect } from 'react';
import ReactDOM from "react-dom";
import { Dropbox } from 'dropbox';
import {token$} from '../../store';
import { FaUpload } from "react-icons/fa";

function Error ({onClose, error}) {
    return ReactDOM.createPortal((
        <div className ='Modal' style={{position: "absolute"}}>
            {error ? <p>Någonting blev fel, det kan beror  på att filen/mappen redan finns. Försök igen!</p> : null}
            <button onClick = {onClose}>Gå tillbaka</button>
        </div>
    ), document.body);
}

export default function UploadFile(props) {

    const [token, setToken] = useState(token$.value);
    const [file, updateFile] = useState(0);
    const [modal, setModal] = useState(false);
    const [error, setError] = useState(false);

    const currentLocation = props.location.pathname.substring(5);
    let favoritesCurrentLocation = props.location.pathname.substring(10);

    useEffect(() => {
        const subscription = token$.subscribe(setToken);
        return () => subscription.unsubscribe();
    },[]);

    function handleUploadFile(file) {

        const dbx = new Dropbox({
            accessToken: token,
            fetch: fetch
        });

        if (favoritesCurrentLocation === "/"){
            currentLocation = favoritesCurrentLocation;
        }
        dbx.filesUpload({
            path: currentLocation + '/' + file.name,
            contents: file
        })
        .then(response => {
           // updateFile([file, response]);
            updateFile(0);
            props.onUpload(response);
        })
        .catch (error => {
            console.error(error)
            setError(true);
            setModal(true);
        });
    }

    function onChangeUploadFile(e) {
        e.preventDefault();
        handleUploadFile(e.target.files[0]);
    }

    return(
        <div>
            <form >
                <label htmlFor = 'file-input'>
                    <FaUpload size = {22} />
                </label>
                <input
                    id= 'file-input'
                    type = 'file'
                    name = 'file'
                    file = {file}
                    style = {styles.input}
                    onChange = {onChangeUploadFile}
                />
                Ladda upp ny fil
            </form>
            {modal && <Error onClose={() => setModal(false)} error={error}/>}
        </div>
    );
}

const styles = {
    input: {
        display: 'none',
        cursor: 'pointer',
    }
}
