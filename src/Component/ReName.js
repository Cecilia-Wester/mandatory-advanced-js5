import React, { useState} from "react";
import ReactDOM from "react-dom";



export default function ReName(props, file) {
    
    const [newName, updateNewName] = useState('');
    
    
    return ReactDOM.createPortal((
        <div className='Modal' style={{position: "absolute", width: '500px', height: '200px'}}>
                <p>Vill du verkligen byta namn på filen/mappen {file.path_display}</p>
                <input onChange = {(e) => {updateNewName(e.target.value)}}
                    value = {newName}
                    placeholder = 'Nytt namn'/>
                <button onClick={() => props.onConfirmRename(props.file, newName)} >Ja</button>
                <button onClick={() => props.setRenameModal(false)}>Nej</button>
                { props.error ? <p>Det gick inte att döpa om filen/mappen. Vänligen försök igen!</p> : null}
        </div> 
    ), document.body);
}
 
/*export default function ReName(props, file) {
    
    const [newName, updateNewName] = useState('');
    
    return ReactDOM.createPortal((
        <div className='Modal' style={{position: "absolute", width: '500px', height: '200px'}}>
            <form onSubmit = {(e) => props.onConfirmRename(props.file, newName)}>
                <p>Vill du verkligen byta namn på filen/mappen {file.path_display}</p>
                <input onChange = {(e) => {updateNewName(e.target.value)}}
                    value = {newName}
                    placeholder = 'Nytt namn'/>
                <button type ='Submit' >Ja</button>
                <button onClick={() => props.setRenameModal(false)}>Nej</button>
            </form>
            { error ? <p>Det gick inte att döpa om filen/mappen. Vänligen försök igen!</p> : null}
        </div> 
    ), document.body);
}*/
