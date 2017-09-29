console.log("executed content.js");

chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    if (msg.text === 'assist_learning') {
        var s = document.createElement('script');
        s.src = msg.data;
        (document.head || document.documentElement).appendChild(s);
        s.onload = function () {
            s.parentNode.removeChild(s);
            console.log("it was loaded...")
            var script = document.createElement('script');
            script.src = chrome.extension.getURL('injected.js');
            (document.head || document.documentElement).appendChild(script);
            script.onload = function () {
                script.parentNode.removeChild(script);
            };
            sendResponse();
        };
    }
    else if (msg.text == "getQ") {
        var data = localStorage.getItem("assistedLearning");
        if (!data) console.log("no data returned from local storage");
        sendResponse(data);
    }
    return true;
});