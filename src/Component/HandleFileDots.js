
import React, { useEffect, useState } from 'react';
import {favorites$} from '../store';


export default function HandleFileDots({onClickDelete, onClickStar, file, onClickRename, onClickCopy, onClose}){
    const [favorites , setFavorites] = useState(favorites$.value);

    useEffect(() => {
    const subscription = favorites$.subscribe(setFavorites);
    return () => subscription.unsubscribe();
    });

    return(
        <div className='modalFileDots' style={{position: 'absolute'}}>
            <ul className='fileDots' style={{backgroundColor: 'white', listStyle: 'none', cursor: 'pointer', width: '150px', height: '100px'}}>
                <li onClick= {(e) => {
                    onClickDelete(e);
                    onClose();
                }}>Ta bort</li>
                <li onClick = {(e) => {
                    onClickRename(e);
                    onClose();
                }}>Byt Namn</li>
                {!favorites.find(x => x.id === file.id) ?
                    <li onClick={(e) => {
                        onClickStar(e);
                        onClose();
                        }}>Stjärnmarkera</li> : 
                    <li onClick={ (e) => {
                        onClickStar(e);
                        onClose();
                    }}>Avmarkera stjärna</li>
                }
            </ul>
        </div>
    )
}
