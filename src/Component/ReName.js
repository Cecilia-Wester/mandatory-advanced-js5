import React, { useState} from "react";
import ReactDOM from "react-dom";



export default function ReName(props, file) {
    
    const [newName, updateNewName] = useState('');
    
    
    return ReactDOM.createPortal((
        <div className='Modal' style={{display: 'flex', flexDirection: 'column',position: "absolute", backgroundColor: '#F2F2F2', listStyle: 'none', cursor: 'pointer', width: '500px', height: '300px', borderRadius:'5px'}}>
                <p>Vill du byta namn på filen/mappen {file.path_display}</p>
                <input onChange = {(e) => {updateNewName(e.target.value)}}
                       value = {newName}
                       placeholder = 'Byt namn...'
                       style= {{width: '400px', backgroundColor: '#DCDCDC' }}/>
                <div style = {{display: 'flex', flexDirection: 'row'}}>
                    <button 
                        onClick={() => props.onConfirmRename(props.file, newName)} 
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
                    <button 
                        onClick={() => props.setRenameModal(false)}
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
