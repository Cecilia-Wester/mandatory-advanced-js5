import React, {useState,useEffect} from 'react';
import ReactDOM from "react-dom";
import { Dropbox } from 'dropbox';

export default function DeleteModal({ file, onConfirmDelete, setDeleteModal }) {
    return ReactDOM.createPortal((
        <div className='DeleteModal' style={{position: "absolute", width: '300px', height: '200px'}}>
                <p>Vill du verkligen ta bort {file.path_display}</p>
                <button onClick={onConfirmDelete}>Ja</button>
                <button onClick={() => setDeleteModal(false)}>Nej</button>
        </div>
    ), document.body);
}