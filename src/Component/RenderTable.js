import React, { useEffect, useState} from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import { Dropbox } from 'dropbox';
import {token$, updateToken} from '../store';
import SideBar from './Sidebar/SideBar';
import HandleFileDots from './HandleFileDots';
import DeleteModal from './DeleteModal';


export default function RenderTable(props) {
    const [token, setToken] = useState(token$.value);
    const [files, updateFiles] = useState([]);
    const [dropdown, setDropdown] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [fileToDelete, setFileToDelete] = useState(null)
    const currentLocation = props.location.pathname.substring(5);

    
    function handleDownloadFile(files){
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

    function onConfirmDelete(file) { 
        const dbx = new Dropbox({
            accessToken: token,
            //fetch: fetch
        });
        console.log("DELETE FILE");
        dbx.filesDeleteV2({ path: file.path_lower })
            .then(() => {
                updateFiles(files.filter(x => x.id !== file.id));
                console.log("FILE DELETED");
                setDeleteModal(false);
            })
            .catch((error)=>{
                console.log(error)
            });
    }

    function onClickDelete() {
        setDeleteModal(true)
    }

    useEffect(() => {
        const subscription = token$.subscribe(setToken);
        handleDownloadFile();

        
        return () => subscription.unsubscribe();
    }, [currentLocation]);

    
    function onCreateFolder(file){
        console.log(file)
        return(
            <SideBar file= {props.file} />
        )
    }
    
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
                            <td>
                                <button 
                                    onClick={() => {
                                        if (dropdown !== file.id) {
                                            setDropdown(file.id)
                                        } else {
                                            setDropdown(false);
                                        }
                                    }}>...</button>
                                    {dropdown === file.id && <HandleFileDots onClickDelete={() => {
                                        setDeleteModal(true);
                                        setFileToDelete(file);
                                    }}  />}
                                </td>
                        </tr>
                    )
                })} 
            </tbody>
            {deleteModal && <DeleteModal file={fileToDelete} setDeleteModal={setDeleteModal} onConfirmDelete={() => onConfirmDelete(fileToDelete)}  />}
        </table>
    );
}