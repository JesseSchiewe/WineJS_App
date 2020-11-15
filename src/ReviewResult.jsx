import React, {Fragment, useContext, useState} from 'react';
import Select from 'react-select'
//import { useForm } from 'react-hook-form';
//import App from './App';
import firebase from 'firebase';
import './index.js';
//import outputForm from './OutputForm';
//import { useList, useListKeys } from "react-firebase-hooks/database"
import { UserContext } from "./providers/UserProvider";

export const ReviewResult = () => {
    const user = useContext(UserContext);
    const [ Balance , setBalance ] = useState();
    const [ BalanceNotes, setBalanceNotes ] = useState();
    const [ FlavorCharacteristics, setFlavorCharacteristics ] = useState();
    const [ FlavorCharacteristicsNotes, setFlavorCharacteristicsNotes ] = useState();
    const [ FlavorIntensity, setFlavorIntensity ] = useState();
    const [ FlavorIntensityNotes, setFlavorIntensityNotes ] = useState();
    const [ Length, setLength ] = useState();
    const [ LengthNotes, setLengthNotes ] = useState();
    const [ NoseIntensity, setNoseIntensity ] = useState();
    const [ NoseIntensityNotes, setNoseIntensityNotes ] = useState();
    const [ Producer, setProducer ] = useState();
    const [ TastingNotes, setTastingNotes ] = useState();
    const [ Total, setTotal ] = useState();
    const [ Vintage, setVintage ] = useState();
    const [ WineName1, setWineName1 ] = useState();

    var wineReviewName = "Wine4"
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
            //useEffect(() => {            
                query.once("value").then(function (snapshot) {
                    snapshot.forEach(function (childSnapshot) {
                        returnArr.push({ label:childSnapshot.key, value:childSnapshot.key});  
                    });                
                });        

            //}, []);
        test = returnArr        
        return returnArr
    }
    SetWineArray()

    function setReviewData() {
        firebase.database().ref(dbpathref).on('value', (snapshot) => {
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
            setTotal(snapshot.val().Total);
            setVintage(snapshot.val().Vintage);
            setWineName1(snapshot.val().WineName);
        });
    }

    return(
        <Fragment>
            <div>
                <div>
                    <h1>Results</h1>
                </div>
                <form>
                    <Select options={ test } isSearchable={true} onChange={e => handleChange(e.value)} />
                </form>

                {/* {ShowReview} */}
                
                {WineName1!=null &&
                    <div>
                        <reviewresults>
                            <h1>Wine Name: {WineName1}</h1>
                            <h2>Producer: {Producer}</h2>
                            <h2>Vintage: {Vintage}</h2>
                            <h2>Total: {Total}</h2>
                            <h2>TastingNotes:</h2>
                            <div className="ResultText">
                                {TastingNotes} 
                            </div>
                            <h2>Nose Intensity: {NoseIntensity}</h2>
                            <h2>Nose Intensity Notes:</h2>
                            <div className="ResultText">
                                {NoseIntensityNotes}
                            </div>
                            <h2>Flavor Intensity: {FlavorIntensity}</h2>
                            <h2>Flavor Intensity Notes:</h2>
                            <div className="ResultText">
                                {FlavorIntensityNotes}
                            </div>
                            <h2>FlavorCharacteristics: {FlavorCharacteristics}</h2>
                            <h2>FlavorCharacteristicsNotes:</h2>
                            <div className="ResultText">
                                {FlavorCharacteristicsNotes}
                            </div>
                            <h2>Balance: {Balance}</h2>
                            <h2>Balance Notes:</h2>
                            <div className="ResultText">
                                {BalanceNotes}
                            </div>
                            <h2>Length: {Length}</h2>
                            <h2>Length Notes:</h2>
                            <div className="ResultText">
                                {LengthNotes}
                            </div>
                        </reviewresults>
                    </div>
                }
            </div>
        </Fragment>
    )
};