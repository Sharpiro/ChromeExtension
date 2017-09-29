console.log("loaded popup .js");

// function sendMessageToContent() {
// }
// chrome.tabs.query({ active: true, currentWindow: true }, function (arrayOfTabs) {
//     var activeTab = arrayOfTabs[0];
//     console.log(activeTab);
//     chrome.tabs.sendMessage(activeTab.id, { text: 'report_back' }, doStuffWithDom);
// });


chrome.storage.sync.get('assistedLearning', function (items) {
    console.log(items.assistedLearning);
    document.write(items.assistedLearning);
    chrome.storage.sync.remove("assistedLearning");
});