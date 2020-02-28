import React, {Component} from 'react';
import { Dropbox } from 'dropbox';
import { Helmet} from 'react-helmet-async';
import {CLIENT_ID} from '../clientId';
import {token$, updateToken} from '../../store';
import UploadFile from './UploadFile';
import CreateFolder from './CreateFolder';


export default function SideBar(props) {
    return(
        <div className="sidebar">
            <p>Sidebar title?</p>
            <div>
                <UploadFile/>
                <CreateFolder/>
            </div>
        </div>
    );
}
