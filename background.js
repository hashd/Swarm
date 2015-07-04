
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        chrome.browserAction.setIcon({
            path: request.newIconPath
        });
    });

chrome.alarms.onAlarm.addListener(function (){
	//console.log("alarm called");

});