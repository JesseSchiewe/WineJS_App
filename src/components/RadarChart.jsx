import { ResponsiveRadar } from '@nivo/radar'
import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';

export const GetChartData = (dbpathref) => {
    let firebaseData = ''

    firebase.database().ref(dbpathref).on('value', (snapshot) => {
        firebaseData = snapshot.val();
    });

    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(firebaseData), 1000) 
    });
}

const MyResponsiveRadar = ({ data, revname }) => (
    <ResponsiveRadar
        data={data}
        keys={ revname }
        indexBy="Category"
        maxValue={1}
        valueFormat=" >-.0%"
        margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
        borderColor={{ from: 'color' }}
        gridLabelOffset={10}
        dotSize={7}
        dotColor={{ theme: 'background' }}
        dotBorderWidth={2}
        colors={{ scheme: 'category10' }}
        fillOpacity={.4}
        blendMode="multiply"
        motionConfig="wobbly"
        legends={[
            {
                anchor: 'top-left',
                direction: 'column',
                translateX: -50,
                translateY: -40,
                itemWidth: 80,
                itemHeight: 20,
                itemTextColor: '#999',
                symbolSize: 12,
                symbolShape: 'circle',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemTextColor: '#000'
                        }
                    }
                ]
            }
        ]}
    />
)


export default function RadarChart({ ReviewName, user }) {
    const [data, setData] = useState([]);
    const [revname, setRevName] = useState([]);
    const [finished, setFinished] = useState(false);
    const handleAddWine = (newWine) => {
        setRevName((revname) => [...revname,newWine]);
    };
    
    let DataModel = [
        {
            Category: 'Total',
        },
        {
            Category: 'NoseIntensity',
        },
        {
            Category: 'FlavorIntensity',
        },
        {
            Category: 'FlavorCharacteristics',
        },
        {
            Category: 'Balance',
        },
        {
            Category: 'Length',
        }
    ];


    useEffect(() => {
        let dbpathref = '/users/' + user.uid + "/" + ReviewName + '/data';

        const fetchData = async (ReviewName) => {
            dbpathref = '/users/' + user.uid + "/" + ReviewName + '/data'
            var revData = await GetChartData(dbpathref);
            const chartMath = {NoseIntensity: 5,FlavorIntensity: 10,FlavorCharacteristics: 25,Balance: 5,Length: 5,Total: 100};

            Object.entries(revData).map(([key,value]) => {
                if (Object.keys(chartMath).includes(key)) {

                    let percentValue = (Number(value) / chartMath[key])

                    if (key === 'Total') {
                        percentValue = (Number(value) - 50 ) / 50
                    }

                    let tempObject = {
                        // 'Category': key,
                        [revData.WineName] : percentValue
                    };

                    let index = DataModel.findIndex(d => d.Category === key);
                    if (index !== -1) {DataModel[index][revData.WineName] = percentValue};

                    return tempObject
                } else {
                    return undefined
                };
            }).filter(notUndefined => notUndefined !== undefined);

            if (!(revname.includes(revData.WineName))) {                
                handleAddWine(revData.WineName);
            };
        };
        if (Array.isArray(ReviewName)) {
            ReviewName.forEach(fetchData);
            setData(DataModel);
            setFinished(true);
        } else {
            fetchData(ReviewName);
            setData(DataModel);
            setFinished(true);
        };
    // }, [ReviewName])
    }, [ReviewName]) // eslint-disable-line react-hooks/exhaustive-deps

    return finished ? 
        (
            <div style={{height: '320px', paddingBottom: '10px'}}>
                <MyResponsiveRadar data={data} revname={revname} />
            </div>
        )
        :
        ( 
            <div className="Center">
                <h5>
                    Loading Review Data...
                </h5>
            </div>
        )    
}
