import React, { useEffect, useState} from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import { Dropbox } from 'dropbox';
import {token$, updateToken} from '../store';
import SideBar from './Sidebar/SideBar';


export default function RenderTable(props) {

    const [token, setToken] = useState(token$.value);
    const [files, updateFiles] = useState([]);

    const currentLocation = props.location.pathname.substring(5);
    console.log(currentLocation);
    
    
    function handleDownloadFile(files){
        console.log(props);

        const dbx = new Dropbox({
            accessToken: token,
            fetch: fetch
            });

        let path = currentLocation;

        if(path === '/') {
           path = '';
        }

        dbx.filesListFolder({
            path, 
        })
        .then(response => {
            console.log(response);
            updateFiles(response.entries);
        })
        .catch(error => {
            console.error(error); 
        });

    }

    useEffect(() => {
        const subscription = token$.subscribe(setToken);

        handleDownloadFile();

        
        return () => subscription.unsubscribe();
    }, [currentLocation]);



    console.log(files);
    
    return(
        <table>
             <thead>
                <tr>
                    <th>File Type</th> 
                    <th>Name</th>
                    <th>Modified</th>
                    <th>...</th>
                </tr>
            </thead>
           <tbody>
               {files.map(file => {
                   return (
                        <tr key = {file.id}>
                            <td>{file[".tag"]}</td>
                            <td>
                                {file[".tag"] === "folder" ? (
                                    <Link to={"/main" + file.path_lower}>{file.name}</Link>
                                ): file.name}
                            </td>
                            <td></td>
                            <td>...</td>
                        </tr>
                    )
                   })} 
            </tbody>
        </table>
    );
}