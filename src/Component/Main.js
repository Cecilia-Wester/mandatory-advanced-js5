import React, { useEffect, useState} from 'react';
import ReactDOM from "react-dom";
import { Link, Redirect } from "react-router-dom";
import { Helmet} from 'react-helmet-async'
import { Dropbox } from 'dropbox';
import {token$, updateToken, searchQuery$, favorites$, toggleFavorite} from '../store';
import Header from './Header/Header';
import SideBar from './Sidebar/SideBar';
import HandleFileDots from './HandleFileDots';
import DeleteModal from './DeleteModal';
import { MdStar, MdStarBorder} from "react-icons/md";
import ReName from './ReName';
import Breadcrumbs from "./Breadcrumbs";
import {Thumbnail, FileSize, Modified} from './utils';
import Copy from './Copy';
import Move from './Move';

function Error ({onClose, error}) {
    return ReactDOM.createPortal((
        <div className ='Modal' style={{position: "absolute"}}>
            {<handleFilesList/> && error ? <p>Någonting blev fel med api anropet. Vänligen försök igen!</p> : null}
            {<filesSearch/> && error ? <p>Det gick inte att söka efter filen/mappen. Vänligen försök igen</p> : null}
            {<onClickFileDownload/> && error ? <p>Det gick inte att ladda ner efter filen/mappen. Vänligen försök igen</p> : null}
            <button onClick = {onClose}>Gå tillbaka</button>
        </div>
    ), document.body);
}

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

    useEffect(() => {
      const subscription = favorites$.subscribe(setFavorites);
      return () => subscription.unsubscribe();
    },[]);

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
          recursive: true
      })
      .then(response => {
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
          setError(true);
          setModal(true)
      });
  }

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

    function onConfirmCopy(file, fileToCopy) {
        let currentPath = file.path_lower.split('/');
        currentPath.pop();
        currentPath.push(fileToCopy);
        let copyPath = currentPath.join('/');

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
            onUpload();
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
            {props.showFavorites ? <Link to="/main">Tillbaks till alla filer</Link> : <Breadcrumbs location = {props.location}/>}
                </div>
                <table className = 'table'>
                <thead style={{width: '100%', marginBottom: '50px' }}>
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
                  {(props.showFavorites ? favorites : files).map((file) => {
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
                        <td style={{width: '214px', overflow: 'hidden', display: 'flex'}}>
                        <div
                                        style={{
                                            display: 'inline-block',
                                            maxWidth: '151px',
                                            overflowX: 'hidden',
                                            textOverflow: 'ellipsis',
                                        }}>
                            {file[".tag"] === "folder" ? (
                            <Link to={"/main" + file.path_lower}>{file.name}</Link>
                            ) : <a onClick= {() => onClickFileDownload(file.path_lower)}>{file.name}</a>}
                            </div>
                        </td>
                        <td style={{width: '240px'}}><Modified file = {file}/></td>
                        <td style={{width: '100px'}}><FileSize file = {file}/></td>
                        <td style={{width: '150px'}}>

                                <button className="handleFileDots"
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
                                }}/> }

                            </td>
                        </tr>
                      )
                  })}
                </tbody>
                {deleteModal && <DeleteModal file={fileToDelete} setDeleteModal={setDeleteModal} onConfirmDelete={() => onConfirmDelete(fileToDelete)}  />}
                {renameModal && <ReName file = {fileToRename} location = {props.location} onConfirmRename={onConfirmRename} setRenameModal = {setRenameModal} error = {error}/>}
                {copyModal && <Copy file = {fileToCopy} location = {props.location} onConfirmCopy = {onConfirmCopy} setCopyModal = {setCopyModal} error = {error}/>}
                {moveModal && <Move files = {fileMove} location = {props.location}/>}
                {modal && <Error onClose={() => setModal(false)} error={error}/>}
            </table>
          </div>
        </div>
    );
}
