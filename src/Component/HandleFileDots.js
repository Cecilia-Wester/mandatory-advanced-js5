
import React, { useEffect, useState } from 'react';
import {favorites$} from '../store';


export default function HandleFileDots({onClickDelete, onClickStar, file, onClickRename, onClickCopy, onClickMove, onClose}){
    const [favorites , setFavorites] = useState(favorites$.value);


    useEffect(() => {
        const subscription = favorites$.subscribe(setFavorites);
        return () => subscription.unsubscribe();
    },[]);

    return(
        <div className='modalFileDots' style={{position: 'absolute', zIndex: '10'}}>
            <ul className='fileDots' style={{backgroundColor: '#F2F2F2', listStyle: 'none', cursor: 'pointer', width: '140px', height: '125px', borderRadius: '5px'}}>                
                <li onClick= {(e) => {
                    onClickDelete(e);
                    onClose();
                }}>Ta bort</li>
                <li onClick = {(e) => {
                    onClickRename(e);
                    onClose();
                }}>Byt Namn</li>
                <li onClick = {(e) => {
                    onClickCopy(e);
                    onClose();
                }}>Kopiera</li>
                <li onClick = {(e) => {
                    onClickMove(e)
                    onClose();
                }}>Flytta</li>
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
