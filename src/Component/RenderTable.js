import React, { useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import { Dropbox } from 'dropbox';
<<<<<<< HEAD
import {Thumbnail, FileSize} from './init';
import {token$, updateToken, searchQuery$} from '../store';
import SideBar from './Sidebar/SideBar';

=======
import {token$, updateToken} from '../store';
import {Thumbnail, FileSize} from './init';
import {token$, updateToken, searchQuery$} from '../store';
import SideBar from './Sidebar/SideBar';
>>>>>>> 695b0bffa69d6cfcbabba19ac4e8c2e4693823fb

export default function RenderTable(props) {

    const [token, setToken] = useState(token$.value);
    const [searchQuery, setSearchQuery] = useState(searchQuery$.value);
    const [files, updateFiles] = useState([]);
    const [thumbnails, updateThumbnails] = useState({});

    const currentLocation = props.location.pathname.substring(5);
<<<<<<< HEAD



=======
    //console.log(currentLocation);
    
    
>>>>>>> 695b0bffa69d6cfcbabba19ac4e8c2e4693823fb
    function handleDownloadFile(files){

        const dbx = new Dropbox({
            accessToken: token,
            fetch: fetch
            });

        let path = currentLocation;
        if(path === '/') {
           path = '';
        }

        dbx.filesListFolder({
            path,
        })
        .then(response => {
<<<<<<< HEAD
=======
            //console.log(response);
>>>>>>> 695b0bffa69d6cfcbabba19ac4e8c2e4693823fb
            const files = response.entries;
            const entries = response.entries.map(file=>(
                {
                    path: file.path_lower,
                size: 'w32h32'
                }
            ))

            dbx.filesGetThumbnailBatch({
                entries
            })
            .then(response => {
                const thumbnails = {};

                response.entries.forEach((entry) => {
                    if (entry.metadata) {
                        thumbnails[entry.metadata.id] = entry.thumbnail;
                    }
                });

                updateThumbnails(thumbnails);
            })
            updateFiles(response.entries);
        })
        .catch(error => {
            console.error(error);
        });
    }


    function filesSearch(files){
      const dbx = new Dropbox({
           accessToken: token,
           fetch: fetch,
          });

          dbx.filesSearch({
            path: "",
            query: searchQuery,
          })
          .then(response => {
            updateFiles(response.matches.map(x => x.metadata));
          })
          .catch(error => {
              console.error(error);
          });

    }

    useEffect(() => {
        const subscriptions = [
          token$.subscribe(setToken),
          searchQuery$.subscribe(setSearchQuery),
        ];

        handleDownloadFile();
        return () => subscriptions.forEach((subscription) => subscription.unsubscribe());
    }, [currentLocation, searchQuery]);

<<<<<<< HEAD


=======
>>>>>>> 695b0bffa69d6cfcbabba19ac4e8c2e4693823fb
    useEffect(() => {
      if (searchQuery.length === 0) {
        handleDownloadFile();
      }

      filesSearch();
    }, [searchQuery]);

<<<<<<< HEAD

=======
    //console.log(files);
    
>>>>>>> 695b0bffa69d6cfcbabba19ac4e8c2e4693823fb
    return(
      <div>
      <h3>Hem{currentLocation}</h3>

        <table>
             <thead>
                <tr>
                    <th>Thumbnail</th>
                    <th>File Type</th>
                    <th>Name</th>
                    <th>Modified</th>
                    <th>Size</th>
                    <th>...</th>
                </tr>
            </thead>
           <tbody>
               {files.map(file => {
                   return (
                        <tr key = {file.id}>
                            <td><Thumbnail file = {file} thumbnail={thumbnails[file.id]}/></td>
                            <td>{file[".tag"]}</td>
                            <td>
                                {file[".tag"] === "folder" ? (
                                    <Link to={"/main" + file.path_lower}>{file.name}</Link>
                                ): file.name}
                            </td>
                            <td>{file.client_modified}</td>
                            <td><FileSize file = {file.size}/></td>
                            <td>...</td>
                        </tr>
                    )
                   })}
            </tbody>
        </table>
    );
}
