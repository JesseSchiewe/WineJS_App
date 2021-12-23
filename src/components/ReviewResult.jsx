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
  const [ winearray, setWinearray ] = useState();

  function handleChange(e){
    setWineReviewName(e);
  }

  function SetWineArray() {
    useEffect(() => {
      var returnArr = [];         
        query.once("value").then(function (snapshot) {
          snapshot.forEach(function (childSnapshot) {
              returnArr.push({ label:childSnapshot.key, value:childSnapshot.key});
          });
        });
      setWinearray(returnArr);
    }, []);
  }
  SetWineArray();

  const [hideSortedResults, setHideSortedResults] = useState(true);
  const [hideCompareDiv, setHideCompareDiv] = useState(true);
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
          
          <div id='Compare' style={{border:'2px solid black'}} >
            <button type="StandardButton" onClick={() => setHideCompareDiv(!hideCompareDiv)} >Show/Hide Comparison</button>

              <div id='CompareRadar' hidden={hideCompareDiv}>
                Compare Results
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
                    onChange={(option) => handleChangeCompare(option.map(x => x.value))}
                    onMenuClose={e=> {setHideCompare(false)}}
                  />
                  {hideCompare ? "" :
                    <RadarChart ReviewName={compareList} user={user} /> 
                  }
                </div>
            </div>
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
