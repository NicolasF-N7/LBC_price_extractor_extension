//In this file, console.log doesn't work. To find out why...

// Initialize button with user's preferred color
let extractPricesBtn = document.getElementById("extractPricesBtn");


// When the button is clicked
extractPricesBtn.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  //Execute script inside the active tab, having access to all DOM content
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["extractData_script.js"],
  });
});

//Event listener to retrieve data from page's content
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    //If the message comes from extractData_script.js, let's process the data, and let the user download it
    if(request.csvFormattedData){
      let CSVFormattedTextData = request.csvFormattedData;//in text format

      //Create blob from raw csv data
      var blob = new Blob([CSVFormattedTextData], { type: 'text/csv;charset=utf-8;' });
      var blobURL = URL.createObjectURL(blob);

      chrome.downloads.download({
        url: blobURL,
        filename: 'file.csv',
        saveAs: true,
      }, function(dlItemId){
        console.log(dlItemId);
        chrome.downloads.show(dlItemId);
      });
    }
    
    return true;
  }
);
