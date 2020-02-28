import React from 'react';
import UploadFile from './UploadFile';
import CreateFolder from './CreateFolder';


export default function SideBar(props) {
    return(
        <div>
            <p>Sidebar title?</p>
            <div>
                <UploadFile onClick ={props.onUpploadFile}/>
                <CreateFolder/>
            </div>
        </div>
    );
}