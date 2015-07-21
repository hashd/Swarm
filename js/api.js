Swarm.API = function (accessToken) {
  var self = this;
  self.networks = {};
  self.primaryAccessToken = accessToken;
  self.accessToken = accessToken;
  self.currentUserId = '';
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
      threadedOptions = $.extend({ threaded: 'extended', limit: 10}, additionalOptions),
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
  }
}
