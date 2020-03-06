import React, { useEffect, useState } from 'react';
import ReactDOM from "react-dom";
import { token$, updateToken} from '../../store';
import { Dropbox } from 'dropbox';
import { Redirect } from 'react-router-dom';
import { FaFileUpload, FaFolderPlus } from "react-icons/fa";


function CreateFolderModal({ onClose, folderName, onChangeFolderName, onSubmit, error }) {
    return ReactDOM.createPortal((
        <div className='createFolderModal' style={{position: "absolute"}}>
            <form onSubmit={onSubmit}>
                <div><p>Skapa ny mapp</p></div>
                <label> Mapp:
                    <input
                        type='text'
                        onChange={onChangeFolderName}
                        value={folderName}
                        placeholder='Mappnamn'
                    />
                </label>
                <button type='Submit'>Skapa mapp</button>
                <button onClick={onClose}>Avsluta</button>
            </form>
            {error ? <p>Någonting blev fel, testa ett annat namn</p> : null}
        </div>
    ), document.body);
}

export default function CreateFolder( {location }, props ) {
    const [token, setToken] = useState(token$.value);
    const [modal, setModal] = useState(false);
    const [folderName, setFolderName] = useState("");
    const [error, setError] = useState(false);
    const [responseRedirect, setResponseRedirect] = useState(false)
    
    let currentLocation = location.pathname.substring(5);
    if(currentLocation.charAt(currentLocation.length-1) !== '/'){
        currentLocation = currentLocation + '/';
    }

    useEffect(() => {
        const subscription = token$.subscribe(setToken);
        return () => subscription.unsubscribe();
    }, []);

    function createFolder(e) {
        e.preventDefault();
        const dbx = new Dropbox({ accessToken: token });
        dbx.filesCreateFolder({ path: currentLocation + folderName})
            .then((response) => {
                setResponseRedirect("/main" + response.path_lower);
                //currentLocation=currentLocation + '/'+ response.pathname;
            })
            .catch((error2) =>{
                setError(true);
                setModal(true);
                setFolderName('')
            });
        setModal(false);
    }

    function onChangeFolderName(e) {
        setFolderName(e.target.value);
    }

    return(
        <div className='containerCreateFolder'>
            {/*<button onClick={() => setModal(true)}>Skapa ny mapp</button> */}
            <label htmlFor = 'folder-input' >
                <FaFolderPlus size = {22} color = {'#F2F2F2'}/>
            </label>
            <input 
                id ='folder-input'
                style = {styles.folder}
                onClick={() => setModal(true)}
            />
            Skapa ny mapp
            {modal && <CreateFolderModal folderName={folderName} onChangeFolderName={onChangeFolderName} onSubmit={createFolder} onClose={() => setModal(false)} error={error}/>}
            {responseRedirect && <Redirect to={responseRedirect} />}
        </div>
    );
}

const styles = {
    folder : {
        display: 'none',
        cursor: 'pointer',
    }
}
