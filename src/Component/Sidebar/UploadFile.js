import React, { useState, useEffect } from 'react';
import { Dropbox } from 'dropbox';
import {token$} from '../../store';
import { FaFileUpload } from "react-icons/fa";


export default function UploadFile(props) {

    const [token, setToken] = useState(token$.value);
    const [file, updateFile] = useState(0);

    const currentLocation = props.location.pathname.substring(5);
    //console.log(currentLocation);
    
    
    useEffect(() => {
        const subscription = token$.subscribe(setToken);
        return () => subscription.unsubscribe();
    },[]);


    function handleUploadFile(file) {

        const dbx = new Dropbox({
            accessToken: token,
            fetch: fetch
        });

        console.log(currentLocation, file.name);
        dbx.filesUpload({
             path: currentLocation + '/' + file.name,
             contents: file
            }) 
        .then(response => {
            updateFile([file, response.data]);
            updateFile(0);
            props.onUpload(response);
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
                <label htmlFor = 'file-input'>
                    <FaFileUpload size = {22} color = {'#F2F2F2'}/>
                </label>
                <input
                    id= 'file-input'
                    type = 'file'
                    name = 'file' 
                    file = {file} 
                    style = {styles.input}           
                    onChange = {onChangeUploadFile}
                /> Upload
            </form>
        </div>
    );
}

const styles = {
    input: {
        display: 'none',
        cursor: 'pointer',
    }
}


