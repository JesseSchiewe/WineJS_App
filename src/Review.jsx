import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import useToggle from './useToggle';
import { useLocation, Redirect } from 'react-router-dom';
import firebase from 'firebase';
import UserProvider, { UserContext } from "./providers/UserProvider";
import Select from 'react-select'
//import './index.js';
//import {Routes} from './Routes';
//import {db} from './Config';
//import {Firebase} from './Config';
//import firestore from './Firebase'
//import firebase from "firebase/app";

export const Review = () => {
  const user = useContext(UserContext);

  const RunType = useLocation().pathname;
  console.log(RunType);

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


  const [hideFavorites, toggleHideFavorites] = useToggle();
  const [hideTopFlavorCharacteristics, toggleHideTopFlavorCharacteristics] = useToggle();  
  var dbWineNamesWI = '/users/' + user.uid + "/"
  var querywi = firebase.database().ref(dbWineNamesWI).orderByKey();

  var hideReviewToggleStart = ""
  var hideResultsStart = ""
  if ( RunType === "/reviewresult" ) {
    hideReviewToggleStart = true
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
  
  var wineitems = [];
  function SetWineArrayItems() {
      var returnArrWineItems = [];         
      querywi.once("value").then(function (snapshotWI) {
          snapshotWI.forEach(function (childSnapshotWI) {
              var wName = childSnapshotWI.key 
              var wTotal = childSnapshotWI.child("data").child("Total").val();
              var wFlavorCharacteristics = childSnapshotWI.child("data").child("FlavorCharacteristics").val();
              returnArrWineItems.push({ wine:wName, total:wTotal, flavorcharacteristics:wFlavorCharacteristics });
          });                
      });
      wineitems = returnArrWineItems
      return returnArrWineItems
  }
  SetWineArrayItems()

  const [topRated, setTopRated] = useState(wineitems);
  const sortByScore = () => {
      const sorted = [...topRated].sort((a, b) => {
          return  b.total - a.total;
      });
      setTopRated(sorted);
  };

  const [topFlavorCharacteristics, setTopFlavorCharacteristics] = useState(wineitems);
  const sortByTopFlavorCharacteristicsScore = () => {
      const sorted = [...topFlavorCharacteristics].sort((a, b) => {
          return  b.flavorcharacteristics - a.flavorcharacteristics;
      });
      setTopFlavorCharacteristics(sorted);
  };

  const [ Appellation, setAppellation ] = useState();
  const [ Balance , setBalance ] = useState(0);
  const [ BalanceNotes, setBalanceNotes ] = useState();
  const [ FlavorCharacteristics, setFlavorCharacteristics ] = useState(0);
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

  const { register, handleSubmit, errors } = useForm();

  let totalValue = (Number(Balance) + Number(Length) + Number(FlavorCharacteristics) + Number(FlavorIntensity) + Number(NoseIntensity))
  if ( totalValue !== 0 ) {
    totalValue = 50 + totalValue
  } 

  function setReviewData() {
    firebase.database().ref(dbpathref).on('value', (snapshot) => {
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

  const [toResults, setToResults] = useState(false);


  function writeToDatabase(userId, data) {
    // firebase.database().ref('users/' + userId + '/' + data.Producer + ' ' + data.WineName + ' ' + today).set({
    firebase.database().ref('users/' + userId + '/' + data.Producer + ' ' + data.WineName + ' ' + ReviewDate).set({
      data    
    });
  }

  function deleteFromDatabase() {
    var deleteReviewRef = 'users/' + user.uid + '/' + Producer + ' ' + WineName1 + ' ' + ReviewDate
    firebase.database().ref(deleteReviewRef).remove();    
  }

  function onSubmit(data) {
    alert("Successfully submitted form");
    writeToDatabase(user.uid,data);
    setToResults(true)
  }

  function onUpdate(data) {    
    // deleteFromDatabase();
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
  // console.log(errors);

  return (
    <UserProvider>
      <div>

        {/* {hideResults ? "Hide" : "Show"} */}
        <div className="FavoriteWines" hidden={hideResults} >
          <button type="button" onClick={() => {sortByScore(); toggleHideFavorites()}} >Show/hide Top Rated Wines</button>
            {hideFavorites ? "" : (
              <div>
                <h6>
                  Favorite Wines
                </h6>
                <p/>
              </div>
            )}
          {hideFavorites ? "" : topRated.map((wineitem, i) => {
              return (
                <div>
                  <h7 key={i}>
                    {/* {wineitem.total} --- <b className="wineReviewName" value={wineitem.wine} onClick={() => handleChange(wineitem.wine)} >{wineitem.wine} </b> */}
                    {/* {wineitem.total} --- <b className="wineReviewName" value={wineitem.wine} onClick={() => {handleChange(wineitem.wine); toggleHideFavorites() }} >{wineitem.wine} </b> */}
                    {wineitem.total} --- <b className="wineReviewName" value={wineitem.wine} onClick={() => {handleChange(wineitem.wine); toggleHideFavorites(); setHideReview(false) }} >{wineitem.wine} </b>
                  </h7>
                </div>
              );
          })}

        <div className="TopFlavorCharacteristics" hidden={hideResults} >
          <button type="button" onClick={() => {sortByTopFlavorCharacteristicsScore(); toggleHideTopFlavorCharacteristics()}} >Show/hide Top Flavor Characteristics</button>
            {hideTopFlavorCharacteristics ? "" : (
              <div>
                <h6>
                  Top Flavor Characteristics
                </h6>
                <p/>
              </div>
            )}
          {hideTopFlavorCharacteristics ? "" : topFlavorCharacteristics.map((wineitem, i) => {
              return (
                <div>
                  <h7 key={i}>
                    {/* {wineitem.total} --- <b className="wineReviewName" value={wineitem.wine} onClick={() => handleChange(wineitem.wine)} >{wineitem.wine} </b> */}
                    {/* {wineitem.total} --- <b className="wineReviewName" value={wineitem.wine} onClick={() => {handleChange(wineitem.wine); toggleHideFavorites() }} >{wineitem.wine} </b> */}
                    {wineitem.flavorcharacteristics} --- <b className="wineReviewName" value={wineitem.wine} onClick={() => {handleChange(wineitem.wine); toggleHideTopFlavorCharacteristics(); setHideReview(false) }} >{wineitem.wine} </b>
                  </h7>
                </div>
              );
          })}
        </div>

          <p/>
          <form>
              <Select options={ test } className="selectBox" isSearchable={true} onChange={e => {handleChange(e.value); setHideReview(false)} } />
          </form>
        </div>
        

        {/* </div><div className="ReviewPage" hidden={WineName1 ? false : true } > */}
        <div className="ReviewPage" hidden={hideReview} >
          <form className="reviewform" onSubmit={handleSubmit(onSubmit)}>          
            
                      
            {/* <input type="text" name="ReviewDate" hideit="false" value={today} ref={register} /> */}
            <div className="formbackground" >

              {hideResults ? (
                <div>
                  <h1>WineJS Review</h1>                  
                </div>
                )
              : (
                <div>
                  <h1>Review Result</h1>
                  This is a past review. You may edit the review data and save the changes or delete the review from this page.             
                  <h2>Review Date</h2>
                  <input type="text" name="ReviewDate" value={ReviewDate ? ReviewDate : today} ref={register} />
                </div>
              )}       

              {/* {toResults ? <Redirect to={{ pathname:"/reviewresult", state: { data: sampleData }}} /> : null} */}
              {toResults ? <Redirect to={{ pathname:"/reviewresult" }} /> : null}
        
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

              <button type="button" className="infobutton" onClick={togglePurchase} value="" >Purchase Info</button>
              <h2>
                {hidePurchase ? "" : "How much DID you pay?"}
              </h2>
              <input type="number" placeholder="$" name="ActualPrice" defaultValue={ActualPrice} hideit={hidePurchase ? "true" : "false"} ref={register({min: 0,max: 30000000})} />
              <h2>
                {hidePurchase ? "" : "How much WOULD you pay?"}
              </h2>
              <input type="number" placeholder="$" name="WineValue" defaultValue={WineValue} hideit={hidePurchase ? "true" : "false"} ref={register({min: 0,max: 30000000})} />

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