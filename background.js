
chrome.alarms.onAlarm.addListener(function () {
	
	chrome.storage.local.get(function(result){
		var lastMsgId = result.lastMsgId;
		var accessToken = result.newAccessToken;
        var lastNotifiedMsgId = result.lastNotifiedMsgId;
		if( lastMsgId != null && accessToken != null) {
		jQuery.ajax({
    		type :"GET",
    		url : 'https://www.yammer.com/api/v1/messages/received.json?newer_than='+lastMsgId+'&access_token='+accessToken,
        	data:{
          		"limit":5
        	},
    		dataType: 'json',
    		xhrFields: {
    			withCredentials: false
    		},
    		success : function(data) {
            	if(data.messages.length != 0) {
					// set the notifier icon
					/*chrome.browserAction.setIcon({
            				path: newMessageNotifierImgPath
        			});*/
                    var badgeText = data.messages.length.toString();
                    chrome.browserAction.setBadgeText({text: badgeText});

                    var lastMessage = data.messages[0],
                    references = data.references,
                    senderArrObj = $.grep(references, function (e) 
                                        { return e.type === 'user' && e.id == lastMessage.sender_id; });
                    if(lastNotifiedMsgId != lastMessage.id || lastNotifiedMsgId == undefined ) {
                        chrome.storage.local.set({'lastNotifiedMsgId': lastMessage.id});
                        var sender = (senderArrObj.length > 0) ? senderArrObj[0] : {};
                        if (Notification.permission !== "granted") {
                            Notification.requestPermission();
                        } else {
                            var notification = new Notification("Message from "+sender.full_name, { 
                                    body:lastMessage.body.plain,icon: "./img/yammerlogo.png" });
                            setTimeout(notification.close.bind(notification), 6000);
                        }
                    }
            	
                }
            	else {
            		//console.log("empty messages");
            	}
          	
    		},
    		error : function(){
    			//alert("background js error");
    		}
  	  });
	}
	});
	
});