chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    if (msg.text === 'report_back') {
        var data = localStorage.getItem("data");

        chrome.storage.sync.set({ 'value': data }, function () {
            // Notify that we saved.
        });
        sendResponse(data);
    }
});

console.log("executed content.js");

var s = document.createElement('script');
s.src = chrome.extension.getURL('injected.js');
(document.head || document.documentElement).appendChild(s);
s.onload = function () {
    s.parentNode.removeChild(s);
};
