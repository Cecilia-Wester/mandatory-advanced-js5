import React, { useState} from "react";
import ReactDOM from "react-dom";

export default function Copy(props){
    const[newName, updateNewName]= useState('');
    const name = props.file.name;
    
    return ReactDOM.createPortal((
        <div className='Modal' style={{display: 'flex', flexDirection: 'column',position: "absolute", backgroundColor: '#F2F2F2', listStyle: 'none', cursor: 'pointer', width: '500px', height: '300px', borderRadius:'5px'}}>
            <p> Vill du kopiera och byta namn på {name}</p>
            <br/>
            <input onChange = {(e) => {updateNewName(e.target.value)}}
                    value = {newName}
                    placeholder = 'Nytt namn'
                    style= {{width: '400px', backgroundColor: '#DCDCDC' }}
                    />
            <div style = {{display: 'flex', flexDirection: 'row'}}>
                <button 
                    onClick={() => props.onConfirmCopy(props.file, newName)} 
                    style={{
                        margin: '5px', 
                        borderRadius:'5px', 
                        width: '150px', 
                        height: '30px',
                        backgroundColor: '#DCDCDC',
                        border: 'none',
                    }}
                    >Ja</button>
                <button 
                    onClick={() => props.setCopyModal(false)}
                    style={{
                        margin: '5px', 
                        borderRadius:'5px', 
                        width: '150px', 
                        height: '30px',
                        backgroundColor: '#DCDCDC',
                        border: 'none',
                    }}>Nej</button>
            </div>
            { props.error ? <p>Det gick inte att kopiera filen/mappen. Vänligen försök igen</p> : null}
        </div> 
    ), document.body);
}
