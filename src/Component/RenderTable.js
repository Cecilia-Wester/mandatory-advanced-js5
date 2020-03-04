import React, { useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import { Dropbox } from 'dropbox';
import {token$, updateToken} from '../store';
import {Thumbnail, FileSize} from './init';


export default function RenderTable(props) {

    const [token, setToken] = useState(token$.value);
    const [files, updateFiles] = useState([]);
    const [thumbnails, updateThumbnails] = useState({});

    const currentLocation = props.location.pathname.substring(5);
    //console.log(currentLocation);
    
    
    function handleDownloadFile(files){
       // console.log(props);

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
            //console.log(response);
            const files = response.entries;
            const entries = response.entries.map(file=>(
                {
                    path: file.path_lower,
                size: 'w32h32'
                }
            ))
            //console.log(entries);
            
            dbx.filesGetThumbnailBatch({
                entries
            })
            .then(response => {
                const thumbnails = {};

                response.entries.forEach((entry) => {
                    if (entry.metadata) {
                        thumbnails[entry.metadata.id] = entry.thumbnail;
                    }
                });

                updateThumbnails(thumbnails);
            })
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



    //console.log(files);
    
    return(
        <table>
             <thead>
                <tr>
                    <th>Thumbnail</th>
                    <th>File Type</th> 
                    <th>Name</th>
                    <th>Modified</th>
                    <th>Size</th>
                    <th>...</th>
                </tr>
            </thead>
           <tbody>
               {files.map(file => {
                   return (
                        <tr key = {file.id}>
                            <td><Thumbnail file = {file} thumbnail={thumbnails[file.id]}/></td>
                            <td>{file[".tag"]}</td>
                            <td>
                                {file[".tag"] === "folder" ? (
                                    <Link to={"/main" + file.path_lower}>{file.name}</Link>
                                ): file.name}
                            </td>
                            <td>{file.client_modified}</td>
                            <td><FileSize file = {file.size}/></td>
                            <td>...</td>
                        </tr>
                    )
                   })} 
            </tbody>
        </table>
    );
}