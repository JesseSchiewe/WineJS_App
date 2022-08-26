import { Navigate } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import spinningglass from '../Style/spinningglass.gif'

export default function LoadingScreen() {
    const [ loading, setLoading ] = useState(true);

    useEffect (() => {
        setLoading(true);
        setTimeout(() => {
           setLoading(false)
        }, 300);
    }, []);

    return(
        <div>
            {loading ?
                <div className="Loading">     
                    {/* <img src={spinningglass} alt="loading..." className="CenterImage" />                        */}
                </div>
                :
                <Navigate to={{ pathname:"/home" }} />
            }
        </div>
    );
};

