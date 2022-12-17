chrome.runtime.sendMessage({ type: 'getData' }, function (response) {
  console.log(response.data);
  // modify the active tab using the data from the API
});
