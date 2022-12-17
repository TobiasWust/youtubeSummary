document.getElementById('getDataButton').addEventListener('click', function () {
  chrome.runtime.sendMessage({ type: 'getData' }, function (response) {
    document.getElementById('dataContainer').innerHTML = response.data;
  });
});

// Save the settings to local storage
function saveSettings(settings) {
  chrome.storage.local.set({ settings: settings }, function () {
    console.log('Settings saved');
  });
}

// Retrieve the settings from local storage
function getSettings(callback) {
  chrome.storage.local.get(['settings'], function (result) {
    callback(result.settings);
  });
}
