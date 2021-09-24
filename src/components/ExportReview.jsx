
// export const ExportReview = (jsonData) => {
//     const fileData = JSON.stringify(jsonData);
//     const blob = new Blob([fileData], {type: "text/plain"});
//     const url = URL.createObjectURL(blob);
//     const link = document.createElement('a');
//     link.download = 'filename.json';
//     link.href = url;
//     link.click();
// };


export const ExportReview = (jsonData) => {
    // const fileData = JSON.stringify(jsonData);

    // const buildExportFile = {
    // // const fileData = {
    //     WineName: `${jsonData.Producer} ${jsonData.Appellation} ${jsonData.WineName} ${jsonData.Vintage}`,
    //     // Total: jsonData.Total,
    //     // Notes: (("Nose Intensity = ") + jsonData.NoseIntensity + ("Flavor Intensity = ") + jsonData.FlavorIntensity + ("Notes: ") + jsonData.TastingNotes + jsonData.NoseIntensityNotes + jsonData.FlavorIntensityNotes )
    //     // Notes: (
    //     //     jsonData.TastingNotes + jsonData.Total + (" points") + (" Notes: ") + jsonData.NoseIntensityNotes + jsonData.FlavorIntensityNotes + jsonData.FlavorCharacteristicsNotes + jsonData.BalanceNotes + jsonData.LengthNotes + (" NI: ") + jsonData.NoseIntensity + (" FI: ") + jsonData.FlavorIntensity
    //     //     )
    //     // Notes: (
    //     //     `${jsonData.TastingNotes}  ${jsonData.Total} points.  NI:${jsonData.NoseIntensity} ${jsonData.NoseIntensityNotes}, FI:${jsonData.FlavorIntensity} ${jsonData.FlavorIntensityNotes}, FC:${jsonData.FlavorCharacteristics} ${jsonData.FlavorCharacteristicsNotes}, BAL:${jsonData.Balance} ${jsonData.BalanceNotes}, LEN:${jsonData.LengthNotes} ${jsonData.LengthNotes} `
    //     // )
    //     Notes: ([        
    //         `${jsonData.TastingNotes}`,
    //         `${jsonData.Total} points. \\n NI:${jsonData.NoseIntensity} ${jsonData.NoseIntensityNotes}, FI:${jsonData.FlavorIntensity} ${jsonData.FlavorIntensityNotes}, FC:${jsonData.FlavorCharacteristics} ${jsonData.FlavorCharacteristicsNotes}, BAL:${jsonData.Balance} ${jsonData.BalanceNotes}, LEN:${jsonData.LengthNotes} ${jsonData.LengthNotes}`
    //     ])
    // }

    const fileData = `${jsonData.Producer} ${jsonData.Appellation} ${jsonData.WineName} ${jsonData.Vintage}

${jsonData.TastingNotes}
${jsonData.Total} points.

NI:${jsonData.NoseIntensity} ${jsonData.NoseIntensityNotes}
FI:${jsonData.FlavorIntensity} ${jsonData.FlavorIntensityNotes}
FC:${jsonData.FlavorCharacteristics} ${jsonData.FlavorCharacteristicsNotes}
BAL:${jsonData.Balance} ${jsonData.BalanceNotes}
LEN:${jsonData.Length} ${jsonData.LengthNotes}`


    // const fileData = JSON.stringify(buildExportFile);
    // fileData = buildExportFile;


    const blob = new Blob([fileData], {type: "text/plain"});
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    // link.download = 'winereviewexport.json';
    link.download = 'winereviewexport.txt';
    link.href = url;
    link.click();
};
