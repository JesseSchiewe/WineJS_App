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

// export const WineReviewForm = () => {
export default function WineReviewForm() {

    const user = useContext(UserContext);
    const RunType = useLocation().pathname;

    const [hideSortedResults, setHideSortedResults] = useState(true);
    // var dbWineNamesWI = '/users/' + user.uid + "/"
    // var querywi = firebase.database().ref(dbWineNamesWI).orderByKey();
  
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

  const [ SortByCategory, setSortByCategory ] = useState("Total");
  const [ Appellation, setAppellation ] = useState();
  const [ Balance , setBalance ] = useState(0);
  const [ BalanceNotes, setBalanceNotes ] = useState();
  const [ FlavorCharacteristics, setFlavorCharacteristics ] = useState(0);
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
  const [ Vintage, setVintage ] = useState();
  const [ WineName1, setWineName1 ] = useState();
  const [ ReviewDate, setReviewDate ] = useState(today);
  const [ ActualPrice, setActualPrice ] = useState();
  const [ WineValue, setWineValue ] = useState();
  
  // const [ totalValue, setTotalValue ] = useState();

  const [ deleteReviewRef, setDeleteReviewRef ] = useState();

  // TESTING ONLY -- DELETE THIS PART!!!

  const [ firebaseData, setFirebaseData ] = useState();
    
  const [ formData, setFormData ] = useState({
    // Appellation: firebaseData.Appellation,
    // Balance: firebaseData.Balance
  });    
    console.log(formData);
    console.log(formData.Appellation);
    console.log(formData.Balance);

  const changeHandler = e => {
    setFormData( prevValues => {
      return { ...formData,[e.target.name]: e.target.value}
    });
  }









  // const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const { register, watch, handleSubmit, setValue, formState: { errors } } = useForm();

  // const watchFields = watch(["Aromas","Flavors"])

  let totalValue = (Number(Balance) + Number(Length) + Number(FlavorCharacteristics) + Number(FlavorIntensity) + Number(NoseIntensity))
  if ( totalValue !== 0 ) {
    totalValue = 50 + totalValue
  } 

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
    if (data.errors) {
      console.log("Errors are present.");
      console.log(data.errors);
    } else {
      console.log("Successful");
    }
    data.Total = String(totalValue);
    alert("Successfully submitted form");
    writeToDatabase(user.uid,data);
    setToResults(true);
  }

  function onUpdate(data) {
    deleteFromDatabase();
    data.Total = String(totalValue);
    writeToDatabase(user.uid,data);
    alert("Successfully updated review")
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
            {/* <Select options={ test } className="selectBox" isSearchable={true} placeholder="Select Review" onChange={e => {handleChange(e.value); setHideReview(false); setHideSortedResults(true)} } /> */}
          </form>
          <p/>

          {/* <div className="SortedResults" hidden={hideResults} >
            <button type="button" onClick={() => {sortResults(SortByCategory); setHideSortedResults(!hideSortedResults); setHideReview(true)}} >Show/Hide Favorite Wines</button>

            {hideSortedResults ? "" : (
              <form>
                <Select options={ sortOptions } className="selectBox" isSearchable={true} onChange={() => {sortResults("total"); toggleHideSortedResults()}}   />
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
          </div> */}


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
                  <input type="text" {...register("ReviewDate")} value={ReviewDate ? ReviewDate : today} />
                </div>
              )}       

              {toResults ? <Redirect to={{ pathname:"/reviewresult" }} /> : null}

              <input type="hidden" name="ReviewDate" id="ReviewDate" {...register("ReviewDate")} defaultValue={ReviewDate} />
                      
              <h2>Producer</h2>
              <input type="text" name="Producer" placeholder="Who makes the wine?" defaultValue={Producer} {...register("Producer")}/>

              <h2>Appellation</h2>
              <input type="text" name="Appellation" placeholder="Where is the wine from? Ex: Napa Valley" {...register("Appellation")} defaultValue={Appellation} />

              <h2>Wine Name</h2>
              <input type="text" name="WineName" placeholder="Wine Name" defaultValue={WineName1} {...register("WineName", { required: true } )} />
              {errors.WineName && <p className="error">You must enter a wine name to submit the review.</p>}

              <h2>Vintage</h2>
              <input type="number" name="Vintage" placeholder="Year" {...register("Vintage")} min="1900" max="2030" defaultValue={Vintage} />

              <h3>Nose Intensity
                <button type="button" className="infobutton" onClick={toggleNoseInfo} onSubmit="" >info</button>
                <div>
                  <h5>
                    {hideNoseInfo ? "" : "How strong does the wine smell?"}
                  </h5>
                </div>
              </h3>
              <div className="value">{NoseIntensity}</div>
              {/* <input type="range" name="NoseIntensity" id="NoseIntensity" {...register("NoseIntensity")} min="1" max="5" defaultValue="0" value={NoseIntensity} onChange={e => setNoseIntensity(e.target.value)} /> */}
              <input type="range" name="NoseIntensity" id="NoseIntensity" {...register("NoseIntensity")} min="1" max="5" defaultValue="0" value={NoseIntensity} onChange={e => setNoseIntensity(e.target.value)} />
              <button type="button" onClick={toggleNoseNotes} value="" >Show/hide notes</button>
              <textarea type="small" {...register("NoseIntensityNotes")} defaultValue={NoseIntensityNotes} hideit={hideNoseNotes ? "true" : "false"} />
            
              <div name="AromaSelector" hidden={hideNoseNotes ? true : false} >

                <input type="hidden" name="Aromas" id="Aromas" {...register("Aromas")} value={selectedAromas} />

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
                    setselectedAromas(Array.isArray(e) ? e.map(x => x.value) : []);
                    setValue("Aromas", (Array.isArray(e) ? e.map(x => x.value) : []));
                    console.log(selectedAromas);
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
              {/* <input type="range" id="FlavorIntensity" {...register("FlavorIntensity", { required:true } )} min="1" max="10" defaultValue="0" value={FlavorIntensity} onChange={e => setFlavorIntensity(e.target.value)} /> */}
              <input
                type="range"
                name="FlavorIntensity"
                id="FlavorIntensity" 
                {...register("FlavorIntensity", { pattern: /[^0]+/ })}
                min="1"
                max="10"
                defaultValue="0"
                value={FlavorIntensity}
                onChange={e => setFlavorIntensity(e.target.value)} 
              />
              <button type="button" onClick={toggleIntenseNotes} value="" >Show/hide notes</button>
              <textarea type="small" {...register("FlavorIntensityNotes")} defaultValue={FlavorIntensityNotes} hideit={hideIntenseNotes ? "true" : "false"} />
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
              <input type="range" name="FlavorCharacteristics" id="FlavorCharacteristics" {...register("FlavorCharacteristics")} min="1" max="25" defaultValue="0" value={FlavorCharacteristics} onChange={e => setFlavorCharacteristics(e.target.value)} />
              <button type="button" onClick={toggleCharNotes} value="" >Show/hide notes</button>
              <textarea type="small" {...register("FlavorCharacteristicsNotes")} defaultValue={FlavorCharacteristicsNotes} hideit={hideCharNotes ? "true" : "false"} />
              {/* {hideCharNotes ? "" : RedWineFlavorSelector()} */}

              <div name="FlavorSelector" hidden={hideCharNotes ? true : false} >
                {/* <input type="hidden" name="Flavors" id="Flavors" {...register("Flavors")} defaultValue={selectedFlavors} /> */}
                <input type="hidden" name="Flavors" id="Flavors" {...register("Flavors")} value={selectedFlavors} />

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
                    setselectedFlavors(Array.isArray(e) ? e.map(x => x.value) : []);
                    // console.log(selectedFlavors);
                    // setValue("Flavors", selectedFlavors);
                    setValue("Flavors", (Array.isArray(e) ? e.map(x => x.value) : []));
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
              {/* <input type="range" name="Balance" id="Balance" {...register("Balance")} min="1" max="5" defaultValue="0" value={Balance} onChange={e => setBalance(e.target.value)} /> */}
              <input type="range" name="Balance" id="Balance" {...register("Balance")} min="1" max="5" defaultValue="0" value={Balance} onChange={e => setBalance(e.target.value)} />
              <button type="button" onClick={toggleBalNotes} value="" >Show/hide notes</button>
              <textarea type="small" {...register("BalanceNotes")} defaultValue={BalanceNotes} hideit={hideBalNotes ? "true" : "false"} />
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
              <input type="range" name="Length" id="Length" {...register("Length")} min="1" max="5" defaultValue="0" value={Length} onChange={e => setLength(e.target.value)} />
              <button type="button" onClick={toggleLenNotes} value="" >Show/hide notes</button>
              <textarea type="small" {...register("LengthNotes")} defaultValue={LengthNotes} hideit={hideLenNotes ? "true" : "false"} />
              {errors.Length && <p>Value must be at least 1</p> }

              <h4>Total</h4>
              <div class="value">{totalValue}</div>
              {/* <input type="hidden" name="Total" id="Total" {...register("Total")} value={totalValue} /> */}
              <input type="text" className="hidethis" name="Total" id="Total" {...register("Total")} value={totalValue} />

              <button type="button" onClick={togglePurchase} value="" >Purchase Info</button>
              <h2>
                {hidePurchase ? "" : "How much DID you pay?"}
              </h2>
              <input type="number" placeholder="$" {...register("ActualPrice")} defaultValue={ActualPrice} hideit={hidePurchase ? "true" : "false"}  />
              <h2>
                {hidePurchase ? "" : "How much WOULD you pay?"}
              </h2>
              <input type="number" placeholder="$" {...register("WineValue")} defaultValue={WineValue} hideit={hidePurchase ? "true" : "false"} />
              
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
              <textarea {...register("TastingNotes")} defaultValue={TastingNotes} >{{TastingNotes}.tostring}</textarea>
              
              {hideResults ?
                <input type="submit" onClick={handleSubmit(onSubmit)} />
                :
                <div>
                  <input type="submit" value="Update" onClick={handleSubmit(onUpdate)} />
                  <p/>
                  {/* <input type="delete" value="Delete Review" onClick={handleSubmit(onDelete)} /> */}
                  
                  {/* <input type="delete" value="Delete Review" onClick={() => { window.confirm('Are you sure you wish to delete this item?') && handleSubmit(onDelete) } } /> */}
                  
                  <input type="delete" value="Delete Review" name="DeleteReview" onClick={() => { window.confirm('Are you sure you wish to delete this item?') && onDelete() } } />
                </div>
              }
            </div>
          </form>     
        </div>
      </div>
    </UserProvider>
  );
}

