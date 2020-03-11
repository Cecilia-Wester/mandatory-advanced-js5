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
            <ul style={{
                    display: "flex",
                    flexWrap: 'wrap',
                    flexDirection: 'row',
                }}>
                {pathpieces.map((pathpiece, idx) => {
                    return( 
                            <li key = {pathpiece} className='pathpiece' style={{listStyle: 'none'}}>
                                <Link to={link[idx]}>{pathpiece}</Link>
                                {
                                    idx === pathpieces.length - 1
                                    ? null
                                    : <span style={{ marginLeft: 10, marginRight: 10 }}>&gt;</span>
                                }
                            </li>
                    )})
                }
            </ul>
        </div>
    )
}
