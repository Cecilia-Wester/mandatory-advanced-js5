import React, {useEffect, useState} from 'react';
import {Redirect} from 'react-router-dom';
import queryString from 'query-string';
import {updateToken} from '../store';

export default function Auth(props) {
  const [redirect, updateRedirect] = useState(false);

function getAccessTokenFromUrl (){ //Parses the url and gets the access token if it is in the urls hash
  let parsed = queryString.parse(window.location.hash); //hash return the part of the URL that follows the # symbol
  console.log(parsed);
  let tokenAccess = parsed.access_token;
  updateToken(tokenAccess);
  updateRedirect(true);
}

useEffect(getAccessTokenFromUrl, []);
  if(redirect) {
    return <Redirect to= '/Main' />
  } else {
    return <h3>Redirecting...</h3>
  }
}
