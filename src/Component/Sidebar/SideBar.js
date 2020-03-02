import React from 'react';
import UploadFile from './UploadFile';
import CreateFolder from './CreateFolder';


export default function SideBar(props) {
    return(
        <div className="sidebar">
            <p>Sidebar title?</p>
            <div>
                <UploadFile location={props.location} folder={props.file} />
                <CreateFolder location={props.location} />
            </div>
        </div>
    );
}
