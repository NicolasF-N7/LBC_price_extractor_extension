// This file will be executed as a content script inside the current page

let extractTitle = function() {
  let titleElemList;
  let titleList = [];
  let titleElementsSelector = "#mainContent > div > div > div > div > div > div > a > div > div > div:nth-child(1) > div >p";
  //Try getting prices elem on the page
  try{
    //Extract prices elements from page content
    titleElemList = document.querySelectorAll(titleElementsSelector);
  }
  catch(err){
    console.err("Title elements not found. Maybe you are not on LeBonCoin. Call the customer support to help solve this (Nico). Lol");
  }

  //Try cleaning prices in text format from prices elem (span)
  try{
    //Extract prices from prices elements
    titleElemList.forEach((elem, i) => {
      let rawText = elem.innerText;
      let title = rawText.replace(/[,]/g, '');// Clean the price text from currency signs, and thousands (,) signs
      titleList.push(title);
    });
    console.log("Title list extracted successfully.");
  }catch(err){
    console.err("Title elements text extraction from element failed.");
  }
  return titleList;
}
let extractPrices = function() {
  let pricesElemList;
  let pricesList = [];
  let pricesElementsSelector = "#mainContent > div > div > div > div > div > div > a > div > div > div:nth-child(1) > p > span > span";
  //Try getting prices elem on the page
  try{
    //Extract prices elements from page content
    pricesElemList = document.querySelectorAll(pricesElementsSelector);
  }
  catch(err){
    console.err("Prices elements not found. Maybe you are not on LeBonCoin. Call the customer support to help solve this (Nico). Lol");
  }

  //Try cleaning prices in text format from prices elem (span)
  try{
    //Extract prices from prices elements
    pricesElemList.forEach((elem, i) => {
      let rawText = elem.innerText;
      let price = rawText.replace(/[^\d.-]/g, '');// Clean the price text from currency signs, and thousands (,) signs
      pricesList.push(price);
    });
    console.log("Pices list extracted successfully.");
  }catch(err){
    console.err("Prices elements text extraction from element failed.");
  }
  return pricesList;
}
let extractYear = function () {
  let yearsElemList;
  let yearsList = [];
  //Try getting prices elem on the page
  try{
    let yearElementsSelector = "#mainContent > div > div > div > div > div > div > a > div > div > div:nth-child(1) > div > div > div:nth-child(1) >p:nth-child(2)";
    //Extract prices elements from page content
    yearsElemList = document.querySelectorAll(yearElementsSelector);
  }
  catch(err){
    console.err("Manufacturing year elements not found. Maybe you are not on LeBonCoin. Call the customer support to help solve this (Nico). Lol");
  }
  //Try cleaning prices in text format from prices elem (span)
  try{
    //Extract prices from prices elements
    yearsElemList.forEach((elem, i) => {
      let rawText = elem.innerText;
      let year = rawText.replace(/[^\d.-]/g, '');// Clean the price text from currency signs, and thousands (,) signs
      yearsList.push(year);
    });
    console.log("Manufacturing year list extracted.");
  }catch(err){
    console.err("Manufacturing year text extraction from element failed.");
  }
  return yearsList;
}
let extractMileage = function () {
  let mileageElemList;
  let mileageList = [];
  //Try getting prices elem on the page
  try{
    let mileageElementsSelector = "#mainContent > div > div > div > div > div > div > a > div > div > div:nth-child(1) > div > div > div:nth-child(2) >p:nth-child(2)";
    //Extract prices elements from page content
    mileageElemList = document.querySelectorAll(mileageElementsSelector);
  }
  catch(err){
    console.err("Mileage elements not found. Maybe you are not on LeBonCoin. Call the customer support to help solve this (Nico). Lol");
  }
  //Try cleaning prices in text format from prices elem (span)
  try{
    //Extract prices from prices elements
    mileageElemList.forEach((elem, i) => {
      let rawText = elem.innerText;
      let mileage = rawText.replace(/[^\d.-]/g, '');// Clean the price text from currency signs, and thousands (,) signs
      mileageList.push(mileage);
    });
    console.log("Mileage list extracted.");
  }catch(err){
    console.err("Mileage text extraction from element failed.");
  }
  return mileageList;
}

console.log("Start extracting data");
let titleList = extractTitle();
let pricesList = extractPrices();
let yearsList = extractYear();
let mileageList = extractMileage();

console.log(pricesList.length + " elements found on this page.");

//Aggregate all data into one unique object
//This array contains every line of the csv file
let csvLinesArray = [titleList, pricesList, yearsList, mileageList].reduce((accumulator, currValue) => accumulator.map((value, i) => value + ', ' + currValue[i]));


let csvFormattedData = "Title,Price,Year,Mileage\n";//Add columns title
csvFormattedData += csvLinesArray.join('\n');

//Send message to background script with data
let request = {csvFormattedData: csvFormattedData};
chrome.runtime.sendMessage(request, function(response) {});
/*
//Click on next page btn
let nextPageSelector = "#mainContent > div > div > div > div > nav > ul > li:nth-last-child(1) > a";
let nextPageLinkElem = document.querySelector(nextPageSelector);
nextPageLinkElem.click();*/
