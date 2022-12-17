chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.type === 'getData') {
    fetch('https://my-api.com/data')
      .then(response => response.json())
      .then(data => {
        sendResponse({ data: data });
      });
    return true; // required to use sendResponse asynchronously
  }
});

chrome.browserAction.onClicked.addListener(function (tab) {
  chrome.tabs.executeScript(tab.id, {
    file: 'content.js'
  });
});
