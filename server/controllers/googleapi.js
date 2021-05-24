const { GoogleSpreadsheet } = require('google-spreadsheet');
const path = require('path');
var appDir = path.dirname(require.main.filename);
const creds = require(`${appDir}/credentials.json`);
const fs = require("fs");
const readline = require("readline");

async function getSummary() {
    const doc = new GoogleSpreadsheet(process.env.spreadsheetID);
    // console.log(creds);
    await doc.useServiceAccountAuth(creds);
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[1];
    await sheet.loadCells('H2:J14');
    // const distanceLeftString = `${sheet.getCellByA1('H3').value}: ${sheet.getCellByA1('I3').value.toFixed(2)} miles / ${sheet.getCellByA1('J3').value.toFixed(2)} kilometers`;
    const distanceToDateString =  `*${sheet.getCellByA1('H4').value}*: ${sheet.getCellByA1('I4').value.toFixed(2)} miles / ${sheet.getCellByA1('J4').value.toFixed(2)} kilometers`;
    const remainingDistanceString = `*${sheet.getCellByA1('H5').value}*: ${sheet.getCellByA1('I5').value.toFixed(2)} miles / ${sheet.getCellByA1('J5').value.toFixed(2)} kilometers`;
    const numberOfWalkersString = `*${sheet.getCellByA1('H6').value}*: ${sheet.getCellByA1('I6').value} walkers`;
    const distancePerWalkerString = `*${sheet.getCellByA1('H8').value}*: ${sheet.getCellByA1('I8').value.toFixed(2)} miles / ${sheet.getCellByA1('J8').value.toFixed(2)} kilometers`;
    const targetDistancePerWalker = `*${sheet.getCellByA1('H7').value}*: ${sheet.getCellByA1('I7').value.toFixed(2)} miles / ${sheet.getCellByA1('J7').value.toFixed(2)} kilometers`;
    const totalDistanceCoveredInDayString = `*${sheet.getCellByA1('H10').value}*: ${sheet.getCellByA1('I10').value.toFixed(2)} miles / ${sheet.getCellByA1('J10').value.toFixed(2)} kilometers`;
    const requiredDistancePerDayString = `*${sheet.getCellByA1('H9').value}*: ${sheet.getCellByA1('I9').value.toFixed(2)} miles / ${sheet.getCellByA1('J9').value.toFixed(2)} kilometers`;
    const averageDistance7DaysString = `*${sheet.getCellByA1('H12').value}*: ${sheet.getCellByA1('I12').value.toFixed(2)} miles / ${sheet.getCellByA1('J12').value.toFixed(2)} kilometers`;
    const averageWalkers7DaysString = `*${sheet.getCellByA1('H13').value}*: ${sheet.getCellByA1('I13').value}`;
    const numberOfDaysLeft = `*${sheet.getCellByA1('H14').value}*: ${sheet.getCellByA1('I14').value}`;
    let summaryString = "Stats for Far: \n";
    summaryString += `${distanceToDateString} \n`;
    summaryString += `${remainingDistanceString} \n`;
    summaryString += `${numberOfWalkersString} \n`;
    summaryString += `${distancePerWalkerString} \n`;
    summaryString += `${targetDistancePerWalker} \n`;
    summaryString += `${totalDistanceCoveredInDayString} \n`;
    summaryString += `${requiredDistancePerDayString} \n`;
    summaryString += `${averageDistance7DaysString} \n`;
    summaryString += `${averageWalkers7DaysString} \n`;
    summaryString += `${numberOfDaysLeft} \n`;
    return `${summaryString}`;
}

module.exports.getSummary = getSummary;



