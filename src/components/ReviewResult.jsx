import React, { useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import "firebase/compat/database";
import { UserContext } from "../providers/UserProvider";
import Select from 'react-select';
import { useEffect } from 'react';
import CreateReviewForm from './CreateReviewForm';
import RadarChart from './RadarChart';
import { colorStyles } from './SelectionBoxStyling';
import HorizontalSelector from './HorizontalSelector';
import DataTable from './ResultsDataGrid';

export const ReviewResult = () => {
  const user = useContext(UserContext);
  const RunType = useLocation().pathname;
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

  const [menuBarOption, setMenuBarOption] = useState("All");

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

  const [wineitems, setWineItems] = useState([]);

  useEffect(() => {
    var returnArrWineItems = []; 
    var itemList = "";     
    querywi.once("value").then(function (snapshotWI) {
      snapshotWI.forEach(function (childSnapshotWI) {
        var wName = childSnapshotWI.key 
        itemList = ({ wine:wName })
        wineSortCategories.forEach(function getCategoryData(category) {
          var currentValue = childSnapshotWI.child("data").child(category).val();  
          itemList = ({ ...itemList,[category]:currentValue});
        });
        returnArrWineItems.push({ ...itemList });
      });
    });
    setWineItems(returnArrWineItems);
  }, []);

  return (
    // <UserProvider>
      <div>
        <div hidden={!showResultsHeader}>
            <h1>
                Results
            </h1>
        </div>
        <div className='Center'>
          <HorizontalSelector clickhandler={setMenuBarOption} options={["All","Favorites","Compare"]} style={{alignItems: "center"}} />
        </div>
        <div className="FavoriteWines" hidden={hideResults} >
          <div hidden={menuBarOption !== "All"}>
            <form>
              <Select options={ winearray } className="selectBox" isSearchable={true} placeholder="Select Review" styles={colorStyles} onChange={e => {handleChange(e.value); setHideReview(false)} } />
            </form>
          </div>
          <div className="Center" hidden={hideResults} >
            {menuBarOption === "Favorites" &&
              <div style={{marginTop:'1em'}}>
                <DataTable data={wineitems} clickhandler={setWineReviewName} hidesection={setHideReview}/>
              </div>
            }
          </div>
        </div>

        <div key={wineReviewName}>
          
          <div id='Compare' style={{border:'2px solid black'}} >
              <div id='CompareRadar' hidden={menuBarOption !== "Compare"}>
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
                    styles={colorStyles}
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
    // </UserProvider>
  );
}
