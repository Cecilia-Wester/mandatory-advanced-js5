import React from 'react';
import { Link } from "react-router-dom";
import UploadFile from './UploadFile';
import CreateFolder from './CreateFolder';
import {MdStar} from "react-icons/md";
import Main from "../Main";

import { updateToken } from '../../store';

export default function SideBar(props) {
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
                <Link to="/favorites"><MdStar size={25}
                    style={{
                        height: '40px'
                    }}
                />Stjärnmärkta filer
            </div>
        </div>
    );
}
