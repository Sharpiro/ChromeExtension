function createNewWindow() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (arrayOfTabs) {
        var activeTab = arrayOfTabs[0];
        chrome.tabs.sendMessage(activeTab.id, { text: 'report_back' }, doStuffWithDom);
    });
}

function doStuffWithDom(data) {
    console.log(data);
    chrome.windows.create({
        url: chrome.runtime.getURL("popup.html"),
        type: "popup",
        width: 300,
        height: 500,
        left: 800,
        top: 300
    });
}

// "browser_action": {
//     "default_icon": "icon.png",
//     "default_popup": "popup.html",
//     "default_title": "Click here!"
//   },

chrome.contextMenus.create({
    title: "Do Cool Things!!!!!",
    contexts: ["all"],
    onclick: createNewWindow,
});

// chrome.browserAction.onClicked.addListener(function (tab) {
//     chrome.tabs.sendMessage(tab.id, { text: 'report_back' }, doStuffWithDom);
// });