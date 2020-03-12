import React, { useEffect, useState } from 'react';
import { Link, Redirect } from "react-router-dom";
import { Helmet } from 'react-helmet-async'
import { Dropbox } from 'dropbox';
import { token$, updateToken, searchQuery$, favorites$, toggleFavorite } from '../store';
import Header from './Header/Header';
import SideBar from './Sidebar/SideBar';
import HandleFileDots from './HandleFileDots';
import DeleteModal from './DeleteModal';
import { MdStar, MdStarBorder } from "react-icons/md";
import ReName from './ReName';
import Breadcrumbs from "./Breadcrumbs";
import {Thumbnail, FileSize, Modified} from './utils';
import Copy from './Copy';
import Move from './Move';
import Error from './ErrorModal'

export default function Main(props) {
    const [token, setToken] = useState(token$.value);
    const [searchQuery, setSearchQuery] = useState(searchQuery$.value);
    const [favorites , setFavorites] = useState(favorites$.value);
    const [files, updateFiles] = useState([]);
    const [thumbnails, updateThumbnails] = useState({});
    const [dropdown, setDropdown] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [fileToDelete, setFileToDelete] = useState(null);
    const [renameModal, setRenameModal] = useState(false);
    const [fileToRename, setFileToRename] = useState(false);
    const [copyModal, setCopyModal] = useState(false);
    const [fileToCopy, setFileToCopy] = useState([]);
    const [error, setError] = useState(false);
    const [modal, setModal] = useState(false);
    const [fileMove, setFileMove] = useState(false);
    const [moveModal, setMoveModal] = useState(false);
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
            handleFilesList();
        }
        filesSearch();
    }, [searchQuery]);

    function onUpload(){
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
        dbx.filesListFolder({
            path,
        })
        .then(response => {
            const entries = response.entries.map(file=>(
        {
            path: file.path_lower,
            size: 'w64h64'
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
            setError(true);
            setModal(true);
        });
    }

    function onConfirmDelete(file) { 
        const dbx = new Dropbox({
            accessToken: token,
            fetch: fetch,
        });
        dbx.filesDeleteV2({ path: file.path_lower })
        .then(() => {
            updateFiles(files.filter(x => x.id !== file.id));
            setDeleteModal(false);
        })
        .catch((error)=>{
            if(error.status === 409){
                updateFiles(files.filter(x => x.id !== file.id));
                setDeleteModal(false);
            } else {
                setError('Det gick inte att ta bort filen, var god försök igen!');
            }
        });
    }   
    
    function onConfirmRename(file, newName) {
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
            const idx = files.findIndex(x => x.id === response.metadata.id);
            if (idx >= 0) {
                const newFiles = [...files];
                newFiles[idx] = response.metadata;
                updateFiles(newFiles);
                setRenameModal(false);
            }
        })
        .catch(error => {
            setModal(true);
            //setError(true);
        });
    }

    function onConfirmCopy(file, fileToCopy) {
        let currentPath = file.path_lower.split('/');
        currentPath.pop();
        currentPath.push(fileToCopy);
        let copyPath = currentPath.join('/');
        console.log(copyPath);
        
        if(copyPath === ''){
            copyPath ='/';
        }
        console.log(copyPath);
        
        const dbx = new Dropbox({
            accessToken: token,
            fetch: fetch
        });
        dbx.filesCopyV2({
            from_path: file.path_lower,
            to_path: copyPath,
            allow_shared_folder: true,
            autorename: true
        })
        .then(response => {
            console.log(response);
            handleFilesList();
            setCopyModal(false); 
        });
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
            setModal(true);
            setError(true);
        });
    }

    const onClickFileDownload = (path) => {
        let dropbox = new Dropbox({
            accessToken: token,
            fetch: fetch
        });
        dropbox
        .filesGetTemporaryLink  ({path: path})
        .then((response)=>{
            window.location.href = response.link;
        })
        .catch((error)=>{
            setModal(true);
            setError(true);
        });
    }

    function onCreateFolder(file){
        return(
            <SideBar file= {props.file} />
        )
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
                location = {props.location}
                onCreateFolder = {onCreateFolder}
            />
            <div className = 'main'>
                <div className='breadcrumbs'
                    style={{
                        width: '100%',
                        height: '50px',
                    }}>
                    <Breadcrumbs location = {props.location}/>
                </div>
                    <table className = 'table'>
                        <thead style={{width: '100%' }}>
                            <tr>
                                <th style={{width: '60px', overflow: 'hidden'}}></th>
                                <th style={{width: '60px', overflow: 'hidden'}}></th>
                                <th style={{width: '214px', overflow: 'hidden'}}> Fil Namn</th>
                                <th style={{width: '240px'}}>Senaste ändring</th>
                                <th style={{width: '100px'}}>Storlek</th>
                                <th style={{width: '150px'}}></th>
                            </tr>
                        </thead>
                        <tbody>
                            {files.map(file => {
                                return (
                                    <tr key = {file.id}>
                                        <td style={{width: '60px', overflow: 'hidden'}}><Thumbnail file = {file} thumbnail={thumbnails[file.id]}/></td>
                                        <td style={{width: '60px', overflow: 'hidden'}}>
                                            <div style={{ cursor: "pointer "}} onClick={() => toggleFavorite(file)}>
                                                {favorites.find(x => x.id === file.id) ?
                                                    <MdStar size = {25} /> : <MdStarBorder size ={25}/>
                                                }
                                            </div>
                                        </td>
                                        <td style={{width: '214px', overflow: 'hidden'}}>
                                            <div
                                                style={{
                                                    display: 'inline-block',
                                                    maxWidth: '151px',
                                                    overflowX: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                }}>
                                                {file[".tag"] === "folder" ? (
                                                    <Link to={"/main" + file.path_lower}>{file.name}</Link>
                                                    ) : <a onClick= {() => onClickFileDownload(file.path_lower)} className='onClickFileDownload'>{file.name}</a>}
                                            </div>
                                        </td>
                                        <td style={{width: '240px'}}><Modified file = {file}/></td>
                                        <td style={{width: '100px'}}><FileSize file = {file}/></td>
                                        <td style={{width: '150px'}}>
                                            <button
                                                className='handleFileDots'
                                                onClick={() => {
                                                if (dropdown !== file.id) {
                                                    setDropdown(file.id)
                                                } else {
                                                    setDropdown(false);
                                                }
                                                }}><span className='dots'>...</span>
                                            </button>
                                            {dropdown === file.id && <HandleFileDots file={file}
                                            onClickDelete={() => {
                                                setDeleteModal(true);
                                                setFileToDelete(file);
                                            }}
                                            onClickRename={() => {
                                                setRenameModal(true);
                                                setFileToRename(file);
                                            }}
                                            onClickStar={() => {
                                                toggleFavorite(file);
                                            }}
                                            onClickRename={() => {
                                                setRenameModal(true);
                                                setFileToRename(file);
                                            }}
                                            onClickCopy={() => {
                                                setCopyModal(true);
                                                setFileToCopy(file);
                                            }}
                                            onClickMove= {()=> {
                                                setMoveModal(true);
                                                setFileMove(file);
                                            }}
                                            onClose={() => setDropdown(false)}
                                            /> }
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    {deleteModal && <DeleteModal file={fileToDelete} setDeleteModal={setDeleteModal} onConfirmDelete={() => onConfirmDelete(fileToDelete)}  />}
                    {renameModal && <ReName file = {fileToRename} location = {props.location} onConfirmRename={onConfirmRename} setRenameModal = {setRenameModal} error = {error}/>}
                    {copyModal && <Copy file = {fileToCopy} location = {props.location} onConfirmCopy = {onConfirmCopy} setCopyModal = {setCopyModal} error = {error}/>}
                    {moveModal && <Move file = {fileMove} location = {props.lication}/>}
                    {modal && <Error onClose={() => setModal(false)} error={error}/>}
                </table>
            </div>
        </div>
    );
}
