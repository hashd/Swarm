chrome.alarms.onAlarm.addListener(function() {

  chrome.storage.local.get(function(result) {
    var lastMsgId = result.lastMsgId;
    var accessToken = result.newAccessToken;
    if (lastMsgId != null && accessToken != null) {
      jQuery.ajax({
        type: "GET",
        url: 'https://www.yammer.com/api/v1/messages/received.json?newer_than=' + lastMsgId + '&access_token=' + accessToken,
        data: {
          "limit": 5
        },
        dataType: 'json',
        xhrFields: {
          withCredentials: false
        },
        success: function(data) {
          if (data && data.messages && data.messages.length != 0) {
            var badgeText = data.messages.length.toString();;
            chrome.browserAction.setBadgeText({
              text: badgeText
            });
          }
        },
        error: function() {

        }
      });
    }
  });

});
