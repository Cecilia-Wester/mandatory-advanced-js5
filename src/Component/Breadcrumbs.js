import React from 'react';
import { Link } from "react-router-dom";

export default function Breadcrumbs({location}){ 
    let pathpieces=location.pathname.split('/');
    pathpieces.shift();
    let link = [];

    let current = "";

    for (let i = 0; i < pathpieces.length; i++) {
        current += "/" + pathpieces[i];
        link.push(current);
    }

    pathpieces[0] = "Hem";
    
    return(
        <div className='breadcrumbs'>
        {pathpieces.map((pathpiece, idx) => {
            return(
                <ul key = {pathpiece}>
                    <li><Link to={link[idx]}>{pathpiece}</Link></li>
                </ul>
            )})
        }
        </div>
    )
}
