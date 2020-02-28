import React from 'react';
import UploadFile from './UploadFile';
import CreateFolder from './CreateFolder';


export default function SideBar(props) {
    return(
        <div className="sidebar">
            <p>Skapa</p>
            <div>
                <UploadFile onClick ={props.onUpploadFile}/>
                <CreateFolder/>
            </div>
        </div>
    );
}
