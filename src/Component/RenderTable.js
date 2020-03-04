import React, { useEffect, useState} from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import { Dropbox } from 'dropbox';
import {token$, updateToken, searchQuery$} from '../store';
import SideBar from './Sidebar/SideBar';

export default function RenderTable(props) {

    const [token, setToken] = useState(token$.value);
    const [searchQuery, setSearchQuery] = useState(searchQuery$.value);
    const [files, updateFiles] = useState([]);

    const currentLocation = props.location.pathname.substring(5);
    console.log(currentLocation);

    function handleDownloadFile(files){
        console.log(props);

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

    useEffect(() => {
      if (searchQuery.length === 0) {
        handleDownloadFile();
      }

      filesSearch();
    }, [searchQuery]);

    return(
      <div>
      <h3>Hem{currentLocation}</h3>
      <table>
        <thead>
          <tr>

            <th>Namn</th>
            <th>Modified</th>
            <th>...</th>
          </tr>
        </thead>
        <tbody>
          {files.map(file => {
              return (
                <tr key = {file.id}>
                  <td>{file[".tag"]}</td>
                  <td>
                    {file[".tag"] === "folder" ? (
                      <Link to={"/main" + file.path_lower}>{file.name}</Link>
                    ): file.name}
                  </td>
                  <td></td>
                  <td>...</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    );
}
