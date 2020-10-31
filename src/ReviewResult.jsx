import React, {Fragment, useContext, useEffect, useState} from 'react';
import Select from 'react-select'
//import { useForm } from 'react-hook-form';
//import App from './App';
import firebase from 'firebase';
import './index.js';
import outputForm from './OutputForm';
import { useList, useListKeys } from "react-firebase-hooks/database"
import UserProvider, { UserContext } from "./providers/UserProvider";

//import firestore from './Firebase'
//import firebase from "firebase/app";

// var wineRef = firebase.database().ref("/users");
// const [snapshots, loading, error] = useList(wineRef );

export const ReviewResult = () => {
    const reviewData = {};
    const user = useContext(UserContext);
    const {displayName, email} = user;

    const [reviewScores, setReviewScores] = useState({})

    // const [ Balance , setBalance ] = useState(snapshot.val().Balance);
    // const [ BalanceNotes, setBalanceNotes ] = useState(snapshot.val().BalanceNotes);
    // const [ FlavorCharacteristics, setFlavorCharacteristics ] = useState(snapshot.val().FlavorCharacteristics);
    // const [ FlavorCharacteristicsNotes, setFlavorCharacteristicsNotes ] = useState(snapshot.val().FlavorCharacteristicsNotes);
    // const [ FlavorIntensity, setFlavorIntensity ] = useState(snapshot.val().FlavorIntensity);
    // const [ FlavorIntensityNotes, setFlavorIntensityNotes ] = useState(snapshot.val().FlavorIntensityNotes);
    // const [ Length, setLength ] = useState(snapshot.val().Length);
    // const [ LengthNotes, setLengthNotes ] = useState(snapshot.val().LengthNotes);
    // const [ NoseIntensity, setNoseIntensity ] = useState(snapshot.val().NoseIntensity);
    // const [ NoseIntensityNotes, setNoseIntensityNotes ] = useState(snapshot.val().NoseIntensityNotes);
    // const [ Producer, setProducer ] = useState(snapshot.val().Producer);
    // const [ TastingNotes, setTastingNotes ] = useState(snapshot.val().TastingNotes);
    // const [ Total, setTotal ] = useState(snapshot.val().Total);
    // const [ Vintage, setVintage ] = useState(snapshot.val().Vintage);
    // const [ WineName1, setWineName1 ] = useState(snapshot.val().WineName);
    
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



    // setBalance(snapshot.val().Balance);
    // setBalanceNotes(snapshot.val().BalanceNotes);
    // setFlavorCharacteristics(snapshot.val().FlavorCharacteristics);
    // setFlavorCharacteristicsNotes(snapshot.val().FlavorCharacteristicsNotes);
    // setFlavorIntensity(snapshot.val().FlavorIntensity);
    // setFlavorIntensityNotes(snapshot.val().FlavorIntensityNotes);
    // setLength(snapshot.val().Length);
    // setLengthNotes(snapshot.val().LengthNotes);
    // setNoseIntensity(snapshot.val().NoseIntensity);
    // setNoseIntensityNotes(snapshot.val().NoseIntensityNotes);
    // setProducer(snapshot.val().Producer);
    // setTastingNotes(snapshot.val().TastingNotes);
    // setTotal(snapshot.val().Total);
    // setVintage(snapshot.val().Vintage);
    // setWineName1(snapshot.val().WineName);

    // function getReview() {firebase.database().ref('/users/jds0007').on('value', function(snapshot) {
    //     console.log(snapshotToArray(snapshot));
    //     var reviewData = snapshotToArray(snapshot);
    // })};

    //var userRef = firebase.database().ref('/users/jds0007');
    //var winesRef = userRef.child("Wine1");
    //let TestValue = "TestValue"

    //var balScore = winesRef.child("Balance");
    //var wineName1 = winesRef.child("WineName");

    // Test for the existence of certain keys within a DataSnapshot
    //var ref = firebase.database().ref("users/jds0007");

    //var dbpathref = '/users/' + user.uid + "/" + wineReviewName + "/data"

    var wineReviewName = "Wine4"
    var dbpathref = '/users/' + user.uid + "/" + wineReviewName + '/data'
    var dbWineNames = '/users/' + user.uid + "/"

    var Answer = props => <select>{props.map((x,y) => <option key={y}>{x}</option>)}</select>;

    // var refdata = firebase.database().ref(dbpathref);
    //     ref.once("value")
    //     .then(function(snapshot) {
    //         var key = snapshot.key; // "ada"
    //         var childKey = snapshot.child().key; // "last"
    // });

    const [winesList, setWinesList] = useState([]);   
    
    // function updateWinesList() {
    //     let ref = firebase.database().ref(dbWineNames);
    //     ref.on('value' , snapshot => {
    //         var state = snapshot.val();
    //                 console.log(snapshot);
    //                 console.log(state);
    //         setWinesList([...winesList,{
    //             winename: state.WineName,balance: state.balance
    //         }]);
    //     });
    // };
    
    
    // function testWineList () {  
    //     var refWines = firebase.database().ref(dbWineNames);
    //         refWines.once("value").then(function(snapshot) {
    //             var key = snapshot.key; // "ada"
    //             //var childKey = snapshot.child("name/last").key; // "last"
    //     });
    //     console.log(refWines)
    //     alert(refWines)
    // }


    //// Create Wine List from database user's existing wine reviews
    // var query = firebase.database().ref(dbWineNames).orderByKey();        
    // query.once("value")
    //     .then(function(snapshot) {
    //         snapshot.forEach(function(childSnapshot) {
    //         var key = childSnapshot.key;
    //         var childData = childSnapshot.val();
    //         console.log(key)
    //         //setWinesList(winesList => [...winesList, key])
    //     });        
    // });

    // var query = firebase.database().ref(dbWineNames).orderByKey();        
    // function setWineArray() {
    //     query.once("value")
    //         .then(function (snapshot) {
    //             snapshot.forEach(function (childSnapshot) {
    //                 var key = childSnapshot.key;
    //                 var childData = childSnapshot.val();
    //                 console.log(key);
    //                 setWinesList(winesList => [...winesList, key]);
    //             });
    //         });
    // }


    var query = firebase.database().ref(dbWineNames).orderByKey();   
    var test = [];

    function handleChange(e){
        wineReviewName = e;
        alert(e);
        dbpathref = '/users/' + user.uid + "/" + wineReviewName + '/data'
        alert(dbpathref)
        setReviewData()        
    }


    const [theArray, setTheArray] = useState([]);
    const addArrayItem = (newArrayItem) => setTheArray(state => [...state, newArrayItem]);

    function SetWineArray() {
        var returnArr = [];
            //useEffect(() => {            
                query.once("value").then(function (snapshot) {
                    snapshot.forEach(function (childSnapshot) {
                        // var item = childSnapshot.val();
                        // item.key = childSnapshot.key;
                        returnArr.push({ label:childSnapshot.key, value:childSnapshot.key});  
                        //returnArr.push(item);                               
                        //console.log(item)
                    });                
                });        

            //}, []);
        test = returnArr        
        return returnArr
    }
    SetWineArray()
    //console.log(test)


    // let winenameList = test.map((winename, index) => {
        
    //     console.log(winename)

    //     return (            
    //         <option key={winename.key} value={winename.key}>{winename.key}</option>
    //     );
    // }, this);

    let winenameList = test.map((winename, index) => {
        
        console.log(winename)

        return (            
            <option key={winename.key} value={winename.key}>{winename.key}</option>
        );
    }, this);


    function setReviewData() {
        {firebase.database().ref(dbpathref).on('value', (snapshot) => {
            //console.log(snapshot)
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
        })};
        alert("getting review data")
    }
    
    // function showScores() {
    //     return(
    //         <div>
    //             <h2>Balance: {Balance}</h2>
    //             <h2>Balance Notes: {BalanceNotes}</h2>
    //             <h2>Flavor Characteristics: {FlavorCharacteristics}</h2>
    //             <h2>Wine Name: {WineName1}</h2>
    //             <h2>Tasting Notes: {TastingNotes}</h2>
    //         </div>
    //     );
    // }
    
    


    // var refCheck = firebase.database().ref("/users/CGVMdF4jxZclFvfekG7y65SO6272")
    // var refCheckData = firebase.database().ref("/users/CGVMdF4jxZclFvfekG7y65SO6272").child("Wine4/data")


    // //var userId = firebase.auth().currentUser.uid;
    // return firebase.database().ref('/users/jds0007/Wine1').once('value').then(function(snapshot) {
    //     var WineName2 = (snapshot.val() && snapshot.val().WineName) || 'Anonymous';
    //     var Balance2 = (snapshot.val() && snapshot.val().Balance) || 'Anonymous';
    //     // ...
    // });

    function getReview() {
        firebase.database().ref("/users/" + user.uid).on('value', function (snapshot) {
            //console.log(snapshotToArray(snapshot));
            var reviewData = snapshotToArray(snapshot);
        });
    }

    var wineNamesList = {};
    function getWineNamesList() {
        firebase.database().ref("/users/" + user.uid).on('value', function (snapshot) {
            //console.log(snapshotToArray(snapshot));
            wineNamesList = snapshotToArray(snapshot);
        });
    }


    const [wineNameOptions, setWineNameOptions] = useState([]);

    // firebase.database().ref(dbWineNames).on('value', function(snapshot) {
    //     console.log(snapshotToArray(snapshot));
    // });

    var wineRef = firebase.database().ref("/users/");
    const [snapshots, loading, error] = useList(wineRef );

    function snapshotToArray(snapshot) {
        var returnArr = [];
    
        snapshot.forEach(function(childSnapshot) {
            var item = childSnapshot.val();
            item.key = childSnapshot.key;
    
            returnArr.push(item);
        });
    
        return returnArr;
    };


    var test2 = [];
    function SetShowResultsArray() {
        var returnResArr= [];       
            firebase.database().ref(dbpathref).on('value', (snapshot) => {
                //returnResArr = snapshotToArray(snapshot);
                snapshot.forEach(function (childSnapshot) {
                    returnResArr = snapshotToArray(snapshot);
                    //returnResArr.push({ label:childSnapshot.key, value:childSnapshot.key});  
                    //returnArr.push(item);                               
                    //console.log(item)
                });                
            });        
        test2 = returnResArr        
        return returnResArr
        console.log(test2)
    }
    
    return(
        <Fragment>
            <div>
                <div>
                    <h1>Results</h1>
                </div>
                <form>
                    <Select options={ test } isSearchable={true} onChange={e => handleChange(e.value)} />
                    {/* {showScores(reviewData)} */}
                </form>
                <div>
                    <reviewresults>
                        <h1>Wine Name: {WineName1}</h1>
                        <h2>Producer: {Producer}</h2>
                        <h2>Vintage: {Vintage}</h2>
                        <h2>Total: {Total}</h2>
                        <h2>TastingNotes:</h2>
                        {TastingNotes}
                        <h2>Nose Intensity: {NoseIntensity}</h2>
                        <h2>Nose Intensity Notes:</h2>
                        {NoseIntensityNotes}
                        <h2>Flavor Intensity: {FlavorIntensity}</h2>
                        <h2>Flavor Intensity Notes:</h2>
                        {FlavorIntensityNotes}
                        <h2>FlavorCharacteristics: {FlavorCharacteristics}</h2>
                        <h2>FlavorCharacteristicsNotes:</h2>
                        {FlavorCharacteristicsNotes}
                        <h2>Balance: {Balance}</h2>
                        <h2>Balance Notes:</h2>
                        {BalanceNotes}
                        <h2>Length: {Length}</h2>
                        <h2>Length Notes:</h2>
                        {LengthNotes}
                    </reviewresults>
                </div>               
            </div>
        </Fragment>
    )
};