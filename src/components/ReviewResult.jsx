import React, { useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import firebase from 'firebase';
import UserProvider, { UserContext } from "../providers/UserProvider";
import Select from 'react-select';
import { useEffect } from 'react';
import CreateReviewForm from './CreateReviewForm';

export const ReviewResult = () => {
  const user = useContext(UserContext);
  const RunType = useLocation().pathname;
  const [ SortByCategory, setSortByCategory ] = useState("Total");
  const [ wineReviewName, setWineReviewName ] =useState(null);

  // var dbpathref = '/users/' + user.uid + "/" + wineReviewName + '/data'
  var dbWineNames = '/users/' + user.uid + "/"

  var query = firebase.database().ref(dbWineNames).orderByKey();   
  var winearray = [];

  function handleChange(e){
    setWineReviewName(e);
    console.log(e);
    // dbpathref = '/users/' + user.uid + "/" + wineReviewName + '/data'
  }

  function SetWineArray() {
    var returnArr = [];         
      query.once("value").then(function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            returnArr.push({ label:childSnapshot.key, value:childSnapshot.key});  
        });
      });
    winearray = returnArr
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

  // const date = new Date();
  // const today = (date.getMonth()+1) + '-' + date.getDate() + '-' + date.getFullYear()

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

  // const [ deleteReviewRef, setDeleteReviewRef ] = useState();

  // const [ firebaseData, setFirebaseData ] = useState();
    
  // function SetReviewData() {
  //   firebase.database().ref(dbpathref).on('value', (snapshot) => {
  //       setDeleteReviewRef('users/' + user.uid + "/" + wineReviewName);
  //       setFirebaseData(snapshot);
  //       console.log("FIREBASE DATA:");
  //       console.log(snapshot);
  //       console.log(firebaseData);   
  //   });
  // }

  return (
    <UserProvider>
      <div>
        <div hidden={!showResultsHeader}>
            <h1>
                Results
            </h1>                  
        </div>

        <div className="FavoriteWines" hidden={hideResults} >
          <form>
            <Select options={ winearray } className="selectBox" isSearchable={true} placeholder="Select Review" onChange={e => {handleChange(e.value); setHideReview(false); setHideSortedResults(true)} } />
          </form>
          <p/>
          <div className="SortedResults" hidden={hideResults} >
            <button type="button" onClick={() => {sortResults(SortByCategory); setHideSortedResults(!hideSortedResults); setHideReview(true)}} >Show/Hide Favorite Wines</button>
            {hideSortedResults ? "" : (
              <form>
                {/* <Select options={ sortOptions } className="selectBox" isSearchable={true} onChange={() => {sortResults("total"); toggleHideSortedResults()}}   /> */}
                <Select options={ sortOptions } className="selectBox" placeholder="Sort By" isSearchable={true} onChange={(e) => {sortResults(e.value); setSortByCategory(e.value) }}   />
              </form>
            )}
            {hideSortedResults ? "" : (
              <div>
                <h7>
                  Sorted by {SortByCategory}
                </h7>
                <p/>
              </div>
            )}
            {hideSortedResults ? "" : sortedReviews.map((wineitem, i) => {
                return (
                  <div>
                    <h7 key={i}>
                      {wineitem[SortByCategory]}  |  <b className="wineReviewName" value={wineitem.wine} onClick={() => {handleChange(wineitem.wine); setHideSortedResults(true) ; setHideReview(false) }} >{wineitem.wine} </b>
                    </h7>
                  </div>
                );
            })}
          </div>
        </div>

        <div key={wineReviewName}>
          {hideReview ? "" : <CreateReviewForm ReviewName={wineReviewName} user={user} /> }
        </div>

      </div>
    </UserProvider>
  );
}