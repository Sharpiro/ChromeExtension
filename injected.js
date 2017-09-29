console.log("Executed injected.js");
var q;
if (!q) {
    console.log("no data found called 'q' from injected page");
}
else {
    var hints = getHints(q);
    var jsonData = JSON.stringify(hints, null, 2);
    localStorage.setItem("assistedLearning", jsonData);
    console.log("added 'q' date to local storage");
}

function getHints(list) {
    var hints = {};
    var problemNumber = 1;
    for (var index = 0; index < list.length; index++) {
        if (list[index++].toLowerCase() != 'choice') break;
        hints['Q' + problemNumber++] = +list[++index];
        var numberToSkip = +list[++index];
        index += numberToSkip * 2;
    }
    return hints;
}