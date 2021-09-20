import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import useToggle from './useToggle';
import { useLocation, Redirect } from 'react-router-dom';
import firebase from 'firebase';
import UserProvider, { UserContext } from "./providers/UserProvider";
import Select from 'react-select';
import { useEffect } from 'react';
import { RedWineFlavorOptions } from './components/WineFlavors';
import { formatGroupLabel, colorStyles } from './components/WineFlavorSelectBox';

import WineColorChart from './Style/WineColorChart.jpg';
import WineTastingGrid from './Style/WineTastingGrid.jpg';


export const GetReviewData = (dbpathref) => {
    
    console.log(dbpathref);

    let firebaseData = ''

    console.log("Checking for Review Data from FireBase")
    firebase.database().ref(dbpathref).on('value', (snapshot) => {
        // setDeleteReviewRef('users/' + user.uid + "/" + wineReviewName);
        firebaseData = snapshot.val();
        console.log('LOADED REVIEW DATA AGAIN')
        console.log("FIREBASE DATA:");
        // console.log(snapshot);
        console.log(firebaseData);
        console.log(snapshot.val());
    });
    // return(firebaseData); 


    return new Promise((resolve, reject) => {
        // const data = firebaseData
        // setTimeout(() => resolve(data), 1000)
        setTimeout(() => resolve(firebaseData), 1000) 
    })
}


function OTHERSTUFF(dbpathref) {
//   const user = useContext(UserContext);
//   const RunType = useLocation().pathname;
    // const [ firebaseData, setFirebaseData ] = useState();
    // let selectedReview = wineReviewName.ReviewName
    // let currentuser = user
    // console.log(user);
    // console.log(wineReviewName);

    console.log(dbpathref);

    let firebaseData = ''
    // const dbpathref = '/users/' + user.uid + "/" + wineReviewName + '/data'
    // console.log(wineReviewName, user);
    // console.log(user);
    // console.log("DB PATH REF:");
    // console.log(dbpathref);

    function LoadReviewData() {
        console.log("Checking for Review Data from FireBase")
        firebase.database().ref(dbpathref).on('value', (snapshot) => {
            // setDeleteReviewRef('users/' + user.uid + "/" + wineReviewName);
            firebaseData = snapshot.val();
            console.log('LOADED REVIEW DATA AGAIN')
            console.log("FIREBASE DATA:");
            // console.log(snapshot);
            console.log(firebaseData);
            console.log(snapshot.val());
            console.log(snapshot.val().Length);
        });
        // return(firebaseData);
    };

    LoadReviewData()

    return new Promise((resolve, reject) => {
        const data = firebaseData
        setTimeout(() => resolve(data), 1000)   
    })

    
//   function LoadReviewData() {
//     console.log("Checking for Review Data from FireBase")
//     firebase.database().ref(dbpathref).on('value', (snapshot) => {
//         // setDeleteReviewRef('users/' + user.uid + "/" + wineReviewName);
//         setFirebaseData(snapshot);
//         console.log("FIREBASE DATA:");
//         // console.log(snapshot);
//         console.log(firebaseData);
//     });
//   }





//    return (
//     //<UserProvider>
//         // {firebaseData}
        //  firebaseData
//         // console.log(firebaseData)
//     // </UserProvider>
//    );
}

