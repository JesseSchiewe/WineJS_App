import React, { useState, useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import WineReviewForm from './WineReviewForm';
import { GetReviewData } from './GetReviewData';


export default function CreateReviewForm({ReviewName, user}) {
    const [data, setData] = useState(null)
    const selectedReview = ReviewName
    const currentUser = user.uid

    let dbpathref = '/users/' + user.uid + "/" + ReviewName + '/data'

    console.log(dbpathref);

    console.log("CreateReview VARS: ");
    console.log(ReviewName);
    console.log(currentUser);

    useEffect(() => {
        const fetchData = async () => {
            setData(await GetReviewData(dbpathref));
            // setData(await GetReviewData({ReviewName, user}))
        }
        fetchData()
    }, [])

    console.log('CREATEREVIEWFORM REVIEW DATA:')
    console.log(data)

    console.log("FETCHED DATA");
    console.log(data);

    return data ? <WineReviewForm preloadedValues={data} /> : <div>Loading...</div>
}

