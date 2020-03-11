import React, { useState} from "react";
import ReactDOM from "react-dom";

export default function Copy(props){
    const[newName, updateNewName]= useState('');
    const name = props.file.name;
    
    return ReactDOM.createPortal((
        <div className='Modal' style={{position: "absolute", width: '500px', height: '200px'}}>
            <p> Vill du kopiera och byta namn på {name}</p>
            <br/>
            <input onChange = {(e) => {updateNewName(e.target.value)}}
                value = {newName}
                placeholder = 'Nytt namn'/>
            <button onClick={() => props.onConfirmCopy(props.file, newName)} >Ja</button>
            <button onClick={() => props.setCopyModal(false)}>Nej</button>
            { props.error ? <p>Det gick inte att kopiera filen/mappen. Vänligen försök igen</p> : null}
        </div> 
    ), document.body);
}
