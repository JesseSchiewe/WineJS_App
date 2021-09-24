import React, {Fragment, useContext, useState} from 'react';
import firebase from 'firebase';
import { UserContext } from "../providers/UserProvider";
import useToggle from './useToggle';

export const Favorites = () => {
    const user = useContext(UserContext);

    const [hideFavorites, toggleHideFavorites] = useToggle();
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

    return(
        <Fragment>
            <div>
                <div>
                    <button type="button" onClick={() => {sortByScore(); toggleHideFavorites()}} >Show/hide Top Rated Wines</button>
                    {hideFavorites ? "" : (
                            <div>
                                <h1>
                                    Favorites
                                </h1>
                            </div>
                        )
                    }

                    {hideFavorites ? "" : topRated.map((wineitem, i) => {
                        return (
                            <div>
                                <h6 key={i}>
                                    {wineitem.total} --- <b className="wineReviewName" onClick={e => handleChange(e.value)} >{wineitem.wine} </b>
                                </h6>;
                            </div>
                        );
                    })}
                </div>
            </div>
        </Fragment>
    )
};