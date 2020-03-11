import React, { useEffect, useState } from 'react';
import ReactDOM from "react-dom";


function FolderList(props){

    
    let folders = props.files;
    console.log(folders);
    
    const allfolders = folders.map(folder => {
       return <option key= {folder.path} value = {folder.path}>{folder.name}</option>
    }); 
    console.log(allfolders);
    return allfolders;
    
}


export default function MovieModal(folders){
    FolderList();
    return ReactDOM.createPortal((
        <div>
            <div className='Modal' style={{position: "absolute"}}>
                <form>
                    <h4>
                    </h4>
                    
                </form>
            </div>
        </div>
    ), document.body);
}