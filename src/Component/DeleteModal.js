import React from 'react';
import ReactDOM from "react-dom";

export default function DeleteModal({ file, onConfirmDelete, setDeleteModal, error }) {
    return ReactDOM.createPortal((
        <div className='Modal' style={{position: "absolute", width: '300px', height: '200px'}}>
                <p>Vill du verkligen ta bort {file.path_display}</p>
                <button onClick={onConfirmDelete}>Ja</button>
                <button onClick={() => setDeleteModal(false)}>Nej</button>
                {error ? <p>Någonting blev fel. Försök igen!</p> : null}
        </div>
    ), document.body);
}
