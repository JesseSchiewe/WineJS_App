import React, { useState, useEffect } from 'react';
import WineReviewForm from './WineReviewForm';
import { GetReviewData } from './GetReviewData';
import { ExportReview } from './ExportReview';

export default function CreateReviewForm({ReviewName, user}) {
    const [data, setData] = useState(null)
    let dbpathref = '/users/' + user.uid + "/" + ReviewName + '/data'

    useEffect(() => {
        const fetchData = async () => {
            // console.log(dbpathref);
            setData(await GetReviewData(dbpathref));
            // setData(await GetReviewData({ReviewName, user}))
        }
        fetchData()
    }, [dbpathref])

    return data ? 
        (
            <div>
                <WineReviewForm preloadedValues={data} />
                <div className="Center">
                    <button type="StandardButton" onClick={() => ExportReview(data)} >Export Review</button>
                </div>
            </div>
        )
    : 
        <div className="Center">
            <h5>
                Loading Review Data...
            </h5>
        </div>

}
