// background.js

// Function to get the current tab URL
function getCurrentTabUrl(callback) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var tab = tabs[0]
    var url = tab.url
    callback(url)
  })
}

// Listen for messages from the content script
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === "getTabUrl") {
    getCurrentTabUrl(function (url) {
      // Send the URL back to the content script
      sendResponse({ url: url })
    })
    return true // To indicate that we'll send a response asynchronously
  }
})
