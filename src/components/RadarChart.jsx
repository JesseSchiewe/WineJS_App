import { ResponsiveRadar } from '@nivo/radar'
import React, { useState, useEffect } from 'react';
import firebase from 'firebase';
// import { forEach } from 'core-js/core/array';

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

// let JUNKANDSTUFF = [
//     {
//         Category: 'Total',
//         LSKJF1: 0.5
//     },
//     {
//         Category: 'NoseIntensity',
//         LSKJF1: 0.1
//     },
//     {
//         Category: 'FlavorIntensity',
//         LSKJF1: 0.4
//     },
//     {
//         Category: 'FlavorCharacteristics',
//         LSKJF1: .6
//     },
//     {
//         Category: 'Balance',
//         LSKJF1: 1
//     },
//     {
//         Category: 'Length',
//         LSKJF1: 1
//     }
// ];

const MyResponsiveRadar = ({ data, revname }) => (
// const MyResponsiveRadar = ({ data }) => (

    <ResponsiveRadar
        data={data}
        // data={JUNKANDSTUFF}
        // keys={[ 'chardonay', 'carmenere', 'syrah' ]}
        // keys={[ 'Total', 'NoseIntensity', 'FlavorIntensity', 'FlavorCharacteristics', 'Balance', 'Length' ]}
        // keys={[ 'stuff', 'LSKJF1' ]}
        // keys={[ 'LSKJF1' ]}
        // keys={ revname }
        keys={[revname]}
        
        // keys={revname}
        // keys={['Wine Name 3 and what not', '"sa asfasd sda sdf wfew fwfe wefww  wffwe "', 'LSKJF1']}
        
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
    const [revname, setRevName] = useState([]);
    // let revname = [];
    const [finished, setFinished] = useState(false);

    let TEMPWINES = [];
    
    let TESTDATA = [
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




    // const [ compareData, setCompareData ] = useState([
    //     {
    //         Category: 'Total',
    //     },
    //     {
    //         Category: 'NoseIntensity',
    //     },
    //     {
    //         Category: 'FlavorIntensity',
    //     },
    //     {
    //         Category: 'FlavorCharacteristics',
    //     },
    //     {
    //         Category: 'Balance',
    //     },
    //     {
    //         Category: 'Length',
    //     }
    // ]);

    // let dbpathref = '/users/' + user.uid + "/" + ReviewName + '/data'
    let dbpathref = '/users/' + user.uid + "/" + ReviewName + '/data'

    useEffect(() => {
        const fetchData = async (ReviewName) => {
            dbpathref = '/users/' + user.uid + "/" + ReviewName + '/data'
            // console.log(`path: ${dbpathref}, ReviewName: ${ReviewName}`)
            var revData = await GetChartData(dbpathref);
            const chartMath = {NoseIntensity: 5,FlavorIntensity: 10,FlavorCharacteristics: 25,Balance: 5,Length: 5,Total: 100};

            const final = Object.entries(revData).map(([key,value]) => {
                if (Object.keys(chartMath).includes(key)) {

                    let percentValue = (Number(value) / chartMath[key])

                    if (key === 'Total') {
                        percentValue = (Number(value) - 50 ) / 50
                    }

                    let tempObject = {
                        // 'Category': key,
                        [revData.WineName] : percentValue
                    };

                    let index = TESTDATA.findIndex(d => d.Category === key);
                    if (index !== -1) {TESTDATA[index][revData.WineName] = percentValue};
                    // if (index !== -1) {TESTDATA[index][revData.WineName] = (Number(percentValue))};

                    return tempObject
                } else {
                    return undefined
                };
            }).filter(notUndefined => notUndefined !== undefined);

            // console.log(final);
            // console.log(data);
            // console.log(data[1]['LSKJF1']);
            // console.log((data[1]['LSKJF1']) - .2);

            // if (revname.includes())setRevName((revname) => [...revname,revData.WineName]);

            // if (!(revname.includes(revData.WineName))) {
            //     // let currentWine = revData.WineName;
            //     // setRevName((revname) => [...revname,currentWine]);
                
            //     // setRevName((revname) => [...revname,revData.WineName]);
            //     console.log(`${revData.WineName} is NOT already in revname.`);
            // } else {
            //     console.log(`${revData.WineName} is already in revname.`);
            // };

            
            TEMPWINES.push(revData.WineName);
            console.log(TEMPWINES);
            // revname.push(revData.WineName);

            // console.log(TEMPWINES);


            // console.log(revname);

            // revname.push(revData.WineName);
            // setRevName(revname => [...revname, revData.WineName]);
            // revname = revData.WineName
            // setRevName([...revname,revData.WineName]);
            // setRevName('LSKJF1');
            // revname = 'LSKJF1';
            // console.log(revname);

            setRevName(revData.WineName);


            // function mergeArrayObjects(final,TESTDATA){
            //     return final.map((item,i)=>{
            //         if(item.Category === TESTDATA[i].Category){
            //             //merging two objects
            //             return Object.assign({},item,TESTDATA[i])
            //         }
            //     })
            // }
            // console.log(mergeArrayObjects(final,TESTDATA));

            // function mergeArrayObjects(arr1,arr2){
            //     let start = 0;
            //     let merge = [];
              
            //     while(start < arr1.length){
            //         if(arr1[start].Category === arr2[start].Category){
            //             //pushing the merged objects into array
            //             merge.push({...arr1[start],...arr2[start]})
            //         }
            //         //incrementing start value
            //         start = start+1
            //     }
            //     console.log(merge);
            //     return merge;
            // }
            // mergeArrayObjects(TESTDATA, final);


            // final.forEach(item => { 
            //     let index = TESTDATA.findIndex(d => d.Category === item.Category);
            //     // if (index !== -1) TESTDATA[index] = item;
            //     // if (index !== -1) TESTDATA[index] += item;
            //     let TEST9 = []
            //     Object.assign(TEST9,TESTDATA,final);
            //     console.log(TEST9);
            // })

            // TESTDATA = [...final, ...TESTDATA];
            // console.log(TESTDATA);

            // setRevName(revData.WineName);

            // setData(data.concat(final));

            // TESTDATA = TESTDATA.concat(final);
            // console.log(TESTDATA);
            // setData(final);

            // console.log(compareData);
        }
        if (Array.isArray(ReviewName)) {
            ReviewName.forEach(fetchData);
            // setData([TESTDATA]);
            setData(TESTDATA);
            // console.log(revname);
            // console.log(TEMPWINES);
            // setRevName(TEMPWINES);
            setRevName(...TEMPWINES);
            // const setList = (TEMPWINES) => setRevName(TEMPWINES);
            setFinished(true);
        } else {
            fetchData(ReviewName);
            setData(TESTDATA);
            // setRevName(TEMPWINES);
            setFinished(true);
        };

        // fetchData()
        // final();
        // setRevName(revData.WineName);
        // setData(final);
        // setData(TESTDATA);

        // console.log(compareData);
        // setData(TESTDATA);
        // console.log(data);

        // setFinished(true);

    // }, [dbpathref])
    }, [ReviewName])

    // console.log(`data array length: ${data.length}`)

    // return data ? 
    return finished ? 
        (
            // <div style={{height: '500px', display: 'flex', alignItems: 'center', alignSelf: 'center', alignContent: 'center', margin: 'auto' }}>
            // <div style={{height: '500px', display: 'flex', alignItems: 'center', alignSelf: 'center', alignContent: 'center'}}>
            <div style={{height: '320px', paddingBottom: '10px'}}>
                {console.log(data)}
                <MyResponsiveRadar data={data} revname={revname} />
                {/* <MyResponsiveRadar data={data} revname={TEMPWINES} /> */}
                {console.log(revname)}

                {/* {console.log(data)} */}
                {/* <MyResponsiveRadar data={TEST6} />  */}
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
