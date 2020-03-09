import React from 'react';


export default function HandleFileDots({onClickDelete, onClickRename, onClickCopy }){
    return(
        <div className='modalFileDots' style={{position: 'absolute'}}>
            <ul className='fileDots' style={{backgroundColor: 'white', listStyle: 'none', cursor: 'pointer', width: '100px', height: '90px'}}>
                <li onClick={onClickDelete}>Ta bort</li>
                <li>Favorit</li>
                <li onClick = {onClickRename}>Byt Namn</li>
            </ul>
        </div>
    )
}