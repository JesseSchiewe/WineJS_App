import React, {Fragment, useContext, useState} from 'react';
import Select from 'react-select'
import firebase from 'firebase';
// import { Favorites } from './Favorites';
import { UserContext } from "./providers/UserProvider";
import useToggle from './useToggle';

import {Review} from './Review';

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
    const [ ReviewDate, setReviewDate ] = useState();
    const [ ActualPrice, setActualPrice ] = useState();
    const [ WineValue, setWineValue ] = useState();


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
            setReviewDate(snapshot.val().ReviewDate);
            setActualPrice(snapshot.val().ActualPrice);
            setWineValue(snapshot.val().WineValue);
        });
    }

    const [hideFavorites, toggleHideFavorites] = useToggle();
    const [hideFlavorCharacteristics, toggleHideFlavorCharacteristics] = useToggle();
    var dbWineNamesWI = '/users/' + user.uid + "/"
    var querywi = firebase.database().ref(dbWineNamesWI).orderByKey();

    var wineitems = [];
    function SetWineArrayItems() {
        var returnArrWineItems = [];         
        querywi.once("value").then(function (snapshotWI) {
            snapshotWI.forEach(function (childSnapshotWI) {
                var wName = childSnapshotWI.key 
                var wTotal = childSnapshotWI.child("data").child("Total").val();
                returnArrWineItems.push({ wine:wName, total:wTotal });
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
    const sortByFlavorCharacteristicsScore = () => {
        const sorted = [...topFlavorCharacteristics].sort((a, b) => {
            return  b.flavorcharacteristics - a.flavorcharacteristics;
        });
        setTopFlavorCharacteristics(sorted);
    };

    return(
        <Fragment>
            <div>
                <div>
                    <h1>Results</h1>
                </div>
                {/* {Favorites()} */}

                {() => {sortByScore(); toggleHideFavorites()}}

                <button type="button" onClick={() => {sortByScore(); toggleHideFavorites()}} >Show/hide Top Rated Wines</button>
                {hideFavorites ? "" : (
                        <div>
                            <h6>
                                Favorite Wines 1
                            </h6>
                        </div>
                    )
                }
                {hideFavorites ? "" : topRated.map((wineitem, i) => {
                    return (
                        <div>
                            <h6 key={i}>
                                {wineitem.total} --- <b className="wineReviewName" value={wineitem.wine} onClick={() => handleChange(wineitem.wine)} >{wineitem.wine} </b>
                            </h6>;
                        </div>
                    );
                })}

                {() => {sortByFlavorCharacteristicsScore(); toggleHideFlavorCharacteristics()}}
                <button type="button" onClick={() => {sortByFlavorCharacteristicsScore(); toggleHideFlavorCharacteristics()}} >Show/hide Flavor Characteristics</button>
                {hideFlavorCharacteristics ? "" : (
                        <div>
                            <h6>
                                Top Flavor Characteristics Score
                            </h6>
                        </div>
                    )
                }
                {hideFlavorCharacteristics ? "" : topRated.map((wineitem, i) => {
                    return (
                        <div>
                            <h6 key={i}>
                                {wineitem.total} --- <b className="wineReviewName" value={wineitem.wine} onClick={() => handleChange(wineitem.wine)} >{wineitem.wine} </b>
                            </h6>;
                        </div>
                    );
                })}

                <button type="button" onClick={Review} >Show/hide Review</button>

                <form>
                    <Select options={ test } className="selectBox" isSearchable={true} onChange={e => handleChange(e.value)} />
                </form>
                {WineName1!=null &&
                    <div>
                        <reviewresults>
                            <h1>Wine Name: {WineName1}</h1>
                            <h2>Producer: {Producer}</h2>
                            <h2>Vintage: {Vintage}</h2>
                            <h2>Review Date: {ReviewDate}</h2>
                            <h2>Total: {Total}</h2>
                            <h2>Tasting Notes:</h2>
                            <div className="ResultText">
                                {TastingNotes} 
                            </div>
                            <h2>Actual Price: {ActualPrice}</h2>
                            <h2>Perceived Value: {WineValue}</h2>
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
                            <h2>Flavor Characteristics: {FlavorCharacteristics}</h2>
                            <h2>Flavor Characteristics Notes:</h2>
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