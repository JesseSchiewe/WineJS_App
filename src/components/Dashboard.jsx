import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { getDatabase, ref, get } from 'firebase/database';
import { useAuth } from '../providers/AuthContext';


export default function WineJSDashboard() {
  const [wineScores, setWineScores] = useState([]);

  const db = getDatabase();
  const { currentUser } = useAuth();
  // const dbWineNames = '/users/' + currentUser.uid + "/"
  const dbWineNamesWI = '/users/' + currentUser.uid + "/"
  // const [ winearray, setWinearray ] = useState([]);
  const [ wineitems, setWineItems ] = useState([]);

  const wineSortCategories = [
    // "ActualPrice",
    // "Appellation",
    // "Balance",
    // "FlavorCharacteristics",
    // "FlavorIntensity",
    // "Length",
    // "NoseIntensity",
    // "Producer",
    // "ReviewDate",
    "Total",
    "Vintage",
    "WineName",
    // "WineValue"
  ];

  // function SetWineArray() {
  //   useEffect(() => {
  //     var returnArr = [];
  //       get(ref(db, dbWineNames)).then(function (snapshot) {  
  //         snapshot.forEach(function (childSnapshot) {
  //           returnArr.push({ label:childSnapshot.key, value:childSnapshot.key});
  //         });
  //       });
  //     setWinearray(returnArr);
  //     // console.log(returnArr);
  //   }, []);
  // }
  // SetWineArray();

  // useEffect(() => {
  //   const fetchWineArray = async () => {
  //     const returnArr = [];
  //     try {
  //       const snapshot = await get(ref(db, dbWineNames));
  //       snapshot.forEach((childSnapshot) => {
  //         returnArr.push({ label: childSnapshot.key, value: childSnapshot.key });
  //       });
  //       setWinearray(returnArr); // Update state with the fetched array
  //     } catch (error) {
  //       console.error("Error fetching wine array:", error);
  //     }
  //   };
  
  //   fetchWineArray();
  // }, [db, dbWineNames]); // Dependencies

  
  // function SetWineArrayItems() {
  //   useEffect(() => {
  //     var returnArrWineItems = []; 
  //     var itemList = "";
  //     get(ref(db, dbWineNamesWI)).then(function (snapshotWI) {
  //       snapshotWI.forEach(function (childSnapshotWI) {
  //         var wName = childSnapshotWI.key 
  //         itemList = ({ wine:wName })
  //         wineSortCategories.forEach(function getCategoryData(category) {
  //           var currentValue = childSnapshotWI.child("data").child(category).val();  
  //           itemList = ({ ...itemList,[category]:currentValue});
  //         });
  //         returnArrWineItems.push({ ...itemList });
  //       });
  //     });
  //     setWineItems(returnArrWineItems);
  //   }, []);
  // };
  // SetWineArrayItems();

  useEffect(() => {
    const fetchWineArrayItems = async () => {
      const returnArrWineItems = [];
      try {
        const snapshotWI = await get(ref(db, dbWineNamesWI));
        snapshotWI.forEach((childSnapshotWI) => {
          const wName = childSnapshotWI.key;
          let itemList = { wine: wName };
  
          wineSortCategories.forEach((category) => {
            const currentValue = childSnapshotWI.child("data").child(category).val();
            itemList = { ...itemList, [category]: currentValue };
          });
  
          returnArrWineItems.push(itemList);
        });
  
        setWineItems(returnArrWineItems); // Update state with the fetched items
      } catch (error) {
        console.error("Error fetching wine items:", error);
      }
    };  
    fetchWineArrayItems();
  }, []); // Dependencies
  // }, [db, dbWineNamesWI, wineSortCategories]); // Dependencies

  useEffect(() => {
    const fetchWineScores = async () => {
      // const mockData = [
      //   { name: 'Cabernet Sauvignon', vintage: 2018, score: 95 },
      //   { name: 'Pinot Noir', vintage: 2020, score: 92 },
      //   { name: 'Chardonnay', vintage: 2019, score: 90 },
      //   { name: 'Merlot', vintage: 2021, score: 88 },
      // ];
      const mockData = [
        { wine: 'Cabernet Sauvignon', vintage: "2018", score: "95" },
        { wine: 'Pinot Noir', vintage: "2020", score: "92" },
        { wine: 'Chardonnay', vintage: "2019", score: "90" },
        { wine: 'Merlot', vintage: "2021", score: "88" },
        { wine: 'Pinot Noir 2', vintage: "2029", score: "92" },
        { wine: 'Chardonnay 2', vintage: "2012", score: "90" },
        { wine: 'Merlot 2', vintage: "2022", score: "88" },
      ];
      setWineScores(mockData);
    };
    fetchWineScores();
  }, []);

  return (
    <Grid container spacing={3} style={{ padding: '20px' }}>
      {/* Header */}
      <Grid item xs={12}>
        <Typography variant="h4" align="center" gutterBottom>
          Wine Scores Dashboard
        </Typography>
      </Grid>
      
      {console.log("WINE ITEMS", wineitems)}
      {console.log("SpreadWineITEMS", ...wineitems)}
      {console.log("WINESCORES", wineScores)}
      {console.log("SpreadWineScores", ...wineScores)}

      {/* Summary Cards */}
      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Typography variant="h6">Total Wines</Typography>
            <Typography variant="h4">{wineitems.length}</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Typography variant="h6">Highest Score</Typography>
            <Typography variant="h4">
              {Math.max(...wineitems.map((wine) => wine.Total), 0)}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Typography variant="h6">Lowest Score</Typography>
            <Typography variant="h4">
              {Math.min(...wineitems.map((wine) => wine.Total), 0)}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* Wine Scores Table */}
      <Grid item xs={12}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Wine Name</TableCell>
                <TableCell>Vintage</TableCell>
                <TableCell>Score</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {wineitems.map((wine, index) => (
                <TableRow key={index}>
                  <TableCell>{wine.wine}</TableCell>
                  <TableCell>{wine.vintage}</TableCell>
                  <TableCell>{wine.Total}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
}