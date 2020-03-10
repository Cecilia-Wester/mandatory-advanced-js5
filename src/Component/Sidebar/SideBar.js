import React from 'react';
import UploadFile from './UploadFile';
import CreateFolder from './CreateFolder';
import { updateToken } from '../../store';




export default function SideBar(props) {


    return(
        <div className="sidebar">
            <div className="files">
                <UploadFile location={props.location} file={props.file} onUpload = {props.onUpload}/>
                <CreateFolder location={props.location} />
            </div>
        </div>
    );
}
