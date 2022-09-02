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

const RadarStyle = {    
    // "background": "#000000",
    "textColor": "#ffffff",
    "fontSize": 11,
    "axis": {
        "domain": {
            "line": {
                "stroke": "#777777",
                "strokeWidth": 1
            }
        },
        "legend": {
            "text": {
                "fontSize": 12,
                "fill": "#333333"
            }
        },
        "ticks": {
            "line": {
                "stroke": "#777777",
                "strokeWidth": 1
            },
            "text": {
                "fontSize": 11,
                "fill": "#333333"
            }
        }
    },
    "grid": {
        "line": {
            "stroke": "#dddddd",
            "strokeWidth": 1
        }
    },
    "legends": {
        "title": {
            "text": {
                "fontSize": 11,
                "fill": "#333333"
            }
        },
        "text": {
            "color": "#ffffff",
            "fontSize": 11,
            "fill": "#333333"
        },
        "ticks": {
            "line": {},
            "text": {
                "fontSize": 10,
                "fill": "#333333"
            }
        }
    },
    "annotations": {
        "text": {
            "fontSize": 13,
            "fill": "#333333",
            "outlineWidth": 2,
            "outlineColor": "#ffffff",
            "outlineOpacity": 1
        },
        "link": {
            "stroke": "#000000",
            "strokeWidth": 1,
            "outlineWidth": 2,
            "outlineColor": "#ffffff",
            "outlineOpacity": 1
        },
        "outline": {
            "stroke": "#000000",
            "strokeWidth": 2,
            "outlineWidth": 2,
            "outlineColor": "#ffffff",
            "outlineOpacity": 1
        },
        "symbol": {
            "fill": "#000000",
            "outlineWidth": 2,
            "outlineColor": "#ffffff",
            "outlineOpacity": 1
        }
    },
    "tooltip": {
        "container": {
            "background": "#000000",
            "color": "#ffffff",
            "fontSize": 12
        },
        "basic": {},
        "chip": {},
        "table": {},
        "tableCell": {},
        "tableCellValue": {}
    }    
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
        gridShape="linear"
        dotSize={7}
        dotColor={{ theme: 'background' }}
        dotBorderWidth={2}
        colors={{ scheme: 'category10' }}
        fillOpacity={.6}
        blendMode="multiply"
        motionConfig="wobbly"
        theme={RadarStyle}
        legends={[
            {
                anchor: 'top-left',
                direction: 'column',
                translateX: -50,
                translateY: -40,
                itemWidth: 80,
                itemHeight: 20,
                itemTextColor: '#ffffff',
                symbolSize: 12,
                symbolShape: 'circle',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemTextColor: 'crimson'
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
