import React, {useState, useCallback, useContext } from 'react';
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

  const [isOn, toggleIsOn] = useToggle();

  let valueAll = ""
  let sampleData = ""

  const user = useContext(UserContext);
  const {displayName, email} = user;

  const [hideNoseNotes, toggleNoseNotes] = useToggle();
  const [hideIntenseNotes, toggleIntenseNotes] = useToggle();
  const [hideCharNotes, toggleCharNotes] = useToggle();
  const [hideBalNotes, toggleBalNotes] = useToggle();
  const [hideLenNotes, toggleLenNotes] = useToggle();

  const [toResults, setToResults] = useState(false);
  var database = firebase.database();

//   function writeToDatabase(userId, data) {
//     firebase.database().ref('users/' + userId + '/' + data.WineName).set({
//       data      
//     });
//   }

  function writeToDatabase(userId, data) {
    firebase.database().ref('users/' + userId + '/' + data.WineName).set({
      data    
    });
  }

  function readDatabase() {
    return firebase.database().ref('/users/').once('value').then(function(snapshot) {
        var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
    });
  }

  const readAllDatabase = () => {
    return firebase.database().ref('users/jds007/')
  };

  function onSubmit(data) {
    alert("Successfully submitted form");
    writeToDatabase(user.uid,data);
    setToResults(true)
  }

  function updateTextInput(val,changeID) {
    document.getElementById(changeID).value=val;
  }

  console.log(errors);




  return (
    <UserProvider>
        <form onSubmit={handleSubmit(onSubmit)}>
        <div className="WineJS Wine Review">
            <h1>WineJS Review</h1>
        </div>


        {console.log(user.uid)}

        {toResults ? <Redirect to={{ pathname:"/reviewresult", state: { data: sampleData }}} /> : null}
            
        <h2>Producer</h2>
        <input type="text" placeholder="Producer" name="Producer" ref={register} />

        <h2>Wine Name</h2>
        <input type="text" placeholder="Wine Name" name="WineName" ref={register({required: "Wine Name is Required", maxLength: 100})} />
        {errors.WineName && <p>{errors.WineName.message}</p> }

        <h2>Vintage</h2>
        <input type="number" placeholder="Vintage" name="Vintage" ref={register({min: 1900,max: 2030})} />

        <h3>Nose Intensity</h3>
        <div class="value">{valueNOSE}</div>
        <input type="range" id="NoseIntensity" name="NoseIntensity" min="1" max="5" defaultValue="0" onChange={e => setValueNOSE(e.target.value)} ref={register} />

        <button type="button" onClick={toggleNoseNotes} value="" >Show/hide notes</button>
        <textarea type="small" name="NoseIntensityNotes" hideit={hideNoseNotes ? "true" : "false"} ref={register} />
        {errors.NoseIntensity && <p>Value must be at least 1</p> }

        <h3>Flavor Intensity</h3>
        <div class="value">{valueINTENSE}</div>
        <input type="range" id="FlavorIntensity" name="FlavorIntensity" min="1" max="10" defaultValue="0" onChange={e => setValueINTENSE(e.target.value)} ref={register} />
        <button type="button" onClick={toggleIntenseNotes} value="" >Show/hide notes</button>
        <textarea type="small" name="FlavorIntensityNotes" hideit={hideIntenseNotes ? "true" : "false"} ref={register} />
        {errors.FlavorIntensity && <p>Value must be at least 1</p> }

        <h3>Flavor Characteristics</h3>
        {/* <input type="range" id="FlavorCharacteristics" name="FlavorCharacteristics" min="0" max="25" defaultValue="0" onChange={e => updateTextInput(e.target.value,'FlavorScore')} ref={register} /> */}
        <div class="value">{valueCHAR}</div>
        <input type="range" id="FlavorCharacteristics" name="FlavorCharacteristics" min="1" max="25" defaultValue="0" onChange={e => setValueCHAR(e.target.value)} ref={register} />
        <button type="button" onClick={toggleCharNotes} value="" >Show/hide notes</button>
        <textarea type="small" name="FlavorCharacteristicsNotes" hideit={hideCharNotes ? "true" : "false"} ref={register} />
        {errors.FlavorCharacteristics && <p>Value must be at least 1</p> }

        <h3>Balance</h3>
        <div class="value">{valueBAL}</div>
        <input type="range" id="Balance" name="Balance" min="1" max="5" defaultValue="0" onChange={e => setValueBAL(e.target.value)} ref={register} />
        <button type="button" onClick={toggleBalNotes} value="" >Show/hide notes</button>
        <textarea type="small" name="BalanceNotes" hideit={hideBalNotes ? "true" : "false"} ref={register} />
        {errors.Balance && <p>Value must be at least 1</p> }

        <h3>Length</h3>
        <div class="value">{valueLEN}</div>
        <input type="range" id="Length" name="Length" min="1" max="5" defaultValue="0" onChange={e => setValueLEN(e.target.value)} ref={register} />
        <button type="button" onClick={toggleLenNotes} value="" >Show/hide notes</button>
        <textarea type="small" name="LengthNotes" hideit={hideLenNotes ? "true" : "false"} ref={register} />
        {errors.Length && <p>Value must be at least 1</p> }

        <h4>Total</h4>
        <div class="value">{totalValue}</div>
        <input type="hidden" id="Total" name="Total" defaultValue={totalValue} ref={register}/>

        <h2>Tasting Notes</h2>
        <textarea name="TastingNotes" ref={register} />

        <input type="submit" onClick={handleSubmit(onSubmit)} />
        
        </form>
    </UserProvider>
  );
}