
let exportFolder = '/home/nico/Documents/prog/chrome_extensions/LBC_price_extractor/prices_exports';

chrome.runtime.onInstalled.addListener(() => {
  console.log("LBC price extractor extension installed!");
  chrome.storage.sync.set({ exportFolder });
  console.log('Default export folder set to ' + exportFolder);
});
