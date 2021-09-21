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
import CreateReviewForm from './CreateReviewForm';

import WineColorChart from './Style/WineColorChart.jpg';
import WineTastingGrid from './Style/WineTastingGrid.jpg';
import { WineReviewForm } from './WineReviewForm';

export const ReviewResult = () => {
  const user = useContext(UserContext);
  const RunType = useLocation().pathname;

  var wineReviewName = ""
  var dbpathref = '/users/' + user.uid + "/" + wineReviewName + '/data'
  var dbWineNames = '/users/' + user.uid + "/"

  var query = firebase.database().ref(dbWineNames).orderByKey();   
  var test = [];

  function handleChange(e){
      wineReviewName = e;
      dbpathref = '/users/' + user.uid + "/" + wineReviewName + '/data'
      //setReviewData()
    //   SetReviewData()
  }

  function SetWineArray() {
    var returnArr = [];         
      query.once("value").then(function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            returnArr.push({ label:childSnapshot.key, value:childSnapshot.key});  
        });
      });
    test = returnArr
    return returnArr
  }
  SetWineArray()

  const [hideSortedResults, setHideSortedResults] = useState(true);
  var dbWineNamesWI = '/users/' + user.uid + "/"
  var querywi = firebase.database().ref(dbWineNamesWI).orderByKey();

  var hideReviewToggleStart = ""
  var hideResultsStart = ""
  var showResultsHeader = ""
  if ( RunType === "/reviewresult" ) {
    hideReviewToggleStart = true;
    showResultsHeader = true;
  }
  if ( RunType === "/review" ) {
    hideResultsStart = true
  }
  const [hideReview, setHideReview] = useState(hideReviewToggleStart);
  const hideResults = hideResultsStart;

  const date = new Date();
  const today = (date.getMonth()+1) + '-' + date.getDate() + '-' + date.getFullYear()

  const wineSortCategories = [
    "ActualPrice",
    "Appellation",
    "Balance",
    "FlavorCharacteristics",
    "FlavorIntensity",
    "Length",
    "NoseIntensity",
    "Producer",
    "ReviewDate",
    "Total",
    "Vintage",
    "WineName",
    "WineValue"
  ];



  var wineitems = [];
  function SetWineArrayItems() { 
    useEffect(() => {
      var returnArrWineItems = []; 
      var itemList = "";        
      querywi.once("value").then(function (snapshotWI) {
        snapshotWI.forEach(function (childSnapshotWI) {
          var wName = childSnapshotWI.key 
          itemList = ({ wine:wName })
          wineSortCategories.forEach(function getCategoryData(category) {
            var currentValue = childSnapshotWI.child("data").child(category).val();  
            itemList = ({ ...itemList,[category]:currentValue})
          });
          wineitems.push({ ...itemList })
          returnArrWineItems.push({ ...itemList })
        });
        //console.log(wineitems)
      });
    }, []);
  }

  SetWineArrayItems()

  const sortOptions = wineSortCategories.map((category) =>
    ({label:category,value:category})
  );

  const [sortedReviews, setSortedReviews] = useState(wineitems);
  function sortResults(sortColumn) {
    const sorted = [...sortedReviews].sort((a, b) => {
      return b[sortColumn] - a[sortColumn]
    });
    setSortedReviews(sorted);
  };

//   const [ SortByCategory, setSortByCategory ] = useState("Total");
//   const [ Appellation, setAppellation ] = useState();
//   const [ Balance , setBalance ] = useState(0);
//   const [ BalanceNotes, setBalanceNotes ] = useState();
//   const [ FlavorCharacteristics, setFlavorCharacteristics ] = useState(0);
//   const [ selectedFlavors, setselectedFlavors ] = useState([]);
//   const [ selectedAromas, setselectedAromas ] = useState([]);
//   const [ FlavorCharacteristicsNotes, setFlavorCharacteristicsNotes ] = useState();
//   const [ FlavorIntensity, setFlavorIntensity ] = useState(0);
//   const [ FlavorIntensityNotes, setFlavorIntensityNotes ] = useState();
//   const [ Length, setLength ] = useState(0);
//   const [ LengthNotes, setLengthNotes ] = useState();
//   const [ NoseIntensity, setNoseIntensity ] = useState(0);
//   const [ NoseIntensityNotes, setNoseIntensityNotes ] = useState();
//   const [ Producer, setProducer ] = useState();
//   const [ TastingNotes, setTastingNotes ] = useState();
//   const [ Vintage, setVintage ] = useState();
//   const [ WineName1, setWineName1 ] = useState();
//   const [ ReviewDate, setReviewDate ] = useState(today);
//   const [ ActualPrice, setActualPrice ] = useState();
//   const [ WineValue, setWineValue ] = useState();
  
  // const [ totalValue, setTotalValue ] = useState();

  const [ deleteReviewRef, setDeleteReviewRef ] = useState();

  // TESTING ONLY -- DELETE THIS PART!!!

  const [ firebaseData, setFirebaseData ] = useState();
    
  function SetReviewData() {
    firebase.database().ref(dbpathref).on('value', (snapshot) => {
        setDeleteReviewRef('users/' + user.uid + "/" + wineReviewName);
        setFirebaseData(snapshot);
        console.log("FIREBASE DATA:");
        console.log(snapshot);
        console.log(firebaseData);   
    });    
    // CreateReviewForm(wineReviewName);
  }

//   const [ formData, setFormData ] = useState({
//     Appellation: firebaseData.Appellation,
//     Balance: firebaseData.Balance
//   });    
    // console.log(formData);
    // console.log(formData.Appellation);
    // console.log(formData.Balance);

//   const changeHandler = e => {
//     setFormData( prevValues => {
//       return { ...formData,[e.target.name]: e.target.value}
//     });
//   }









    // firebase.database().ref(dbpathref).on('value', (snapshot) => {        
    //     setDeleteReviewRef('users/' + user.uid + "/" + wineReviewName);
    //     // console.log(snapshot.val());
  
//         setAppellation(snapshot.val().Appellation);
//         setValue("Appellation", snapshot.val().Appellation);
  
//         setBalance(snapshot.val().Balance);
//         setValue("Balance", snapshot.val().Balance);
  
//         setBalanceNotes(snapshot.val().BalanceNotes);
//         setValue("BalanceNotes", snapshot.val().BalanceNotes);
  
//         setFlavorCharacteristics(snapshot.val().FlavorCharacteristics);
//         setValue("FlavorCharacteristics", snapshot.val().FlavorCharacteristics);
  
//         setFlavorCharacteristicsNotes(snapshot.val().FlavorCharacteristicsNotes);
//         setValue("FlavorCharacteristicsNotes", snapshot.val().FlavorCharacteristicsNotes);
  
//         setFlavorIntensity(snapshot.val().FlavorIntensity);
//         setValue("FlavorIntensity", snapshot.val().FlavorIntensity);
  
//         setFlavorIntensityNotes(snapshot.val().FlavorIntensityNotes);
//         setValue("FlavorIntensityNotes", snapshot.val().FlavorIntensityNotes);
  
//         setLength(snapshot.val().Length);
//         setValue("Length", snapshot.val().Length);
  
//         setLengthNotes(snapshot.val().LengthNotes);
//         setValue("LengthNotes", snapshot.val().LengthNotes);
  
//         setNoseIntensity(snapshot.val().NoseIntensity);
//         setValue("NoseIntensity", snapshot.val().NoseIntensity);
  
//         setNoseIntensityNotes(snapshot.val().NoseIntensityNotes);
//         setValue("NoseIntensityNotes", snapshot.val().NoseIntensityNotes);
  
//         setProducer(snapshot.val().Producer);
//         setValue("Producer", snapshot.val().Producer);
  
//         setselectedAromas(snapshot.val().Aromas);
//         setValue("Aromas", snapshot.val().Aromas);
  
//         setselectedFlavors(snapshot.val().Flavors);
//         setValue("Flavors", snapshot.val().Flavors);
  
//         setTastingNotes(snapshot.val().TastingNotes);
//         setValue("TastingNotes", snapshot.val().TastingNotes);
  
//         setVintage(snapshot.val().Vintage);
//         setValue("Vintage", snapshot.val().Vintage);
        
//         setWineName1(snapshot.val().WineName);
//         setValue("WineName", snapshot.val().WineName)
  
//         setReviewDate(snapshot.val().ReviewDate);
//         setValue("ReviewDate", snapshot.val().ReviewDate);
  
//         setActualPrice(snapshot.val().ActualPrice);
//         setValue("ActualPrice", snapshot.val().ActualPrice);
  
//         setWineValue(snapshot.val().WineValue);
//         setValue("WineValue", snapshot.val().WineValue);
  
//         // setTotalValue(snapshot.val().Total);
//         setValue("totalValue", snapshot.val().Total);
//       });
//   })


  // END OF TESTING ONLY







//   // const { register, handleSubmit, setValue, formState: { errors } } = useForm();
//   const { register, watch, handleSubmit, setValue, formState: { errors } } = useForm();

//   // const watchFields = watch(["Aromas","Flavors"])

//   let totalValue = (Number(Balance) + Number(Length) + Number(FlavorCharacteristics) + Number(FlavorIntensity) + Number(NoseIntensity))
//   if ( totalValue !== 0 ) {
//     totalValue = 50 + totalValue
//   } 

//   function setReviewData() {
//     firebase.database().ref(dbpathref).on('value', (snapshot) => {        
//       setDeleteReviewRef('users/' + user.uid + "/" + wineReviewName);
//       // console.log(snapshot.val());

//       setAppellation(snapshot.val().Appellation);
//       setValue("Appellation", snapshot.val().Appellation);

//       setBalance(snapshot.val().Balance);
//       setValue("Balance", snapshot.val().Balance);

//       setBalanceNotes(snapshot.val().BalanceNotes);
//       setValue("BalanceNotes", snapshot.val().BalanceNotes);

//       setFlavorCharacteristics(snapshot.val().FlavorCharacteristics);
//       setValue("FlavorCharacteristics", snapshot.val().FlavorCharacteristics);

//       setFlavorCharacteristicsNotes(snapshot.val().FlavorCharacteristicsNotes);
//       setValue("FlavorCharacteristicsNotes", snapshot.val().FlavorCharacteristicsNotes);

//       setFlavorIntensity(snapshot.val().FlavorIntensity);
//       setValue("FlavorIntensity", snapshot.val().FlavorIntensity);

//       setFlavorIntensityNotes(snapshot.val().FlavorIntensityNotes);
//       setValue("FlavorIntensityNotes", snapshot.val().FlavorIntensityNotes);

//       setLength(snapshot.val().Length);
//       setValue("Length", snapshot.val().Length);

//       setLengthNotes(snapshot.val().LengthNotes);
//       setValue("LengthNotes", snapshot.val().LengthNotes);

//       setNoseIntensity(snapshot.val().NoseIntensity);
//       setValue("NoseIntensity", snapshot.val().NoseIntensity);

//       setNoseIntensityNotes(snapshot.val().NoseIntensityNotes);
//       setValue("NoseIntensityNotes", snapshot.val().NoseIntensityNotes);

//       setProducer(snapshot.val().Producer);
//       setValue("Producer", snapshot.val().Producer);

//       setselectedAromas(snapshot.val().Aromas);
//       setValue("Aromas", snapshot.val().Aromas);

//       setselectedFlavors(snapshot.val().Flavors);
//       setValue("Flavors", snapshot.val().Flavors);

//       setTastingNotes(snapshot.val().TastingNotes);
//       setValue("TastingNotes", snapshot.val().TastingNotes);

//       setVintage(snapshot.val().Vintage);
//       setValue("Vintage", snapshot.val().Vintage);
      
//       setWineName1(snapshot.val().WineName);
//       setValue("WineName", snapshot.val().WineName)

//       setReviewDate(snapshot.val().ReviewDate);
//       setValue("ReviewDate", snapshot.val().ReviewDate);

//       setActualPrice(snapshot.val().ActualPrice);
//       setValue("ActualPrice", snapshot.val().ActualPrice);

//       setWineValue(snapshot.val().WineValue);
//       setValue("WineValue", snapshot.val().WineValue);

//       // setTotalValue(snapshot.val().Total);
//       setValue("totalValue", snapshot.val().Total);
//     });
//   }



//   const [hideNoseNotes, toggleNoseNotes] = useToggle();
//   const [hideIntenseNotes, toggleIntenseNotes] = useToggle();
//   const [hideCharNotes, toggleCharNotes] = useToggle();
//   const [hideBalNotes, toggleBalNotes] = useToggle();
//   const [hideLenNotes, toggleLenNotes] = useToggle();
//   const [hidePurchase, togglePurchase] = useToggle();
//   const [hideNoseInfo, toggleNoseInfo] = useToggle();
//   const [hideFlavorIntensityInfo, toggleFlavorIntensityInfo] = useToggle();
//   const [hideFlavorCharacteristicsInfo, toggleFlavorCharacteristicsInfo] = useToggle();
//   const [hideBalanceInfo, toggleBalanceInfo] = useToggle();
//   const [hideLengthInfo, toggleLengthInfo] = useToggle();
//   const [hideColorChart, toggleColorChart] = useToggle();
//   const [hideTastingGrid, toggleTastingGrid] = useToggle();

//   const [toResults, setToResults] = useState(false);

//   function writeToDatabase(userId, data) {
//     firebase.database().ref('users/' + userId + '/' + data.Producer + ' ' + data.WineName + ' ' + ReviewDate).set({
//       data    
//     });
//   }

//   function deleteFromDatabase() {
//     firebase.database().ref(deleteReviewRef).remove();    
//   }

//   function onSubmit(data) {
//     if (data.errors) {
//       console.log("Errors are present.");
//       console.log(data.errors);
//     } else {
//       console.log("Successful");
//     }
//     data.Total = String(totalValue);
//     alert("Successfully submitted form");
//     writeToDatabase(user.uid,data);
//     setToResults(true);
//   }

//   function onUpdate(data) {
//     deleteFromDatabase();
//     data.Total = String(totalValue);
//     writeToDatabase(user.uid,data);
//     alert("Successfully updated review")
//     setToResults(true)
//   }

//   function onDelete() {
//     deleteFromDatabase();
//     window.location.reload();
//     alert("Successfully deleted review.")
//   }

  return (
    <UserProvider>
        <div>
            <div hidden={!showResultsHeader}>
                <h1>
                    Results
                </h1>                  
            </div>

            <CreateReviewForm ReviewName='P40 WN40 9-7-2021' user={user}/>

        </div>
    </UserProvider>
  );
}