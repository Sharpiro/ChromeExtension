function createNewWindow() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (arrayOfTabs) {
        var activeTab = arrayOfTabs[0];
        chrome.tabs.sendMessage(activeTab.id, { text: 'getQ' }, updateExtensionStorage);
    });
}

function updateExtensionStorage(data) {
    if (!data) {
        console.log("no data returned from content page");
        return;
    }
    console.log(data);
    chrome.storage.sync.set({ 'assistedLearning': data }, function () {
        localStorage.removeItem("assistedLearning");
        chrome.windows.create({
            url: chrome.runtime.getURL("popup.html"),
            type: "popup",
            width: 300,
            height: 500,
            left: 800,
            top: 300
        });
    });
}

chrome.contextMenus.create({
    title: "Get Hints",
    contexts: ["all"],
    onclick: createNewWindow,
});

// chrome.webRequest.onBeforeRequest.addListener(function (details) {
//     if (details.url.includes("tcode.js")) {
//         console.log("replacing 'tcode.js'");
//         return { redirectUrl: chrome.extension.getURL("tcode-hax.js") };
//     }
// }, { urls: ["<all_urls>"] }, ["blocking"]);

chrome.webRequest.onCompleted.addListener(function (details) {
    if (details.url.includes("tdata")) {
        chrome.tabs.query({ active: true, currentWindow: true }, function (arrayOfTabs) {
            var activeTab = arrayOfTabs[0];
            chrome.tabs.sendMessage(activeTab.id, { text: 'assist_learning', data: details.url },
                function () {

                })
        });
        // var request = new XMLHttpRequest();
        // request.open("GET", details.url, false);
        // request.send();
        // var result = request.responseText;
        // console.log(details.fromCache);
        // console.log(result);
    }
}, { urls: ["<all_urls>"], types: ["script"] });