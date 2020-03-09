import React, {useEffect, useState} from 'react';
import {updateSearchQuery} from '../../store';
import {DebounceInput} from 'react-debounce-input';


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
      <i className = 'material-icons'>search</i>
      <DebounceInput
        minLength={2}
        debounceTimeout={200}
        type= "text"
        value={search}
        onChange={updateSearch}
      />
    </div>
  )
}
