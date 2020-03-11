import React from 'react';
import ReactDOM from "react-dom";

export default function DeleteModal({ file, onConfirmDelete, setDeleteModal, error }) {
    return ReactDOM.createPortal((
        <div className='Modal' style={{position: "absolute", backgroundColor: '#F2F2F2', listStyle: 'none', cursor: 'pointer', width: '500px', height: '300px', borderRadius:'5px'}}>
                <p>Vill du verkligen ta bort {file.path_display}</p>
                <div style = {{display: 'flex', flexDirection: 'row'}}>
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
                </div>
                {error ? <p>Någonting blev fel. Försök igen!</p> : null}
        </div>
    ), document.body);
}
