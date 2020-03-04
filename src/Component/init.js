import React, { useEffect, useState } from 'react';
import { token$, updateToken} from '../store';
import { MdFolderOpen } from "react-icons/md";
import { FiFileText } from "react-icons/fi";


export function Thumbnail(props) {
   
    const file = props.file;
    const thumbnail = props.thumbnail;

    //console.log(props);

    if(typeof thumbnail !== 'undefined') {
        return <img src={"data:image/png;base64," + thumbnail} />
        //console.log(thumbnail);
    } else if(file['.tag'] === 'folder') {
        return (
            <div>
                <MdFolderOpen size = {32}/>
            </div>
        )
    } else if (file['.tag'] === 'file') {
        return (
            <div>
                <FiFileText size = {32}/>
            </div>
        );
    }
     else {
        return null;
    }
}

export function FileSize(props, decimals){
    const bytes = props.file;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals ;
    if (bytes === 0){
        return '0 Bytes';
    }

    const i = Math.floor(Math.log(bytes)/ Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

console.log(FileSize(123450));



