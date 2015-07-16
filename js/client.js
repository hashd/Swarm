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
  self.groupsService = new Swarm.Groups();
  self.peopleService = new Swarm.People();

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
        title = target.attr('title'),
        jsValCap = jsVal.replace(/^[a-z]/, function(m){ return m.toUpperCase() });
        self.makeActiveTab(jsValCap, title);


        //chrome.storage.local.set({'newImagePath': '/img/yammerlogo_notifier.png'});
        // create alarm for polling new messages every 1 minutes
        chrome.alarms.create('checkNewTasks', {
            when: 1000,
            periodInMinutes: 1
        });

        chrome.browserAction.setBadgeText({text: ""});

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

  makeActiveTab: function (jsVal, title){
    var self = this,
      pageTitle = self.header.find('.page-title').html(title);

    // Update slimscrollbar position for content change
    self.content.slimScroll().removeData('events');
    self.content.parent().find('.slimScrollBar').css('top',0);

    switch (jsVal){
      case "Feeds":
        self.feedsService.init();
        break;
      case "Messages":
        self.messagesService.init();
        break;
      case "Analytics":
        self.analyticsService.init();
        break;
      case "Postmessage":
        self.postMessageService.init();
        break;
      case "Activityfeed":
        self.activityFeedService.init();
        break;
      case "Notifications":
        self.notificationsService.init();
        break;
      case "Groups":
        self.groupsService.init();
        break;
      case "People":
        self.peopleService.init();
        break;
      case "Search":
        pageTitle.html('<div class="mui-form-group"><input type="text" id="search" class="mui-form-control mui-empty mui-dirty" /><label>Search</label></div>');
        pageTitle.find('input').focus();
        break;
      default:
        console.log('Unregistered service: ' + jsVal);
        break;
    }
  },

  invokeCustomization: function () {
    var self = this;
    self.content.slimScroll({
      height: '480px',
      width: '330px'
    }).bind('slimscroll', function (e, pos) {
      console.log('At position ' + pos);
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
