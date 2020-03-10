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
          <UploadFile location={props.location} file={props.file} onUpload = {props.onUpload}/>
          <CreateFolder location={props.location} />
          <MdStar size={25}/>Stjärnmärkta filer
        </div>
    </div>
  );
}
