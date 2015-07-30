Swarm.API = function (accessToken) {
  var self = this;
  self.networks = {};
  self.primaryAccessToken = accessToken;
  self.accessToken = accessToken;
  self.currentUserId = '';
  self.currentViewStack = [];
  self.init();

};

Swarm.API.prototype = {
  init: function () {
    var self = this;
    self.getUserNetworkAccessTokens();
  },

  ajaxCall: function (type, url, data, cb) {
    var self = this;
    jQuery.ajax({
      type: type,
      url: url,
      beforeSend: function (request) {
        request.setRequestHeader("Authorization", "Bearer " + self.getAccessToken());
      },
      data: $.extend({}, {}, data),
      dataType: 'json',
      xhrFields: {
        withCredentials: false
      },
      success: function(data){
        if (cb !== undefined) {
          cb(data);
        }
      },
      error: function(e) {
        console.log(e);
        alert("Unable to fetch data from Yammer network");
      }
    });
  },

  setAccessToken: function (accessToken) {
    this.accessToken = accessToken;
  },

  getAccessToken: function () {
    return this.accessToken;
  },

  setCurrentUserId: function (userId) {
    this.currentUserId = userId;
  },

  getCurrentUserId : function() {
    return this.currentUserId;
  },


  setNetworks: function (networks) {
    var self = this;
    networks.forEach(function (i, d) {
      self.networks[d.network_id] = d;
    });
  },

  setPrimaryNetwork: function (networkId) {
    var self = this;
    self.activeNetwork = self.networks[networkId];
  },

  switchNetwork: function (networkdId) {
    var self = this;
    self.activeNetwork = self.networks[networkId];
    self.setAccessToken(self.activeNetwork.token);
  },

  getCurrentView: function () {
    var self = this;
    return self.currentViewStack[self.currentViewStack.length - 1];
  },

  pushCurrentView: function (currentView) {
    var self =this;
    if(self.currentViewStack.indexOf(currentView) == -1) {
      self.currentViewStack.push(currentView);
    }
  },

  popCurrentView: function() {
    var self = this;
    self.currentViewStack.pop();
  },

  initCurrentView: function() {
    var self = this;
    self.currentViewStack.splice(0, self.currentViewStack.length);
  },

  displayBackButton : function() {
    var self = this,
    mugshotContainer = $('.header .current-mugshot'),
    content = $('#content');
    mugshotContainer.html('<i class="material-icons" style="font-size:1.5em;cursor:pointer;padding:6px 3px;">arrow_back</i>');
  },

  /** All Yammer API Calls below */
  getCurrentUserProfile: function (cb) {
    var self = this;
    self.ajaxCall('GET', 'https://www.yammer.com/api/v1/users/current.json', {}, cb);
  },

  getUserNetworks: function (cb) {
    var self = this;
    self.ajaxCall('GET', 'https://www.yammer.com/api/v1/networks/current.json', {}, cb);
  },

  getUserNetworkAccessTokens: function (cb) {
    var self = this,
      tempAccessToken = self.accessToken;

    self.setAccessToken(self.primaryAccessToken);
    self.ajaxCall('GET', 'https://www.yammer.com/api/v1/oauth/tokens.json', {}, function (data) {
      self.setNetworks(data);
      self.setAccessToken(tempAccessToken);
    });
  },

  getThreadedMessagesFeed: function (channel, cb, additionalOptions) {
    var self = this,
      threadedOptions = $.extend({ threaded: 'extended', limit: 20}, additionalOptions),
      url = 'https://www.yammer.com/api/v1/messages.json/my_feed.json';

    if (channel === 'all') {
      url = 'https://www.yammer.com/api/v1/messages.json';
    } else if (channel === 'top') {
      url = 'https://www.yammer.com/api/v1/messages/algo.json';
    } else if (channel === 'following') {
      url = 'https://www.yammer.com/api/v1/messages/following.json';
    } else {
      console.log('Unknown message channel: ' + channel);
    }

    self.ajaxCall('GET', url, threadedOptions, cb);
  },

  getThread: function (threadId, cb, additionalOptions) {
    var self = this,
      threadOptions = $.extend({limit:20}, additionalOptions),
      url = 'https://www.yammer.com/api/v1/messages/in_thread/' + threadId + '.json';

    self.ajaxCall('GET', url, threadOptions, cb);
  },

  getGroupThreads: function (groupId, cb, additionalOptions) {
    var self = this,
      threadOptions = $.extend({ threaded: 'extended', limit: 20}, additionalOptions),
      url = 'https://www.yammer.com/api/v1/messages/in_group/' + groupId;

    if (groupId === 'all') {
      url = "https://www.yammer.com/api/v1/messages/general.json";
    }

    self.ajaxCall('GET', url, threadOptions, cb);
  },

  getUserProfile: function (userId, cb, additionalOptions) {
    var self = this,
      profileOptions = $.extend({limit: 1}, additionalOptions),
      url = 'https://www.yammer.com/api/v1/users/' + userId;

    self.ajaxCall('GET', url, profileOptions, cb);
  },

  getSearchResults: function (query, cb, additionalOptions) {
    var self = this,
      searchOptions = $.extend({page:1, search:query}, additionalOptions),
      url = 'https://www.yammer.com/api/v1/search.json';

    self.ajaxCall('GET', url, searchOptions, cb);
  },

  getGroupsList: function (cb, additionalOptions) {
    var self = this,
      groupsListOptions = $.extend({limit: 1}, additionalOptions),
      url = "https://www.yammer.com/api/v1/users/current.json?include_group_memberships=true";

    self.ajaxCall('GET', url, groupsListOptions, cb);
  }
}
