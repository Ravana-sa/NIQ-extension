function getCurrentPageUrlWithCallBack(callback) {
  chrome.runtime.sendMessage({ action: "getTabUrl" }, function (response) {
    var url = response.url
    callback(url)
  })
}

async function getCurrentPageUrl(): Promise<string> {
  return new Promise((res) => {
    getCurrentPageUrlWithCallBack(function (url) {
      res(url)
    })
  })
}

export default getCurrentPageUrl
