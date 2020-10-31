import React, {useState, useCallback} from 'react';
import { useForm } from 'react-hook-form';
//import outputForm from './OutputForm';
import useToggle from './useToggle';
import {Redirect} from 'react-router-dom';
import './index.js';
//import {Routes} from './Routes';
//import {db} from './Config';
//import {Firebase} from './Config';
import firebase from 'firebase';

export default function App() {
  const { register, handleSubmit, errors } = useForm();
  //const onSubmit = data => console.log(data);
  const [valueNOSE, setValueNOSE] = useState(0);
  const [valueINTENSE, setValueINTENSE] = useState(0);
  const [valueCHAR, setValueCHAR] = useState(0);
  const [valueBAL, setValueBAL] = useState(0);
  const [valueLEN, setValueLEN] = useState(0);
  //const totalValue = (50 + Number(valueNOSE) + Number(valueINTENSE) + Number(valueCHAR) + Number(valueBAL) + Number(valueLEN))
  let totalValue = (Number(valueNOSE) + Number(valueINTENSE) + Number(valueCHAR) + Number(valueBAL) + Number(valueLEN))
  if ( totalValue !== 0 ) {
    totalValue = 50 + totalValue
  } 

  const [isOn, toggleIsOn] = useToggle();

  //const [valueALL, setValueALL] = useState();
  let valueAll = ""
  let sampleData = ""

  const [hideNoseNotes, toggleNoseNotes] = useToggle();
  const [hideIntenseNotes, toggleIntenseNotes] = useToggle();
  const [hideCharNotes, toggleCharNotes] = useToggle();
  const [hideBalNotes, toggleBalNotes] = useToggle();
  const [hideLenNotes, toggleLenNotes] = useToggle();


  const [toResults, setToResults] = useState(false);

  var database = firebase.database();

  function writeUserData(userId, name, email, imageUrl) {
    firebase.database().ref('users/' + userId).set({
      username: name,
      email: email,
      profile_picture : imageUrl
    });
  }

  function writeToDatabase(userId, data) {
    firebase.database().ref('users/' + userId + '/' + data.WineName).set({
      WineName: data.WineName,
      Balance: data.Balance,
      data
    });
  }

  function readDatabase() {
    return firebase.database().ref('/users/').once('value').then(function(snapshot) {
        var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
        // ...
    });
  }

  const readAllDatabase = () => {
    return firebase.database().ref('users/jds007/')
  };

  /* const useToggle = (initialState) => {
    const [hideNoseIntensity, sethideNoseIntensity] = useState(true);
    const toggle = React.useCallback(
      () => sethideNoseIntensity(state => !state),
      [sethideNoseIntensity],
    )
  }
 */

/*   function toggleState(varName) {
    useCallback(() => setValue((value) => !value), []);
  }  */

/*   const useToggle = (initialValue = false) => {
    const [value, setValue] = useState(initialValue);
    const toggle = useCallback(() => setValue((value) => !value), []);
    return [value, toggle];
  }; */

  


  function onSubmit(data) {
    alert("Successfully submitted form");
    //alert(data.form)
    //alert("Wine:" + data.WineName + " Nose Intensity:" + data.NoseIntensity);
    //let sampleData = data;
    //writeUserData("ksdf","Bob","bob@hotmail.com","nourl")
    writeToDatabase("jds0007",data)
    //let readdata = readDatabase()
    //alert(readdata)
    //alert(readDatabase)
    //alert(sampleData.Balance)

    //console.log(data);
    //setToResults(true);
  }

  function updateTextInput(val,changeID) {
    document.getElementById(changeID).value=val;
  }

  console.log(errors);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="WineJS Wine Review">
        <h1>WineJS Review</h1>
      </div>

      {/* {toResults ? <Redirect to="/reviewresult" /> : null} */}
      {toResults ? <Redirect to={{ pathname:"/outputform", state: { data: sampleData }}} /> : null}
          


      <h2>Producer</h2>
      <input type="text" placeholder="Producer" name="Producer" ref={register} />

      <h2>Wine Name</h2>
      <input type="text" placeholder="Wine Name" name="WineName" ref={register({required: "Wine Name is Required", maxLength: 100})} />
      {/* {errors.WineName && <p>Wine Name not entered</p> } */}
      {errors.WineName && <p>{errors.WineName.message}</p> }

      <h2>Vintage</h2>
      <input type="number" placeholder="Vintage" name="Vintage" ref={register({min: 1900,max: 2030})} />

      <h3>Nose Intensity</h3>
      <div class="value">{valueNOSE}</div>
      <input type="range" id="NoseIntensity" name="NoseIntensity" min="1" max="5" defaultValue="0" onChange={e => setValueNOSE(e.target.value)} ref={register} />
      {/* <button name="NoseIntensityNotesButton" id="NoseIntensityNotesButton" onClick={e => sethideNoseIntensity(!)} ></button> */}
      {/* <textarea name="NoseIntensityNotes" defaultValue={hideNoseIntensity} hideit={hideNoseIntensity} ref={register} /> */}

      {/* <button onClick={() => toggle()}>toggle</button> */}
      {/* <button name="TESTToggle" id="TESTToggle" onClick={alert(hideNoseIntensity)} >{hideNoseIntensity}</button> */}
      {/* <textarea name="NoseIntensityNotes" defaultValue={hideNoseIntensity ? "true" : "It worked"} hideit={hideNoseIntensity ? "true" : "It worked"} ref={register} /> */}
      <button type="button" onClick={toggleNoseNotes} value="" >Show/hide notes</button>
      <textarea type="small" name="NoseIntensityNotes" hideit={hideNoseNotes ? "true" : "false"} ref={register} />
      {/* <h3>CURRENT: {hideNoseIntensity} </h3>
      <h3>Second: {hideNoseIntensity} </h3> */}
      {/* <p>{hideNoseIntensity}</p> */}
      {errors.NoseIntensity && <p>Value must be at least 1</p> }


{/*       return (
        <>
          {hideNoseIntensityNotes ? 'True STUFF' : 'False STUFF'}
          <button onClick={toggleNoseIntensityNotes}>
            Press DIS Button
          </button>
        </>
      ) */}

{/* 
      return (
        <>
          {isOn ? 'The light is on!' : 'Hey who turned off the lights'}
          <button onClick={toggleIsOn}>
            Press me
          </button>
        </>
      ) */}



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


      {/* <p></p>
      <h2>Total</h2>
      <div class="value">{pointTOTAL}</div>

      <h2>Test AREA 6</h2>
      <p>You clicked {count} times</p>
      <p>TotalValue: {Number(valueNOSE) + Number(valueBAL)}</p>
      <button onClick={refresh}>Click dis button</button> */}




{/* 
      <h2>TEST STUFF</h2>
      <div class="value">0</div>
      <input type="range" min="0" max="10" step="1" ></input>

      <h2>TEST AREA 2</h2>
      <input type="range" min="0" max="10" step="1" ></input>
      <div class="value"></div>

      <h2>TEST AREA 3</h2>
      <input type="range" id="F1" name="F1" min="0" max="25" defaultValue="0" onChange={e => updateTextInput(e.target.value,'F2')} ref={register} />
      <input type="text" id="F2" name="F2" defaultvalue="0" />

      <h2>Test AREA 4</h2>
      <input type="range" id="F3" name="F3" min="0" max="25" defaultValue="0" onChange={e => updateTextInput2(e.target.value)} ref={register} />
      <input type="text" id="F4" name="F4" defaultvalue="0" />

      <h2>TEST AREA 5</h2>
      <input type="text" value={name} onChange={e => setName(e.target.value)} />

      <h2>Test AREA 6</h2>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click dis button</button>

      <h2>Test AREA 7</h2>
      <p>Your value is {value1}</p>
      <div class="value">{value1}</div>
      <input type="range" id="F3" name="F3" min="0" max="25" defaultValue="0" onChange={e => setValue1(e.target.value)} ref={register} /> */}


      {/* <input type="submit" /> */}
      <input type="submit" onClick={handleSubmit(onSubmit)} />
      
    </form>
  );
}