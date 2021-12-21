import { ResponsiveRadar } from '@nivo/radar'
import React, { useState, useEffect } from 'react';
import firebase from 'firebase';

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

export const GetChartData = (dbpathref) => {
    let firebaseData = ''

    firebase.database().ref(dbpathref).on('value', (snapshot) => {
        firebaseData = snapshot.val();
        console.log(firebaseData);
    });

    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(firebaseData), 1000) 
    });
}


const MyResponsiveRadar = ({ data, revname }) => (
    <ResponsiveRadar
        data={data}
        // keys={[ 'chardonay', 'carmenere', 'syrah' ]}
        // keys={[ 'Total', 'NoseIntensity', 'FlavorIntensity', 'FlavorCharacteristics', 'Balance', 'Length' ]}
        // keys={[ 'stuff', 'LSKJF1' ]}
        // keys={[ 'LSKJF1' ]}
        keys={[revname]}
        indexBy="Category"
        valueFormat=">-.2f"
        margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
        borderColor={{ from: 'color' }}
        gridLabelOffset={36}
        dotSize={10}
        dotColor={{ theme: 'background' }}
        dotBorderWidth={2}
        colors={{ scheme: 'nivo' }}
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


// export default function RadarChart() {
export default function RadarChart({ ReviewName, user }) {
    const [data, setData] = useState([]);
    const [revname, setRevName] = useState();

    let dbpathref = '/users/' + user.uid + "/" + ReviewName + '/data'

    useEffect(() => {
        const fetchData = async () => {
            var revData = await GetChartData(dbpathref);
            const chartCategories = [ 'NoseIntensity', 'FlavorIntensity', 'FlavorCharacteristics', 'Balance', 'Length' ]

            const final = Object.entries(revData).map(([key,value]) => {
                if (chartCategories.includes(key)) {

                    let wineLabel = revData.WineName
                    let tempObject = {
                        'Category': key,
                        [wineLabel] : Number(value)
                    };
                    return tempObject
                };
            }).filter(notUndefined => notUndefined !== undefined);

            setRevName(revData.WineName);
            console.log(revname);

            setData(final);
        }
        fetchData()
    }, [dbpathref])


    return data ? 
        (
            // <div style={{height: '500px', display: 'flex', alignItems: 'center', alignSelf: 'center', alignContent: 'center', margin: 'auto' }}>
            // <div style={{height: '500px', display: 'flex', alignItems: 'center', alignSelf: 'center', alignContent: 'center'}}>
            <div style={{height: '500px'}}>
                {console.log(data)}
                <MyResponsiveRadar data={data} revname={revname} />
                {/* <MyResponsiveRadar data={TEST6} />  */}
            </div>
        )
        : 
        <div className="Center">
            <h5>
                Loading Review Data...
            </h5>
        </div>
}
