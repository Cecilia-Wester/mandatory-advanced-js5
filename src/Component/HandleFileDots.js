import React, { useEffect, useState } from 'react';


export default function HandleFileDots({ onClickDelete }){
    return(
        <div className='modalFileDots' style={{position: 'absolute'}}>
            <ul className='fileDots' style={{backgroundColor: 'white', listStyle: 'none', cursor: 'pointer', width: '100px', height: '50px'}}>
                <li onClick={onClickDelete}>Ta bort</li>
                <li>Favorit</li>
            </ul>
        </div>
    )
}