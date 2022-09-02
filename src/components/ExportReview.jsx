export const ExportReview = (jsonData) => {
    const fileData = `${jsonData.Producer} ${jsonData.Appellation} ${jsonData.WineName} ${jsonData.Vintage}

${jsonData.TastingNotes}
${jsonData.Total} points.

NI:${jsonData.NoseIntensity} ${jsonData.NoseIntensityNotes}
FI:${jsonData.FlavorIntensity} ${jsonData.FlavorIntensityNotes}
FC:${jsonData.FlavorCharacteristics} ${jsonData.FlavorCharacteristicsNotes}
BAL:${jsonData.Balance} ${jsonData.BalanceNotes}
LEN:${jsonData.Length} ${jsonData.LengthNotes}`

    const blob = new Blob([fileData], {type: "text/plain"});
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    // link.download = 'winereviewexport.json';
    link.download = 'winereviewexport.txt';
    link.href = url;
    link.click();
};
