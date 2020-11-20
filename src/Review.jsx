import React, {useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import useToggle from './useToggle';
import {Redirect} from 'react-router-dom';
import './index.js';
//import {Routes} from './Routes';
//import {db} from './Config';
//import {Firebase} from './Config';
//import firebase from 'firebase';
import UserProvider, { UserContext } from "./providers/UserProvider";
//import firestore from './Firebase'
import firebase from "firebase/app";

export default function Review() {
  const { register, handleSubmit, errors } = useForm();
  const [valueNOSE, setValueNOSE] = useState(0);
  const [valueINTENSE, setValueINTENSE] = useState(0);
  const [valueCHAR, setValueCHAR] = useState(0);
  const [valueBAL, setValueBAL] = useState(0);
  const [valueLEN, setValueLEN] = useState(0);
  let totalValue = (Number(valueNOSE) + Number(valueINTENSE) + Number(valueCHAR) + Number(valueBAL) + Number(valueLEN))
  if ( totalValue !== 0 ) {
    totalValue = 50 + totalValue
  } 

  let sampleData = ""

  const user = useContext(UserContext);
  //const {displayName, email} = user;

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

  const date = new Date();
  const today = (date.getMonth()+1) + '-' + date.getDate() + '-' + date.getFullYear()

  function writeToDatabase(userId, data) {
    firebase.database().ref('users/' + userId + '/' + data.Producer + ' ' + data.WineName + ' ' + today).set({
      data    
    });
  }

  function onSubmit(data) {
    alert("Successfully submitted form");
    writeToDatabase(user.uid,data);
    setToResults(true)
  }

  console.log(errors);

  return (
    <UserProvider>
      <div className="ReviewPage" >
        <form className="reviewform" onSubmit={handleSubmit(onSubmit)}>
          
          
          <h1>WineJS Review</h1>          
          <textarea type="small" name="ReviewDate" hideit="true" value={today} ref={register} />
                    
          {toResults ? <Redirect to={{ pathname:"/reviewresult", state: { data: sampleData }}} /> : null}

          <div className="formbackground" >    
          <h2>Producer</h2>
          <input type="text" placeholder="Producer" name="Producer" ref={register} />

          <h2>Wine Name</h2>
          <input type="text" placeholder="Wine Name" name="WineName" ref={register({required: "Wine Name is Required", maxLength: 100})} />
          {errors.WineName && <p>{errors.WineName.message}</p> }

          <h2>Vintage</h2>
          <input type="number" placeholder="Vintage" name="Vintage" ref={register({min: 1900,max: 2030})} />


          <h3>Nose Intensity
            <button type="button" className="infobutton" onClick={toggleNoseInfo} onSubmit="" >info</button>
            <div>
              <h5>
                {hideNoseInfo ? "" : "How strong does the wine smell?"}
              </h5>
            </div>
          </h3>

          <div class="value">{valueNOSE}</div>
          <input type="range" id="NoseIntensity" name="NoseIntensity" min="1" max="5" defaultValue="0" onChange={e => setValueNOSE(e.target.value)} ref={register} />

          <button type="button" onClick={toggleNoseNotes} value="" >Show/hide notes</button>
          <textarea type="small" name="NoseIntensityNotes" hideit={hideNoseNotes ? "true" : "false"} ref={register} />
          {errors.NoseIntensity && <p>Value must be at least 1</p> }

          <h3>Flavor Intensity
            <button type="button" className="infobutton" onClick={toggleFlavorIntensityInfo} onSubmit="" >info</button>
              <div>
                <h5>
                  {hideFlavorIntensityInfo ? "" : "How strong does the wine taste?"}
                </h5>
              </div>
          </h3>
          <div class="value">{valueINTENSE}</div>
          <input type="range" id="FlavorIntensity" name="FlavorIntensity" min="1" max="10" defaultValue="0" onChange={e => setValueINTENSE(e.target.value)} ref={register} />
          <button type="button" onClick={toggleIntenseNotes} value="" >Show/hide notes</button>
          <textarea type="small" name="FlavorIntensityNotes" hideit={hideIntenseNotes ? "true" : "false"} ref={register} />
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
          <div class="value">{valueCHAR}</div>
          <input type="range" id="FlavorCharacteristics" name="FlavorCharacteristics" min="1" max="25" defaultValue="0" onChange={e => setValueCHAR(e.target.value)} ref={register} />
          <button type="button" onClick={toggleCharNotes} value="" >Show/hide notes</button>
          <textarea type="small" name="FlavorCharacteristicsNotes" hideit={hideCharNotes ? "true" : "false"} ref={register} />
          {errors.FlavorCharacteristics && <p>Value must be at least 1</p> }

          <h3>Balance
            <button type="button" className="infobutton" onClick={toggleBalanceInfo} onSubmit="" >info</button>
              <div>
                <h5>
                  {hideBalanceInfo ? "" : "Does the wine have a good balance of acidity, tannin, sweetness? Is any one flavor overly dominant?"}
                </h5>
              </div>
          </h3>
          <div class="value">{valueBAL}</div>
          <input type="range" id="Balance" name="Balance" min="1" max="5" defaultValue="0" onChange={e => setValueBAL(e.target.value)} ref={register} />
          <button type="button" onClick={toggleBalNotes} value="" >Show/hide notes</button>
          <textarea type="small" name="BalanceNotes" hideit={hideBalNotes ? "true" : "false"} ref={register} />
          {errors.Balance && <p>Value must be at least 1</p> }

          <h3>Length
            <button type="button" className="infobutton" onClick={toggleLengthInfo} onSubmit="" >info</button>
              <div>
                <h5>
                  {hideLengthInfo ? "" : "How long does the wine flavor remain after taking a sip?"}
                </h5>
              </div>
          </h3>
          <div class="value">{valueLEN}</div>
          <input type="range" id="Length" name="Length" min="1" max="5" defaultValue="0" onChange={e => setValueLEN(e.target.value)} ref={register} />
          <button type="button" onClick={toggleLenNotes} value="" >Show/hide notes</button>
          <textarea type="small" name="LengthNotes" hideit={hideLenNotes ? "true" : "false"} ref={register} />
          {errors.Length && <p>Value must be at least 1</p> }

          <h4>Total</h4>
          <div class="value">{totalValue}</div>
          <input type="hidden" id="Total" name="Total" defaultValue={totalValue} ref={register}/>

          <button type="button" className="infobutton" onClick={togglePurchase} value="" >Purchase Info</button>
          <h2>
            {hidePurchase ? "" : "How much DID you pay?"}
          </h2>
          <input type="number" placeholder="$" name="ActualPrice" hideit={hidePurchase ? "true" : "false"} ref={register({min: 0,max: 30000000})} />
          <h2>
            {hidePurchase ? "" : "How much WOULD you pay?"}
          </h2>
          <input type="number" placeholder="$" name="WineValue" hideit={hidePurchase ? "true" : "false"} ref={register({min: 0,max: 30000000})} />

          <h2>Tasting Notes</h2>
          <textarea name="TastingNotes" ref={register} />

          <input type="submit" onClick={handleSubmit(onSubmit)} />
          </div>
        </form>     
      </div>
    </UserProvider>
  );
}