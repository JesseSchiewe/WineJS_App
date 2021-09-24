import { Redirect } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import spinningglass from '../Style/spinningglass.gif'

export default function LoadingScreen() {
    const [ loading, setLoading ] = useState(true);

    useEffect (() => {
        setLoading(true);
        setTimeout(() => {
           setLoading(false)
        }, 2000);
    }, []);

    return(
        <div>
            {loading ?
                <div className="Loading">     
                    <img src={spinningglass} alt="loading..." className="CenterImage" />                       
                </div>
                :
                <Redirect to={{ pathname:"/home" }} />
            }
        </div>
    );
};

