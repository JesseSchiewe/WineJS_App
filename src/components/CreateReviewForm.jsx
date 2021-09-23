import React, { useState, useEffect } from 'react';
import WineReviewForm from './WineReviewForm';
import { GetReviewData } from './GetReviewData';


export default function CreateReviewForm({ReviewName, user}) {
    const [data, setData] = useState(null)
    // const selectedReview = ReviewName
    // const currentUser = user.uid

    let dbpathref = '/users/' + user.uid + "/" + ReviewName + '/data'
    
    
    // console.log(dbpathref);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         setData(await GetReviewData(dbpathref));
    //         // setData(await GetReviewData({ReviewName, user}))
    //     }
    //     fetchData()
    // }, [])

    useEffect(() => {
        const fetchData = async () => {
            console.log(dbpathref);
            setData(await GetReviewData(dbpathref));
            // setData(await GetReviewData({ReviewName, user}))
        }
        fetchData()
    }, [dbpathref])

    // console.log('CREATEREVIEWFORM REVIEW DATA:')
    // console.log(data)

    // console.log("FETCHED DATA");
    // console.log(data);

    return data ? <WineReviewForm preloadedValues={data} /> : <div>Loading...</div>
}

