import React, { useEffect, useState} from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import { Helmet} from 'react-helmet-async'
import { Dropbox } from 'dropbox';
import {token$, updateToken, searchQuery$} from '../store';
import Header from './Header/Header';
import SideBar from './Sidebar/SideBar';
import HandleFileDots from './HandleFileDots';
import DeleteModal from './DeleteModal';
import {Thumbnail, FileSize, Modified} from './init';


export default function Main(props) {
    const [token, setToken] = useState(token$.value);
    const [searchQuery, setSearchQuery] = useState(searchQuery$.value);
    const [files, updateFiles] = useState([]);
    const [thumbnails, updateThumbnails] = useState({});
    const [dropdown, setDropdown] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [fileToDelete, setFileToDelete] = useState(null);
    const currentLocation = props.location.pathname.substring(5);
    //console.log(currentLocation);
    
    function onUpload(file){
        if (!files.find(x => x.id === file.id)) {
            updateFiles([...files, file]);
        }
    }

    function handleFilesList(files){
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
        
            const entries = response.entries.map(file=>(
                {
                    path: file.path_lower,
                size: 'w32h32'
                }
            ))            
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
            updateFiles(response.entries.reverse());
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
        handleFilesList();

        
        return () => subscription.unsubscribe();
    }, [currentLocation]);

    
    function onCreateFolder(file){
        console.log(file)
        return(
            <SideBar file= {props.file} />
        )
    }

    function filesSearch(files){
        const dbx = new Dropbox({
            accessToken: token,
            fetch: fetch,
        });
        dbx.filesSearch({
            path: "",
            query: searchQuery,
        })
        .then(response => {
            updateFiles(response.matches.map(x => x.metadata));
        })
        .catch(error => {
            console.error(error);
        });

    }

    useEffect(() => {
        const subscriptions = [
            token$.subscribe(setToken),
            searchQuery$.subscribe(setSearchQuery),
        ];
        
        handleFilesList();
        return () => subscriptions.forEach((subscription) => subscription.unsubscribe());
    }, [currentLocation, searchQuery]);

    useEffect(() => {
        if (searchQuery.length === 0) {
            handleFilesList();
        }
        filesSearch();
    }, [searchQuery]);

    console.log(files);
    
    if (!token) {
        return <Redirect to="/" />
    }

    return (
        <div>
            <Helmet>
                <title>Main</title>
            </Helmet>
            <Header/>
            <SideBar 
                onUpload={onUpload}
                //onCreateFolder 
                location = {props.location} 
                />
            <div className = 'main'>
                <table className = 'table'>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Fil Name</th> 
                            <th>Senaste ändring</th>
                            <th>storlek</th>
                            <th></th>
                        </tr>
                    </thead>
                <tbody>
                    {files.map(file => {
                        return (
                                <tr key = {file.id}>
                                    <td><Thumbnail file = {file} thumbnail={thumbnails[file.id]}/></td>
                                    <td>
                                        {file[".tag"] === "folder" ? (
                                            <Link to={"/main" + file.path_lower}>{file.name}</Link>
                                        ): file.name}
                                    </td>
                                    <td><Modified file = {file}/></td>
                                    <td><FileSize file = {file}/></td>
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
                                        }} /> }
                                    </td>
                                </tr>
                            )
                        })} 
                    </tbody>
                    {deleteModal && <DeleteModal file={fileToDelete} setDeleteModal={setDeleteModal} onConfirmDelete={() => onConfirmDelete(fileToDelete)}  />}
                </table>
            </div>
        </div>
    );
}
