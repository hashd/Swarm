Swarm.Client = function () {
  var self = this;
  self.navBar = $('.nav-bar');
  self.header = $('.header');
  self.content = $('#content');

  self.feedsService = new Swarm.Feeds();
  self.messagesService = new Swarm.Messages();
  self.analyticsService = new Swarm.Analytics();
  self.activityFeedService = new Swarm.ActivityFeed();
  self.searchService = new Swarm.Search();
  self.postMessageService = new Swarm.PostMessage();
  self.notificationsService = new Swarm.Notifications();

  self.init();
};

Swarm.Client.prototype = {
  init: function () {
    var self = this;
    self.bindUserEvents();
    self.invokeCustomization();

    self.getCurrentUserMugshot();
    self.getCurrentUserNetworks();

    self.navBar.find("i").first().trigger("click", [true]);
  },

  bindUserEvents: function () {
    var self = this;
    self.bindTabSelectEvent();
    self.bindSearchEvent();
  },

  bindTabSelectEvent: function () {
    var self = this;
    self.navBar.find('i').click(function(event, isFirst){
      var target = $(this),
        jsVal = target.data("jsval"),
        jsValCap = jsVal.replace(/^[a-z]/, function(m){ return m.toUpperCase() });
        self.makeActiveTab(jsValCap);

        if (!isFirst) {
          chrome.storage.local.set({'newImagePath': '/img/yammerlogo_notifier.png'});
          // create alarm for polling new messages every 1 minutes
          chrome.alarms.create('checkNewTasks', {
            when: 1000,
            periodInMinutes: 1
          });
        }
        chrome.browserAction.setIcon({ path: "/img/yammerlogo.png" });
        target.parent().siblings().find('i').removeClass('active');
        target.addClass('active');
    });
  },

  bindSearchEvent: function () {
    var self = this;
    self.header.on('change', 'input#search', function () {
      var target = $(this);
      self.searchService.init(target.val());
    });
  },

  makeActiveTab: function (jsVal){
    var self = this,
      pageTitle = self.header.find('.page-title');

    switch (jsVal){
      case "Feeds":
        pageTitle.html('Network Feed');
        self.feedsService.init();
        break;
      case "Messages":
        pageTitle.html('Messages');
        self.messagesService.init();
        break;
      case "Analytics":
        pageTitle.html('Analytics');
        self.analyticsService.init();
        break;
      case "Postmessage":
        pageTitle.html('Post Message');
        self.postMessageService.init();
        break;
      case "Activityfeed":
        pageTitle.html('Recent Activity');
        self.activityFeedService.init();
        break;
      case "Notifications":
        pageTitle.html('Notifications');
        self.notificationsService.init();
        break;
      default:
        console.log('Unregistered service: ' + jsVal);
        break;
    }
  },

  invokeCustomization: function () {
    var self = this;
    self.content.enscroll({
      showOnHover: true,
      verticalTrackClass: 'track3',
      verticalHandleClass: 'handle3'
    });
  },

  getCurrentUserMugshot: function () {
    var self = this;
    new Swarm.Profile().getCurrentUserProfileInformation(function (data) {
    $('.header .current-mugshot').html($('<img />').attr('src', data.mugshot_url_template.replace("{width}x{height}","100x100"))
      .on('click', function () {
        new Swarm.Profile().getCurrentUserProfileInformation();
      }));
    });
  },

  getCurrentUserNetworks: function () {
    var self = this;
    new Swarm.Network().getCurrentNetworkInformation(function (data) {
      var select = self.header.find('.right-pane').html($('<div class="mui-dropdown" />')).find('.mui-dropdown');
      select.append($('<button class="mui-btn mui-btn-default mui-btn-flat" data-mui-toggle="dropdown" />').append($('<span class="mui-caret" />')));
      select.append($('<ul class="mui-dropdown-menu mui-dropdown-menu-right" />'));
      for (var i = 0, length = data.length; i < length; i++) {
        select.find('.mui-dropdown-menu').append($('<li />').append($('<a />').attr('href', '#').data('networkId', data[i].id).html(data[i].name)));
        if (data[i].is_primary === true) {
          select.find('.mui-btn').remove();
          select.prepend($('<button class="mui-btn mui-btn-default mui-btn-flat" data-mui-toggle="dropdown" />').html(data[i].name).append($('<span class="mui-caret" />')));
        }
      }
    });
  }
};
