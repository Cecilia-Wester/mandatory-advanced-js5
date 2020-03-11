import React, { useEffect, useState } from 'react';
import ReactDOM from "react-dom";

import { Dropbox } from 'dropbox';
import { Redirect } from 'react-router-dom';
import { MdCreateNewFolder } from "react-icons/md";

export default function MovieModal(props){
    let file = props.file;
    const folderList = [];
    if(file['.tag'] === 'folder') {
        
        folderList.push({name: file.name, path:file.path_lower});
    }
    
    return ReactDOM.createPortal((
        <div>
            <div className='Modal' style={{position: "absolute"}}>
                <form>
                    <h4>{props.name}</h4>
                    
                </form>
            </div>
        </div>
    ), document.body);
}