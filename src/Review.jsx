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


export const Review = () => {
  const user = useContext(UserContext);

  const RunType = useLocation().pathname;
  //console.log(RunType);

  var wineReviewName = ""
  var dbpathref = '/users/' + user.uid + "/" + wineReviewName + '/data'
  var dbWineNames = '/users/' + user.uid + "/"

  var query = firebase.database().ref(dbWineNames).orderByKey();   
  var test = [];

  function handleChange(e){
      wineReviewName = e;
      dbpathref = '/users/' + user.uid + "/" + wineReviewName + '/data'
      setReviewData()     
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
  //const [hideFavorites, toggleHideFavorites] = useToggle();
  //const [hideTopFlavorCharacteristics, toggleHideTopFlavorCharacteristics] = useToggle();  
  var dbWineNamesWI = '/users/' + user.uid + "/"
  var querywi = firebase.database().ref(dbWineNamesWI).orderByKey();

  var hideReviewToggleStart = ""
  var hideResultsStart = ""
  var showResultsHeader = ""
  if ( RunType === "/reviewresult" ) {
    hideReviewToggleStart = true
    showResultsHeader = true
  }
  if ( RunType === "/review" ) {
    hideResultsStart = true
    //console.log(hideResults)
    //var hideReviewToggleStart = false
  }
  const [hideReview, setHideReview] = useState(hideReviewToggleStart);
  //const [hideResults, setHideResults] = useState(hideResultsStart);
  const hideResults = hideResultsStart;
  
  //const [hideResults, toggleHideResults] = useToggle(hideResultsToggleStart);
  //console.log(hideResultsToggleStart)
  //console.log(hideResults)

  // const [hideReview, toggleHideReview] = useToggle(hideReviewToggleStart);
  //const [hideReview, setHideReview] = useState(hideReviewToggleStart);
  //console.log(hideReview)

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
  
  // var wineitems = [];
  // function SetWineArrayItems() {
  //     var returnArrWineItems = [];         
  //     querywi.once("value").then(function (snapshotWI) {
  //         snapshotWI.forEach(function (childSnapshotWI) {
  //             var wName = childSnapshotWI.key 
  //             var wTotal = childSnapshotWI.child("data").child("Total").val();
  //             var wFlavorCharacteristics = childSnapshotWI.child("data").child("FlavorCharacteristics").val();
  //             returnArrWineItems.push({ wine:wName, total:wTotal, flavorcharacteristics:wFlavorCharacteristics });
  //         });                
  //     });
  //     wineitems = returnArrWineItems
  //     return returnArrWineItems
  // }
  // SetWineArrayItems()
              
  
  //const [ currentItem, setCurrentItem ] = useState([])
  //const [ categoryItem, setCategoryItem ] = useState("")
  //setCurrentItem(currentItem => currentItem.concat(categoryItem))


  // var wineitems = [];
  // function SetWineArrayItems() {                
  //   var returnArrWineItems = []; 
  //   var itemList = "";        
  //   querywi.once("value").then(function (snapshotWI) {
  //     snapshotWI.forEach(function (childSnapshotWI) {
  //       var wName = childSnapshotWI.key 
  //       itemList = ({ wine:wName })
  //       wineSortCategories.forEach(function getCategoryData(category) {
  //         var currentValue = childSnapshotWI.child("data").child(category).val();  
  //         itemList = ({ ...itemList,[category]:currentValue})
  //       });
  //       wineitems.push({ ...itemList })
  //       returnArrWineItems.push({ ...itemList })
  //     });            
  //     // console.log(returnArrWineItems)
  //     console.log(wineitems)
  //   });
  // }
  //SetWineArrayItems()
  // useEffect(() => {
  //   SetWineArrayItems();
  // }, []); 
  // useEffect(() => {
  //   SetWineArrayItems();
  // }, []); 

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

  const [ SortByCategory, setSortByCategory ] = useState("Total");

  const [ Appellation, setAppellation ] = useState();
  const [ Balance , setBalance ] = useState(0);
  const [ BalanceNotes, setBalanceNotes ] = useState();
  const [ FlavorCharacteristics, setFlavorCharacteristics ] = useState(0);

  //const [ Flavors, setFlavors ] = useState();
  const [ selectedFlavors, setselectedFlavors ] = useState([]);
  const [ selectedAromas, setselectedAromas ] = useState([]);

  const [ FlavorCharacteristicsNotes, setFlavorCharacteristicsNotes ] = useState();
  const [ FlavorIntensity, setFlavorIntensity ] = useState(0);
  const [ FlavorIntensityNotes, setFlavorIntensityNotes ] = useState();
  const [ Length, setLength ] = useState(0);
  const [ LengthNotes, setLengthNotes ] = useState();
  const [ NoseIntensity, setNoseIntensity ] = useState(0);
  const [ NoseIntensityNotes, setNoseIntensityNotes ] = useState();
  const [ Producer, setProducer ] = useState();
  const [ TastingNotes, setTastingNotes ] = useState();
  //const [ Total, setTotal ] = useState();
  const [ Vintage, setVintage ] = useState();
  const [ WineName1, setWineName1 ] = useState();
  const [ ReviewDate, setReviewDate ] = useState(today);
  const [ ActualPrice, setActualPrice ] = useState();
  const [ WineValue, setWineValue ] = useState();

  const [ deleteReviewRef, setDeleteReviewRef ] = useState();

  const { register, handleSubmit, errors } = useForm();

  let totalValue = (Number(Balance) + Number(Length) + Number(FlavorCharacteristics) + Number(FlavorIntensity) + Number(NoseIntensity))
  if ( totalValue !== 0 ) {
    totalValue = 50 + totalValue
  } 

  function setReviewData() {
    firebase.database().ref(dbpathref).on('value', (snapshot) => {        
      setDeleteReviewRef('users/' + user.uid + "/" + wineReviewName);

      setAppellation(snapshot.val().Appellation);
      setBalance(snapshot.val().Balance);
      setBalanceNotes(snapshot.val().BalanceNotes);
      setFlavorCharacteristics(snapshot.val().FlavorCharacteristics);
      setFlavorCharacteristicsNotes(snapshot.val().FlavorCharacteristicsNotes);
      setFlavorIntensity(snapshot.val().FlavorIntensity);
      setFlavorIntensityNotes(snapshot.val().FlavorIntensityNotes);
      setLength(snapshot.val().Length);
      setLengthNotes(snapshot.val().LengthNotes);
      setNoseIntensity(snapshot.val().NoseIntensity);
      setNoseIntensityNotes(snapshot.val().NoseIntensityNotes);
      setProducer(snapshot.val().Producer);
      setselectedAromas(snapshot.val().Aromas);
      setselectedFlavors(snapshot.val().Flavors);
      setTastingNotes(snapshot.val().TastingNotes);
      //setTotal(snapshot.val().Total);
      setVintage(snapshot.val().Vintage);
      setWineName1(snapshot.val().WineName);
      setReviewDate(snapshot.val().ReviewDate);
      setActualPrice(snapshot.val().ActualPrice);
      setWineValue(snapshot.val().WineValue);
    });
  }

  const [hideNoseNotes, toggleNoseNotes] = useToggle();
  const [hideIntenseNotes, toggleIntenseNotes] = useToggle();
  const [hideCharNotes, toggleCharNotes] = useToggle();
  const [hideBalNotes, toggleBalNotes] = useToggle();
  const [hideLenNotes, toggleLenNotes] = useToggle();
  const [hidePurchase, togglePurchase] = useToggle();
  const [hideNoseInfo, toggleNoseInfo] = useToggle();
  const [hideFlavorIntensityInfo, toggleFlavorIntensityInfo] = useToggle();
  const [hideFlavorCharacteristicsInfo, toggleFlavorCharacteristicsInfo] = useToggle();
  const [hideBalanceInfo, toggleBalanceInfo] = useToggle();
  const [hideLengthInfo, toggleLengthInfo] = useToggle();
  const [hideColorChart, toggleColorChart] = useToggle();
  const [hideTastingGrid, toggleTastingGrid] = useToggle();

  const [toResults, setToResults] = useState(false);

  function writeToDatabase(userId, data) {
    firebase.database().ref('users/' + userId + '/' + data.Producer + ' ' + data.WineName + ' ' + ReviewDate).set({
      data    
    });
  }

  function deleteFromDatabase() {
    firebase.database().ref(deleteReviewRef).remove();    
  }

  function onSubmit(data) {
    alert("Successfully submitted form");
    writeToDatabase(user.uid,data);
    setToResults(true)
  }

  function onUpdate(data) {
    deleteFromDatabase();
    writeToDatabase(user.uid,data);
    alert("Successfully updated review");
    window.location.reload();
    setToResults(true)
  }

  function onDelete() {
    deleteFromDatabase();
    window.location.reload();
    alert("Successfully deleted review.")
  }

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
            <Select options={ test } className="selectBox" isSearchable={true} placeholder="Select Review" onChange={e => {handleChange(e.value); setHideReview(false); setHideSortedResults(true)} } />
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

        <div className="ReviewPage" hidden={hideReview} >
          <form className="reviewform" onSubmit={handleSubmit(onSubmit)}>          
            <div className="formbackground" >
              {hideResults ? (
                <div>
                  <h1>WineJS Review</h1>                  
                </div>
                )
              : (
                <div>
                  {/* <h1>Review Result</h1> */}
                  This is a past review. You may edit the review data and save the changes or delete the review from this page.             
                  <h2>Review Date</h2>
                  <input type="text" name="ReviewDate" value={ReviewDate ? ReviewDate : today} ref={register} />
                </div>
              )}       

              {/* {toResults ? <Redirect to={{ pathname:"/reviewresult", state: { data: sampleData }}} /> : null} */}
              {toResults ? <Redirect to={{ pathname:"/reviewresult" }} /> : null}

              <input type="hidden" id="ReviewDate" name="ReviewDate" defaultValue={ReviewDate} ref={register}/>
                      
              <h2>Producer</h2>
              <input type="text" placeholder="Who makes the wine?" defaultValue={Producer} name="Producer" ref={register} />

              <h2>Appellation</h2>
              <input type="text" placeholder="Where is the wine from? Ex: Napa Valley" name="Appellation" defaultValue={Appellation} ref={register} />

              <h2>Wine Name</h2>
              <input type="text" placeholder="Wine Name" defaultValue={WineName1} name="WineName" ref={register({required: "Wine Name is Required", maxLength: 100})} />
              {errors.WineName && <p>{errors.WineName.message}</p> }

              <h2>Vintage</h2>
              <input type="number" placeholder="Year" name="Vintage" defaultValue={Vintage} ref={register({min: 1900,max: 2030})} />

              <h3>Nose Intensity
                <button type="button" className="infobutton" onClick={toggleNoseInfo} onSubmit="" >info</button>
                <div>
                  <h5>
                    {hideNoseInfo ? "" : "How strong does the wine smell?"}
                  </h5>
                </div>
              </h3>
              <div class="value">{NoseIntensity}</div>
              <input type="range" id="NoseIntensity" name="NoseIntensity" min="1" max="5" defaultValue="0" value={NoseIntensity} onChange={e => setNoseIntensity(e.target.value)} ref={register} />
              <button type="button" onClick={toggleNoseNotes} value="" >Show/hide notes</button>
              <textarea type="small" name="NoseIntensityNotes" defaultValue={NoseIntensityNotes} hideit={hideNoseNotes ? "true" : "false"} ref={register} />
              <div name="AromaSelector" hidden={hideNoseNotes ? true : false} >
                <input type="hidden" id="Aromas" name="Aromas" defaultValue={selectedAromas} ref={register}/>

                <div class="selectedAromas">
                  Selected Aromas: {selectedAromas}
                </div>
                
                <Select
                  closeMenuOnSelect={false}
                  isMulti        
                  name="redWineAromaSelector"                
                  placeholder="Aroma Selector"
                  blurInputOnSelect={false}
                  options={RedWineFlavorOptions}
                  formatGroupLabel={formatGroupLabel}
                  defaultValue={selectedAromas}
                  onChange={e => {
                    setselectedAromas(Array.isArray(e) ? e.map(x => x.value) : [])
                    //console.log(selectedFlavors)
                  }}                  
                  styles={colorStyles}
                />
              </div>
              {errors.NoseIntensity && <p>Value must be at least 1</p> }

              <h3>Flavor Intensity
                <button type="button" className="infobutton" onClick={toggleFlavorIntensityInfo} onSubmit="" >info</button>
                <div>
                  <h5>
                    {hideFlavorIntensityInfo ? "" : "How strong does the wine taste?"}
                  </h5>
                </div>
              </h3>
              <div class="value">{FlavorIntensity}</div>
              <input type="range" id="FlavorIntensity" name="FlavorIntensity" min="1" max="10" defaultValue="0" value={FlavorIntensity} onChange={e => setFlavorIntensity(e.target.value)} ref={register} />
              <button type="button" onClick={toggleIntenseNotes} value="" >Show/hide notes</button>
              <textarea type="small" name="FlavorIntensityNotes" defaultValue={FlavorIntensityNotes} hideit={hideIntenseNotes ? "true" : "false"} ref={register} />
              {errors.FlavorIntensity && <p>Value must be at least 1</p> }

              <h3>Flavor Characteristics
                <button type="button" className="infobutton" onClick={toggleFlavorCharacteristicsInfo} onSubmit="" >info</button>
                <div>
                  <h5>
                    {hideFlavorCharacteristicsInfo ? "" : "Do you like the way the wine tastes?"}
                  </h5>
                </div>
              </h3>              
              {/* <input type="range" id="FlavorCharacteristics" name="FlavorCharacteristics" min="0" max="25" defaultValue="0" onChange={e => updateTextInput(e.target.value,'FlavorScore')} ref={register} /> */}
              <div class="value">{FlavorCharacteristics}</div>
              <input type="range" id="FlavorCharacteristics" name="FlavorCharacteristics" min="1" max="25" defaultValue="0" value={FlavorCharacteristics} onChange={e => setFlavorCharacteristics(e.target.value)} ref={register} />
              <button type="button" onClick={toggleCharNotes} value="" >Show/hide notes</button>
              <textarea type="small" name="FlavorCharacteristicsNotes" defaultValue={FlavorCharacteristicsNotes} hideit={hideCharNotes ? "true" : "false"} ref={register} />
              {/* {hideCharNotes ? "" : RedWineFlavorSelector()} */}

              <div name="FlavorSelector" hidden={hideCharNotes ? true : false} ref={register} >
                <input type="hidden" id="Flavors" name="Flavors" defaultValue={selectedFlavors} ref={register}/>

                <div class="selectedFlavors">
                  Selected Flavors: {selectedFlavors}
                </div>

                <Select
                  closeMenuOnSelect={false}
                  isMulti        
                  name="redWineFlavorSelector"                
                  placeholder="Flavor Selector"
                  blurInputOnSelect={false}
                  options={RedWineFlavorOptions}
                  formatGroupLabel={formatGroupLabel}
                  defaultValue={selectedFlavors}
                  onChange={e => {
                    setselectedFlavors(Array.isArray(e) ? e.map(x => x.value) : [])
                    //console.log(selectedFlavors)
                  }}                  
                  styles={colorStyles}
                />
              </div>

   

              {errors.FlavorCharacteristics && <p>Value must be at least 1</p> }

              <h3>Balance
                <button type="button" className="infobutton" onClick={toggleBalanceInfo} onSubmit="" >info</button>
                <div>
                  <h5>
                    {hideBalanceInfo ? "" : "Does the wine have a good balance of acidity, tannin (bitterness), sweetness? Is any one flavor overly dominant?"}
                  </h5>
                </div>
              </h3>
              <div class="value">{Balance}</div>
              <input type="range" id="Balance" name="Balance" min="1" max="5" defaultValue="0" value={Balance} onChange={e => setBalance(e.target.value)} ref={register} />
              <button type="button" onClick={toggleBalNotes} value="" >Show/hide notes</button>
              <textarea type="small" name="BalanceNotes" defaultValue={BalanceNotes} hideit={hideBalNotes ? "true" : "false"} ref={register} />
              {errors.Balance && <p>Value must be at least 1</p> }

              <h3>Length
                <button type="button" className="infobutton" onClick={toggleLengthInfo} onSubmit="" >info</button>
                <div>
                  <h5>
                    {hideLengthInfo ? "" : "How long does the wine flavor remain after taking a sip?"}
                  </h5>
                </div>
              </h3>
              <div class="value">{Length}</div>
              <input type="range" id="Length" name="Length" min="1" max="5" defaultValue="0" value={Length} onChange={e => setLength(e.target.value)} ref={register} />
              <button type="button" onClick={toggleLenNotes} value="" >Show/hide notes</button>
              <textarea type="small" name="LengthNotes" defaultValue={LengthNotes} hideit={hideLenNotes ? "true" : "false"} ref={register} />
              {errors.Length && <p>Value must be at least 1</p> }

              <h4>Total</h4>
              <div class="value">{totalValue}</div>
              <input type="hidden" id="Total" name="Total" defaultValue={totalValue} ref={register}/>

              <button type="button" onClick={togglePurchase} value="" >Purchase Info</button>
              <h2>
                {hidePurchase ? "" : "How much DID you pay?"}
              </h2>
              <input type="number" placeholder="$" name="ActualPrice" defaultValue={ActualPrice} hideit={hidePurchase ? "true" : "false"} ref={register({min: 0,max: 30000000})} />
              <h2>
                {hidePurchase ? "" : "How much WOULD you pay?"}
              </h2>
              <input type="number" placeholder="$" name="WineValue" defaultValue={WineValue} hideit={hidePurchase ? "true" : "false"} ref={register({min: 0,max: 30000000})} />
              
              <div className="WineTools">
                <button type="button" className="winetoolsbutton" onClick={toggleColorChart} onSubmit="" >Wine Colors</button>
              </div>
              <div hidden={hideColorChart}>
                  <img src={WineColorChart} alt="Wine Color Chart" width={400} />
              </div>

              <div className="WineTools">
                <button type="button" className="winetoolsbutton" onClick={toggleTastingGrid} onSubmit="" >Wine Tasting Grid</button>
              </div>
              <div hidden={hideTastingGrid}>
                  <img src={WineTastingGrid} alt="Wine Tasting Grid" width={400} />
              </div>


              <h2>Tasting Notes</h2>
              <textarea name="TastingNotes" defaultValue={TastingNotes} ref={register} >{{TastingNotes}.tostring}</textarea>
              
              {hideResults ?
                <input type="submit" onClick={handleSubmit(onSubmit)} />
                :
                <div>
                  <input type="submit" value="Update" onClick={handleSubmit(onUpdate)} />
                  <p/>
                  {/* <input type="delete" value="Delete Review" onClick={handleSubmit(onDelete)} /> */}
                  
                  {/* <input type="delete" value="Delete Review" onClick={() => { window.confirm('Are you sure you wish to delete this item?') && handleSubmit(onDelete) } } /> */}
                  
                  <input type="delete" value="Delete Review" onClick={() => { window.confirm('Are you sure you wish to delete this item?') && onDelete() } } />
                </div>
              }
            </div>
          </form>     
        </div>
      </div>
    </UserProvider>
  );
}