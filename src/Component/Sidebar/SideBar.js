import React from 'react';
import UploadFile from './UploadFile';
import CreateFolder from './CreateFolder';
import { MdStar} from "react-icons/md";
import UploadStarFiles from "./UploadStarFiles";
import { updateToken } from '../../store';

export default function SideBar(props, onUploadStarFiles) {
    return(
        <div className="sidebar">
            <div className="files">
                <UploadFile location={props.location} file={props.file} onUpload = {props.onUpload}
                    style={{
                        height: '40px'
                    }}
                />
                <CreateFolder location={props.location} 
                    style={{
                        height: '40px'
                    }}
                />
                <MdStar size={22}
                    style={{
                        height: '40px'
                    }}
                />Stjärnmärkta filer
            </div>
        </div>
    );
}
