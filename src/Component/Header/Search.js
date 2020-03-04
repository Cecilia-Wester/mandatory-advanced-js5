import React, {useEffect, useState} from 'react';
import { Dropbox } from 'dropbox';
import {updateSearchQuery} from '../../store';
import MaterialIcon from "material-icons-react";



export default function Search() {
  const [search, setSearch] = useState("");

  function updateSearch(e){
    setSearch(e.target.value);
  }

  useEffect(() => {
    updateSearchQuery(search);
  }, [search]);


  return(
    <div className="search">

      <MaterialIcon icon="search"/>
      <input
        type= "text"
        value={search}
        onChange={updateSearch}
      />
    </div>
  )
}
