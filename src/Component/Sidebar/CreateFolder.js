import React, { useEffect, useState } from 'react';
import ReactDOM from "react-dom";
import { token$} from '../../store';
import { Dropbox } from 'dropbox';
import { Redirect } from 'react-router-dom';
import { MdCreateNewFolder } from "react-icons/md";

function CreateFolderModal({ onClose, folderName, onChangeFolderName, onSubmit, error }) {
    return ReactDOM.createPortal((
        <div className='createFolderModal' style={{display: 'flex', flexDirection: 'column',position: "absolute", backgroundColor: '#F2F2F2', listStyle: 'none', cursor: 'pointer', width: '500px', height: '300px', borderRadius:'5px'}}>
            <form onSubmit={onSubmit}>
                <div
                    style={{
                        marginBottom: '20px'
                    }}
                >
                    <p>Skapa ny mapp</p>
                </div>
                <label style={{margin: '5px'}}> Mapp:
                    <input
                        type='text'
                        onChange={onChangeFolderName}
                        value={folderName}
                        placeholder='Mappnamn'
                        style={{
                            borderRadius: '5px',
                            width: '200px',
                            height: '30px',
                            textAlign: 'center',
                            backgroundColor: '#DCDCDC',
                            margin: '10px',
                            border: 'none',
                        }}
                    />
                </label><br />
                <div className='createFolderModalButtons' style={{margin: '10px'}}></div>
                <button
                    type='Submit'
                    style={{
                        margin: '5px',
                        borderRadius:'5px',
                        width: '150px',
                        height: '30px',
                        backgroundColor: '#DCDCDC',
                        border: 'none',
                    }}>Skapa mapp
                </button>
                <button
                    onClick={onClose}
                    style={{
                        margin:'5px',
                        borderRadius:'5px',
                        width: '150px',
                        height: '30px',
                        backgroundColor: '#DCDCDC',
                        border: 'none',
                    }}
                    >Avsluta</button>
            </form>
            {error ? <p>Någonting blev fel, testa ett annat namn</p> : null}
        </div>
    ), document.body);
}

export default function CreateFolder( {location }) {
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
        if(folderName.length < 1){
            setError(true);
        }
        e.preventDefault();
        const dbx = new Dropbox({
            accessToken: token,
            fetch: fetch
        });
        dbx.filesCreateFolder({ path: currentLocation + folderName})
        .then((response) => {
            setModal(false);
            setResponseRedirect("/main" + response.path_lower); 
            setFolderName('');               
        })
        .catch((error) =>{
            setError(true);
            setModal(true);
            setFolderName('');
        });
    }

    function onChangeFolderName(e) {
        setFolderName(e.target.value);
    }

    function onClose(){
        setModal(false);
        setError(false);
        setFolderName('')
    }

    return(
        <div className='containerCreateFolder' style={{padding:"10px"}}>

            <label htmlFor = 'folder-input' >
                <MdCreateNewFolder size = {22} />
            </label>
            <input
                id ='folder-input'
                style = {styles.folder}
                onClick={() => setModal(true)}
            />
            Skapa ny mapp

            {modal && <CreateFolderModal folderName={folderName} onChangeFolderName={onChangeFolderName} onSubmit={createFolder} onClose={onClose} error={error}/>}
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
