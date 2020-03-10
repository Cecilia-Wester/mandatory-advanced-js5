import React from 'react';
import ReactDOM from "react-dom";

export default function DeleteModal({ file, onConfirmDelete, setDeleteModal, error }) {
    return ReactDOM.createPortal((
        <div className='Modal' style={{position: "absolute"}}>
                <p>Vill du verkligen ta bort {file.path_display}</p>
                <button onClick={onConfirmDelete}
                    style={{
                        margin: '5px', 
                        borderRadius:'5px', 
                        width: '150px', 
                        height: '30px',
                        backgroundColor: '#DCDCDC',
                        border: 'none',
                    }}
                    >Ja
                </button>
                <button onClick={() => setDeleteModal(false)}
                    style={{
                        margin: '5px', 
                        borderRadius:'5px', 
                        width: '150px', 
                        height: '30px',
                        backgroundColor: '#DCDCDC',
                        border: 'none',
                    }}
                    >Nej
                </button>
                {error ? <p>Någonting blev fel. Försök igen!</p> : null}
        </div>
    ), document.body);
}
