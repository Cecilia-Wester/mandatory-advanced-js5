import React from 'react';
import UploadFile from './UploadFile';
import CreateFolder from './CreateFolder';




export default function SideBar(props) {


    return(
        <div className="sidebar">
            <div className="files"> 
                <UploadFile location={props.location} file={props.file} onUpload = {props.onUpload} 
                />
                <CreateFolder location={props.location} onCreateFolder = {props.onCreateFolder} />  
            </div>
        </div>
    );
}
