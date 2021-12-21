import React, { useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import firebase from 'firebase';
import UserProvider, { UserContext } from "../providers/UserProvider";
import Select from 'react-select';
import { useEffect } from 'react';
import CreateReviewForm from './CreateReviewForm';

import { ResponsiveRadar } from '@nivo/radar';
import RadarChart from './RadarChart';

export const ReviewResult = () => {
  const user = useContext(UserContext);
  const RunType = useLocation().pathname;
  const [ SortByCategory, setSortByCategory ] = useState("Total");
  const [ wineReviewName, setWineReviewName ] =useState(null);

  var dbWineNames = '/users/' + user.uid + "/"

  var query = firebase.database().ref(dbWineNames).orderByKey();   
  var winearray = [];

  function handleChange(e){
    setWineReviewName(e);
    // console.log(e);
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

  const data = [
    {
      "taste": "fruity",
      "chardonay": 88,
      "carmenere": 99,
      "syrah": 56
    },
    {
      "taste": "bitter",
      "chardonay": 91,
      "carmenere": 59,
      "syrah": 92
    },
    {
      "taste": "heavy",
      "chardonay": 97,
      "carmenere": 35,
      "syrah": 57
    },
    {
      "taste": "strong",
      "chardonay": 82,
      "carmenere": 87,
      "syrah": 59
    },
    {
      "taste": "sunny",
      "chardonay": 83,
      "carmenere": 70,
      "syrah": 74
    }
  ]

  const MyResponsiveRadar = ({ data /* see data tab */ }) => (
    <ResponsiveRadar
      data={data}
      keys={[ 'chardonay', 'carmenere', 'syrah' ]}
      indexBy="taste"
      valueFormat=">-.2f"
      margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
      borderColor={{ from: 'color' }}
      gridLabelOffset={36}
      dotSize={10}
      dotColor={{ theme: 'background' }}
      dotBorderWidth={2}
      colors={{ scheme: 'nivo' }}
      blendMode="multiply"
      motionConfig="wobbly"
      legends={[
        {
          anchor: 'top-left',
          direction: 'column',
          translateX: -50,
          translateY: -40,
          itemWidth: 80,
          itemHeight: 20,
          itemTextColor: '#999',
          symbolSize: 12,
          symbolShape: 'circle',
          effects: [
            {
              on: 'hover',
              style: {
                itemTextColor: '#000'
              }
            }
          ]
        }
      ]}
    />
  )


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
            
          {console.log(wineReviewName)}

          {hideReview ? "" : 
            // <div style={{height: '700px', width: '700px', display: 'flex', alignSelf: 'center', alignItems: 'center'}}>
            <div style={{ margin: 'auto'}}>
            {/* <div style={{ display: 'flex', alignSelf: 'center', alignItems: 'center', margin: 'auto'}}> */}
              <RadarChart ReviewName={wineReviewName} user={user} />
              {/* <RadarChart  /> */}
              {/* <MyResponsiveRadar data={data} /> */}
            </div>
          }

          {hideReview ? "" : <CreateReviewForm ReviewName={wineReviewName} user={user} /> }
        </div>

      </div>
    </UserProvider>
  );
}
