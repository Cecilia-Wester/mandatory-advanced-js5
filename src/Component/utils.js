import React, { useEffect, useRef } from 'react';
import { MdFolderOpen } from "react-icons/md";
import {FaRegFileAlt} from 'react-icons/fa';

export function Thumbnail(props) {
    const file = props.file;
    const thumbnail = props.thumbnail;
    if(typeof thumbnail !== 'undefined') {
        return <img src={"data:image/png;base64," + thumbnail} alt = {'base64'} />
        //console.log(thumbnail);
    } else if(file['.tag'] === 'folder') {
        return (
            <div>
                <MdFolderOpen size = {32}  />
            </div>
        )
    } else if (file['.tag'] === 'file') {
        return (
            <div>
                <FaRegFileAlt size = {32} />
            </div>
        );
    }
    else {
        return null;
    }
}

export function Modified(props) {
    const file = props.file;
    if(file['.tag'] === 'file') {
        const date = file.client_modified;
    
        let currentDate = new Date(date);
        return currentDate.toString().split(' ', 5).join(' '); 
    } else {
        return null;
    }
    // varför funkar inte toLocaleSting här? 
}

export function FileSize(props, decimals){
    const file = props.file;
    const bytes = file.size;

    if(file['.tag'] === 'file') {
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals ;
        const i = Math.floor(Math.log(bytes)/ Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    } else if ( bytes === 0 ){
        return '0 Bytes';
    } else {
        return null;
    }
}