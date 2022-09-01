import React, { useEffect, useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import useToggle from './useToggle';
import { useLocation, Navigate } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import "firebase/compat/database";
import { UserContext } from "../providers/UserProvider";
import Select from 'react-select';
import { RedWineFlavorOptions } from './WineFlavors';
import { formatGroupLabel, colorStyles } from './WineFlavorSelectBox';
import WineColorChart from '../Style/WineColorChart.jpg';
import WineTastingGrid from '../Style/WineTastingGrid.jpg';
import WineFlavorWheel from '../Style/WineFlavorWheel.jpg';
import { Stack } from '@mui/system';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';


export default function WineReviewForm({ preloadedValues }) {
  const user = useContext(UserContext);
  const RunType = useLocation().pathname;
  const [ deleteReviewRef, setDeleteReviewRef ] = useState();

  useEffect(() => {
    if ( RunType === "/reviewresult" ){
      setDeleteReviewRef('users/' + user.uid + "/" + preloadedValues.Producer + " " + preloadedValues.WineName + " " + preloadedValues.ReviewDate)
    };            
  }, [RunType,preloadedValues,user]);


  const [ hideResults, setHideResults ] = useState(false);
  useEffect(() => {
    if ( RunType === "/review" ) {
      setHideResults(true)
    }
  }, [RunType]);

  const date = new Date();
  const today = (date.getMonth()+1) + '-' + date.getDate() + '-' + date.getFullYear()
  const { register, setValue, watch, handleSubmit, formState: { errors } } = useForm({
    defaultValues: preloadedValues
  });

  // Watch method for updating values
  const watchNI = watch("NoseIntensity");
  const watchFI = watch("FlavorIntensity");
  const watchFC = watch("FlavorCharacteristics");
  const watchBAL = watch("Balance");
  const watchLEN = watch("Length");
  const watchAROMAS = watch("Aromas");
  const watchFLAVORS = watch("Flavors");

  let totalValue = (Number(watchNI) + Number(watchFI) + Number(watchFC) + Number(watchBAL) + Number(watchLEN))
  if ( totalValue !== 0 ) {
      totalValue = 50 + totalValue
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
  const [hideWineTools, toggleWineTools] = useToggle();

  const [toResults, setToResults] = useState(false);

  const [selectedWineTool, setSelectedWineTool] = useState();

  function writeToDatabase(userId, data) {
    firebase.database().ref('users/' + userId + '/' + data.Producer + ' ' + data.WineName + ' ' + data.ReviewDate).set({
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
    alert("Successfully updated review");
    window.location.reload();
  }

  function onDelete() {
    deleteFromDatabase();
    window.location.reload();
    alert("Successfully deleted review.")
  }

  return (
    <form className="reviewform" >
      <div data-testid="FullReview">
        <div className="ReviewPage" >
          <div className="formbackground" >
            {hideResults ? (
              <div>
                {/* <h1>WineJS Review</h1>                   */}
              </div>
              )
            : (
              <div>
                This is a past review. You may edit the review data and save the changes or delete the review from here.             
                
              </div>
            )}
          
            {toResults ? <Navigate to={{ pathname:"/reviewresult" }} /> : null}

            <Box
              // component="form"
              sx={{
                '& .MuiTextField-root': { m: 1 },
              }}
              noValidate
              autoComplete="off"
            >

              {/* <input type="text" name="ReviewDate" id="ReviewDate" defaultValue={today} {...register("ReviewDate")} /> */}
              <TextField
                id="ReviewDate"
                label="ReviewDate"
                placeholder="ReviewDate"
                defaultValue={today}
                multiline
                fullWidth
                {...register("ReviewDate")}
              />

              <TextField
                id="Producer"
                label="Producer"
                placeholder="Who makes the wine?"
                multiline
                fullWidth    
                {...register("Producer")}
              />

              <TextField
                id="Appellation"
                label="Appellation"
                placeholder="Where is the wine from? Ex: Napa Valley"
                multiline
                fullWidth
                {...register("Appellation")}
              />

              <TextField
                id="WineName"
                label="WineName"
                placeholder="What is the name of the wine?"
                multiline
                fullWidth
                {...register("WineName")}
              />
              {errors.WineName && <p className="error">You must enter a wine name to submit the review.</p>}

              <TextField
                id="Vintage"
                label="Vintage"
                type="number"
                // InputLabelProps={{
                //   shrink: true,
                // }}
                fullWidth
                placeholder="What year was the wine produced?"
                {...register("Vintage")}
              />


              <h3>Nose Intensity
                <button type="button" className="infobutton" onClick={toggleNoseInfo} >info</button>
                <div>
                  <h5>
                    {hideNoseInfo ? "" : "How strong does the wine smell?"}
                  </h5>
                </div>
              </h3>
              <div className="value">{watchNI}</div>
              <input type="range" name="NoseIntensity" id="NoseIntensity" {...register("NoseIntensity")} min="0" max="5" defaultValue="0" />
              <button type="button" className="reviewbutton" onClick={toggleNoseNotes} value="" >Show/hide notes</button>
              <textarea type="small" {...register("NoseIntensityNotes")} hideit={hideNoseNotes ? "true" : "false"} />
            
              <div name="AromaSelector" hidden={hideNoseNotes ? true : false} >
                <input type="hidden" name="Aromas" id="Aromas" {...register("Aromas")} value={watchAROMAS} />

                <div className="selectedAromas">
                  Selected Aromas: {watchAROMAS}
                </div>
                
                <Select
                  closeMenuOnSelect={false}
                  isMulti
                  name="AromaSelector"
                  placeholder="Aroma Selector"
                  blurInputOnSelect={false}
                  options={RedWineFlavorOptions}
                  formatGroupLabel={formatGroupLabel}
                  onChange={e => {
                    setValue("Aromas", (Array.isArray(e) ? e.map(x => x.value) : []));
                  }}                  
                  styles={colorStyles}
                />
              </div>
              {errors.NoseIntensity && <p>Value must be at least 1</p> }

              <h3>Flavor Intensity
                <button type="button" className="infobutton" onClick={toggleFlavorIntensityInfo} >info</button>
                <div>
                  <h5>
                    {hideFlavorIntensityInfo ? "" : "How strong does the wine taste?"}
                  </h5>
                </div>
              </h3>
              <div className="value">{watchFI}</div>
              <input
                type="range"
                name="FlavorIntensity"
                id="FlavorIntensity" 
                {...register("FlavorIntensity", { pattern: /[^0]+/ })}
                min="0"
                max="10"
                defaultValue="0"
              />
              <button type="button" className="reviewbutton" onClick={toggleIntenseNotes} value="" >Show/hide notes</button>
              <textarea type="small" {...register("FlavorIntensityNotes")} hideit={hideIntenseNotes ? "true" : "false"} />
              {errors.FlavorIntensity && <p>Value must be at least 1</p> }

              <h3>Flavor Characteristics
                <button type="button" className="infobutton" onClick={toggleFlavorCharacteristicsInfo} >info</button>
                <div>
                  <h5>
                    {hideFlavorCharacteristicsInfo ? "" : "Do you like the way the wine tastes?"}
                  </h5>
                </div>
              </h3>              
              <div className="value">{watchFC}</div>
              <input type="range" name="FlavorCharacteristics" id="FlavorCharacteristics" {...register("FlavorCharacteristics")} min="0" max="25" defaultValue="0" />
              <button type="button" className="reviewbutton" onClick={toggleCharNotes} value="" >Show/hide notes</button>
              <textarea type="small" {...register("FlavorCharacteristicsNotes")} hideit={hideCharNotes ? "true" : "false"} />

              <div name="FlavorSelector" hidden={hideCharNotes ? true : false} >
                <input type="hidden" name="Flavors" id="Flavors" {...register("Flavors")} value={watchFLAVORS} />

                <div className="selectedFlavors">
                  Selected Flavors: {watchFLAVORS}
                </div>

                <Select
                  closeMenuOnSelect={false}
                  isMulti
                  name="FlavorSelector"
                  placeholder="Flavor Selector"
                  blurInputOnSelect={false}
                  options={RedWineFlavorOptions}
                  formatGroupLabel={formatGroupLabel}
                  onChange={e => {
                    setValue("Flavors", (Array.isArray(e) ? e.map(x => x.value) : []));
                  }}
                  styles={colorStyles}
                />
              </div>

              {errors.FlavorCharacteristics && <p>Value must be at least 1</p> }

              <h3>Balance
                <button type="button" className="infobutton" onClick={toggleBalanceInfo} >info</button>
                <div>
                  <h5>
                    {hideBalanceInfo ? "" : "Does the wine have a good balance of acidity, tannin (bitterness), sweetness? Is any one flavor overly dominant?"}
                  </h5>
                </div>
              </h3>
              <div className="value">{watchBAL}</div>
              <input type="range" name="Balance" id="Balance" {...register("Balance")} min="0" max="5" defaultValue="0" />
              <button type="button" className="reviewbutton" onClick={toggleBalNotes} value="" >Show/hide notes</button>
              <textarea type="small" {...register("BalanceNotes")} hideit={hideBalNotes ? "true" : "false"} />
              {errors.Balance && <p>Value must be at least 1</p> }

              <h3>Length
                <button type="button" className="infobutton" onClick={toggleLengthInfo} >info</button>
                <div>
                  <h5>
                    {hideLengthInfo ? "" : "How long does the wine flavor remain after taking a sip?"}
                  </h5>
                </div>
              </h3>
              <div className="value">{watchLEN}</div>
              <input type="range" name="Length" id="Length" {...register("Length")} min="0" max="5" defaultValue="0" />
              <button type="button" className="reviewbutton" onClick={toggleLenNotes} value="" >Show/hide notes</button>
              <textarea type="small" {...register("LengthNotes")} hideit={hideLenNotes ? "true" : "false"} />
              {errors.Length && <p>Value must be at least 1</p> }

              <h4>Total</h4>
              <div className="value">{totalValue.toString()}</div>
              <input type="hidden" className="hidethis" name="Total" id="Total" {...register("Total")} value={totalValue.toString()} />

              <button type="button" className="reviewbutton" onClick={togglePurchase} value="" >Purchase Info</button>
              <div hidden={hidePurchase} >

                {/* <h5>
                  {hidePurchase ? "" : "How much DID you pay?"}
                </h5> */}
                {/* <input type="number" placeholder="$" {...register("ActualPrice")} hideit={hidePurchase ? "true" : "false"}  /> */}
                <TextField
                  id="ActualPrice"
                  label="Actual Price"
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
                  placeholder="$"
                  {...register("ActualPrice")}
                />
                {/* <h5>
                  {hidePurchase ? "" : "How much WOULD you pay?"}
                </h5>
                <input type="number" placeholder="$" {...register("WineValue")} hideit={hidePurchase ? "true" : "false"} /> */}
                <TextField
                  id="WineValue"
                  label="How much would you pay?"
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
                  placeholder="$"
                  {...register("WineValue")}
                />
              </div>
              
              <div>
                <button type="button" className="winetoolsbutton winetoolsbutton-big" onClick={toggleWineTools}>{hideWineTools ? "Show Wine Tools" : "Hide Wine Tools"}</button>
              </div>
              <div className="WineToolsSection" hidden={hideWineTools}>
                <Stack className="HorizontalStack" direction="row" spacing={0.1}>
                  <button type="button" className="winetoolsbutton" onClick={() => setSelectedWineTool("WineColorChart")} >Colors</button>
                  <button type="button" className="winetoolsbutton" onClick={() => setSelectedWineTool("WineTastingGrid")} >Tasting Grid</button>
                  <button type="button" className="winetoolsbutton" onClick={() => setSelectedWineTool("WineFlavorWheel")} >Flavor Wheel</button>
                  <button type="button" className="winetoolsbutton" onClick={() => setSelectedWineTool("EMPTY")}>Clear Wine Tools</button>
                </Stack>
                <div hidden={selectedWineTool !== "WineColorChart"}>
                    <img src={WineColorChart} alt="Wine Color Chart" width={395} />
                </div>
                <div hidden={selectedWineTool !== "WineTastingGrid"}>
                    <img src={WineTastingGrid} alt="Wine Tasting Grid" width={395} />
                </div>                
                <div hidden={selectedWineTool !== "WineFlavorWheel"}>
                    <img src={WineFlavorWheel} alt="Wine Flavor Wheel" width={397} />
                </div>
              </div>
              <div>
                <h2>Tasting Notes</h2>
                <textarea {...register("TastingNotes")} />
              </div>                
              {hideResults ?
                <div>
                    <input type="submit" onClick={handleSubmit(onSubmit)} data-testid="SubmitButton" />
                </div>
                :
                <div>             
                    <input type="update" defaultValue="Update" name="Update" onClick={handleSubmit(onUpdate)} data-testid="UpdateButton" />                  
                    <input type="delete" defaultValue="Delete Review" name="DeleteReview" onClick={() => { window.confirm('Are you sure you wish to delete this item?') && onDelete() } } />
                </div>
              }
            </Box>
          </div>   
        </div>
      </div>
    </form>
  );
}
