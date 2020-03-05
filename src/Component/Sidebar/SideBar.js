import React from 'react';
import UploadFile from './UploadFile';
import CreateFolder from './CreateFolder';

export default function SideBar(props) {
    console.log(props.location.pathname)
    return(
        <div className="sidebar">
            <p></p>
            <div>
                <UploadFile location={props.location} file={props.file} />
                <CreateFolder location={props.location} file={props.file} />
            </div>
        </div>
    );
}