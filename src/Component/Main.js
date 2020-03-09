import React, { useEffect, useState} from 'react';
import { Link, Redirect } from "react-router-dom";
import { Helmet} from 'react-helmet-async'
import { Dropbox } from 'dropbox';
import {token$, searchQuery$} from '../store';
import Header from './Header/Header';
import SideBar from './Sidebar/SideBar';
import HandleFileDots from './HandleFileDots';
import DeleteModal from './DeleteModal';
import ReName from './ReName';
import {Thumbnail, FileSize, Modified} from './utils';

/* Kvar: Navigation back from folders?
         View all stars
         Copy file and folder?
         Polling or WebHook
         CSS 
         infoMsg*/


export default function Main(props) {
    const [token, setToken] = useState(token$.value);
    const [searchQuery, setSearchQuery] = useState(searchQuery$.value);
    const [files, updateFiles] = useState([]);
    const [thumbnails, updateThumbnails] = useState({});
    const [dropdown, setDropdown] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [fileToDelete, setFileToDelete] = useState(null);
    const [renameModal, setRenameModal] = useState(false);
    const [copyModal, setCopyModal] = useState(false);
    const [fileToRename, setFileToRename] = useState(false);
    const currentLocation = props.location.pathname.substring(5);
    

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
            console.log("3 - handleFilesList");
            handleFilesList();
        }
        filesSearch();
    }, [searchQuery]);

    function onUpload(){
       /* if (!files.find(x => x.id === file.id)) {
            updateFiles([...files, file]());
        }*/
        handleFilesList();
    }

    function handleFilesList(){
        const dbx = new Dropbox({
            accessToken: token,
            fetch: fetch
        });
        let path = currentLocation;
        if(path === '/') {
            path = '';
        }
        //console.log("filesListFolder");
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
            //console.log("filesGetThumbnailBatch");
                       
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

    console.log(files);
    

    function onConfirmDelete(file) { 
        const dbx = new Dropbox({
            accessToken: token,
            fetch: fetch
        });

        dbx.filesDeleteV2({ path: file.path_lower })
            .then(() => {
                updateFiles(files.filter(x => x.id !== file.id));
                setDeleteModal(false);
            })
            .catch((error)=>{
                console.log(error)
            });
    }

    function onConfirmRename(file, newName) {
        console.log("newname", newName)
        let beforePath = file.path_lower.split('/');
        beforePath.pop();
        beforePath.push(newName);

        let afterPath = beforePath.join('/');
    
        const dbx = new Dropbox({
            accessToken: token,
            fetch: fetch
        });
        
        dbx.filesMoveV2({
            from_path : file.path_lower,
            to_path: afterPath,
            autorename: true
        })
        .then(response => {
            console.log("RENAMED!");

            console.log(response);

            const idx = files.findIndex(x => x.id === response.metadata.id);

            if (idx >= 0) {
                const newFiles = [...files];
                newFiles[idx] = response.metadata;
                updateFiles(newFiles);
                setRenameModal(false);
            }
        })
        .catch(error => {
            console.log(error)
        });
    }

    function onClickDelete() {
        setDeleteModal(true)
    }
    
    function onChangeName() {
        setRenameModal(true)
    }

    function onCreateFolder(file){
        return(
            <SideBar file= {props.file} />
        )
    }

    function filesSearch(files){
        if (!searchQuery) {
            return;
        }

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

    const onClickFileDownload = (path) => {
        let dropbox = new Dropbox({accessToken: token});
        dropbox
        .filesGetTemporaryLink  ({path: path})
        .then((response)=>{
            window.location.href = response.link;
        })
        .catch((error)=>{
            console.log(error)
        });
    }

    
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
                onCreateFolder = {onCreateFolder}
                location = {props.location} 
                />
            <div className = 'main'>
            <h2><Link to={"/main"}>Hem</Link>{currentLocation}</h2>
                <table className = 'table'>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Fil Namn</th> 
                            <th>Senaste ändring</th>
                            <th>Storlek</th>
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
                                        ) : <a onClick= {() =>onClickFileDownload(file.path_lower)}>{file.name}</a>}
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
                                        {dropdown === file.id && <HandleFileDots
                                            onClickDelete={() => {
                                                setDeleteModal(true);
                                                setFileToDelete(file);
                                            }}
                                            onClickRename={() => {
                                                setRenameModal(true);
                                                setFileToRename(file);
                                            }} /> 
                                        }
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                    {deleteModal && <DeleteModal file={fileToDelete} setDeleteModal={setDeleteModal} onConfirmDelete={() => onConfirmDelete(fileToDelete)}  />}
                    {renameModal && <ReName file = {fileToRename} location = {props.location} onConfirmRename={onConfirmRename} setRenameModal = {setRenameModal}/>}
                </table>
            </div>
        </div>

    );
}
