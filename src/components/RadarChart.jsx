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
        // console.log(firebaseData);
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
        maxValue={1}
        // valueFormat=">-.2f"
        valueFormat=" >-.0%"
        margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
        borderColor={{ from: 'color' }}
        gridLabelOffset={10}
        dotSize={10}
        dotColor={{ theme: 'background' }}
        dotBorderWidth={2}
        // colors={{ scheme: 'nivo' }}
        colors={{ scheme: 'category10' }}
        fillOpacity={.55}
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
            // const chartCategories = [ 'NoseIntensity', 'FlavorIntensity', 'FlavorCharacteristics', 'Balance', 'Length' ]
            const chartMath = {NoseIntensity: 5,FlavorIntensity: 10,FlavorCharacteristics: 25,Balance: 5,Length: 5,Total: 100};

            // console.log(chartMath);
            // console.log(Object.keys(chartMath));


            const final = Object.entries(revData).map(([key,value]) => {
                // if (chartCategories.includes(key)) {
                if (Object.keys(chartMath).includes(key)) {

                    // let wineLabel = revData.WineName
                    // let percentValue = (Number(value) / chartMath[key]) * 100

                    let percentValue = (Number(value) / chartMath[key])

                    if (key === 'Total') {
                        percentValue = (Number(value) - 50 ) / 50
                    }

                    // console.log(`Key: ${key} percentage: ${percentValue}`)

                    let tempObject = {
                        'Category': key,
                        // [revData.WineName] : Number(value)
                        [revData.WineName] : percentValue
                    };
                    return tempObject
                } else {
                    return undefined
                };
            }).filter(notUndefined => notUndefined !== undefined);

            setRevName(revData.WineName);
            // console.log(revname);

            setData(final);
        }
        fetchData()
    }, [dbpathref])


    return data ? 
        (
            // <div style={{height: '500px', display: 'flex', alignItems: 'center', alignSelf: 'center', alignContent: 'center', margin: 'auto' }}>
            // <div style={{height: '500px', display: 'flex', alignItems: 'center', alignSelf: 'center', alignContent: 'center'}}>
            <div style={{height: '320px', paddingBottom: '10px'}}>
                {/* {console.log(data)} */}
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
