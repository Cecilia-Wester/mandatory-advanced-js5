import React, { useState} from "react";
import ReactDOM from "react-dom";



export default function ReName(props, file, setRenameModal) {
    
    const [newName, updateNewName] = useState('');
    
    return ReactDOM.createPortal((
        <div className='Modal' style={{position: "absolute", width: '500px', height: '200px'}}>
                <p>Vill du verkligen byta namn på filen/mappen {file.path_display}</p>
                <input onChange = {(e) => {updateNewName(e.target.value)}}
                   value = {newName}
                   placeholder = 'Nytt namn'/>
                <button onClick={() => props.onConfirmRename(props.file, newName)}>Ja</button>
                <button onClick={() => setRenameModal(false)}>Nej</button>
        </div> 
    ), document.body);
}

