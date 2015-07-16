var yammer = new OAuth2('yammer', {
  client_id: '4U9LMyxNql8uwVusWytHfw',
  client_secret: '3wGDnQpuz6Auu3ZHHXYxUMmD8W6NrxoCsXLLfaxdZg'
});

yammer.authorize(function() {
  var TASK_CREATE_URL = 'https://www.yammer.com/api/v1/users/current.json?access_token='+yammer.getAccessToken();
  // store the accessToken for background script
  chrome.storage.local.set({'newAccessToken':yammer.getAccessToken()});
});
