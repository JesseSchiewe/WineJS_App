import React, { useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import firebase from 'firebase';
import UserProvider, { UserContext } from "../providers/UserProvider";
import Select from 'react-select';
import { useEffect } from 'react';
import CreateReviewForm from './CreateReviewForm';
import RadarChart from './RadarChart';

export const ReviewResult = () => {
  const user = useContext(UserContext);
  const RunType = useLocation().pathname;
  const [ SortByCategory, setSortByCategory ] = useState("Total");
  const [ wineReviewName, setWineReviewName ] =useState(null);

  const [ compareList, setCompareList ] = useState([]);
  const handleChangeCompare = (obj) => {
    setCompareList(obj);
  };


  
  var dbWineNames = '/users/' + user.uid + "/"
  var query = firebase.database().ref(dbWineNames).orderByKey();

  // var winearray = [];
  const [ winearray, setWinearray ] = useState();


  function handleChange(e){
    setWineReviewName(e);
  }

  // function SetWineArray() {
  //   var returnArr = [];         
  //     query.once("value").then(function (snapshot) {
  //       snapshot.forEach(function (childSnapshot) {
  //           returnArr.push({ label:childSnapshot.key, value:childSnapshot.key});  
  //       });
  //     });
  //   console.log('running SETWINEARRAY AGAIN');
  //   winearray = returnArr
  //   return returnArr
  // }
  // SetWineArray()

  // var returnArr = [];
  function SetWineArray() {
    useEffect(() => {
      var returnArr = [];         
        query.once("value").then(function (snapshot) {
          snapshot.forEach(function (childSnapshot) {
              returnArr.push({ label:childSnapshot.key, value:childSnapshot.key});
              // winearray.push({ label:childSnapshot.key, value:childSnapshot.key});
          });
        });
      // console.log('running SETWINEARRAY AGAIN');
      // console.log(winearray);
      // winearray = returnArr
      setWinearray(returnArr);
      // return returnArr
    }, []);
  }
  SetWineArray();

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
  const [hideCompare, setHideCompare] = useState(true);

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

  // const [wineitems, setWineitems] = useState([]);


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
          <div className="Center" hidden={hideResults} >
            <button type="StandardButton" onClick={() => {sortResults(SortByCategory); setHideSortedResults(!hideSortedResults); setHideReview(true)}} >Show/Hide Favorite Wines</button>
            {hideSortedResults ? "" : (
              <form>
                <Select options={ sortOptions } className="selectBox" placeholder="Sort By" isSearchable={true} onChange={(e) => {sortResults(e.value); setSortByCategory(e.value) }}   />
              </form>
            )}

            {hideSortedResults ? "" : (
              <div style={{marginTop:'1em'}}>
                <h6>
                  Sorted by {SortByCategory}
                </h6>
                <p/>

                <table style={{textAlign: 'left'}}>
                  <tr key='tableLabels'>
                    <th style={{ borderBottom: 'solid 1px black', borderRight: 'solid 1px black'}}>
                      Result
                    </th>
                    <th style={{borderBottom: 'solid 1px black'}}>
                      Wine Name
                    </th>
                  </tr>
                    
                    {hideSortedResults ? "" : sortedReviews.map((wineitem, i) => {
                      return (
                        <tr key={i}>
                          <td style={{borderRight: 'solid 1px black', borderBottom: 'solid 1px black'}}>
                            {wineitem[SortByCategory]}
                          </td>
                          <td style={{borderBottom: 'solid 1px black'}}>
                            <b className="wineReviewName" value={wineitem.wine} onClick={() => {handleChange(wineitem.wine); setHideSortedResults(true) ; setHideReview(false) }} >{wineitem.wine} </b>
                          </td>
                        </tr>
                      )})
                    }

                </table>
              </div>
            )}
          </div>
        </div>

        <div key={wineReviewName}>
          <div id='Compare' style={{border:'2px solid black'}}>
            TESTING COMPARE RESULTS
            {/* {console.log(winearray)} */}
              {/* {hideReview ? "" :  */}
                <div id='Radar' style={{ margin: 'auto'}}>
                  <Select
                    closeMenuOnSelect={false}
                    closeMenuOnScroll={false}
                    onMenuOpen={() => setHideCompare(true)}
                    onClick={null}
                    isSearchable={false}
                    isMulti
                    name="CompareSelector"
                    placeholder="Select to Compare"
                    blurInputOnSelect={false}
                    options={winearray}
                    // onChange={e => {
                    //   setCompareList((Array.isArray(e) ? e.map(x => x.value) : []));
                    // }}

                    // onChange={(option) => handleChangeCompare(option)}
                    // onChange={(option) => handleChangeCompare(option)}
                    
                    onChange={(option) => handleChangeCompare(option.map(x => x.value))}
                    // onChange={(option) => {handleChangeCompare(option.map(x => x.value)), setHideCompare(true)}}

                    // onMenuClose={e => {
                    //   setCompareList((Array.isArray(e) ? e.map(x => x.value) : []));
                    // }}
                    onMenuClose={e=> {setHideCompare(false)}}
                  />


                  {/* <button type="button" style={{margin:'5px', fontSize:'14px', alignContent:'center', display:'flex', alignSelf:'center'}} className="winetoolsbutton" onClick={() => setHideCompare(false)} >Show Comparison</button> */}

                  {hideCompare ? "" :
                    <RadarChart ReviewName={compareList} user={user} /> 
                  }
                  
                  {/* <RadarChart ReviewName={compareList} user={user} /> */}

                  {/* <CompareResults ReviewName={wineReviewName} user={user} /> */}
                </div>
              {/* } */}
            END TESTING COMPARE RESULTS
          </div>

          {hideReview ? "" : 
            <div id='Radar' style={{ margin: 'auto'}}>
              <RadarChart ReviewName={wineReviewName} user={user} />
            </div>
          }

          {hideReview ? "" : <CreateReviewForm ReviewName={wineReviewName} user={user} /> }
        </div>

      </div>
    </UserProvider>
  );
}
