import React from 'react';
import ReactDOM from "react-dom";

export default function Error ({onClose, error}) {
    return ReactDOM.createPortal((
        <div className ='Modal' style={{display: 'flex', flexDirection: 'column',position: "absolute", backgroundColor: '#F2F2F2', listStyle: 'none', cursor: 'pointer', width: '500px', height: '300px', borderRadius:'5px'}}>
            <p>{error}</p>
            <button 
            onClick = {onClose}
            style={{
                margin: '5px', 
                borderRadius:'5px', 
                width: '150px', 
                height: '30px',
                backgroundColor: '#DCDCDC',
                border: 'none',
                }}
            >
                Gå tillbaka
            </button>
        </div>
    ), document.body);
}