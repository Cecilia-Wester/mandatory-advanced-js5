import React, { seEffect, useState} from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import { Dropbox } from 'dropbox';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import {CLIENT_ID} from './clientId';
import {token$, updateToken} from '../store';
import Header from './Header';
import UploadFile from './Sidebar/UploadFile';


export default function RenderTable(props) {

    function downLoadFile(props){
        onUpploadFile();

    }

    
    return(
        <div></div>
        /*
        <table>
            <thead>
                <tr>
                    <th>File Type</th> 
                    <th>Name</th>
                    <th>Modified</th>
                    <th>...</th>
                </tr>
            </thead>
            <tbody>{file.map((file) => (
                        <tr key = {file.id}>
                            <td>{file.name}</td>
                            <td>{file.name}</td>
                            <td>{file.name}</td>
                            <td>...</td>
                        </tr>
                    ))} 
            </tbody> 
        </table>*/
    );
}