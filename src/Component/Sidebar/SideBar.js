import React from 'react';
import UploadFile from './UploadFile';
import CreateFolder from './CreateFolder';
import { updateToken } from '../../store';




export default function SideBar(props) {


    return(
        <div className="sidebar">
            <p></p>
            <div>
                <div>
                    <UploadFile location={props.location} file={props.file} onUpload = {props.onUpload} 
                    />
                </div>
                <div>
                    <CreateFolder location={props.location} />  
                </div>
                
            </div>
        </div>
    );
}
