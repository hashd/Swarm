Swarm.Client = function () {
  var self = this;
  self.leftPane = $('.left-pane');
  self.navBar = $('.nav-bar');
  self.appBar = $('.app-bar');
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
    self.initBackgroundTasks();
    self.bindUserEvents();
    self.invokeCustomization();

    self.getCurrentUserMugshot();
    self.getCurrentUserNetworks();

    self.navBar.find("i").first().trigger("click", [true]);
  },

  initBackgroundTasks: function () {
    //chrome.storage.local.set({'newImagePath': '/img/yammerlogo_notifier.png'});
    // create alarm for polling new messages every 1 minutes
    chrome.alarms.create('checkNewTasks', {
        when: 1000,
        periodInMinutes: 1
    });
    chrome.browserAction.setBadgeText({text: ""});
  },

  bindUserEvents: function () {
    var self = this;
    self.bindTabSelectEvent();
    self.bindSearchEvent();
    self.bindPostMessageEvent();
  },

  bindBackButtonEvent : function() {
    
    var self = this,
    container = $('#content'),
    mugshotContainer = $('.header .current-mugshot');
    mugshotContainer.find('i').on('click', function () {
      Swarm.api.popCurrentView();
      var previousView = Swarm.api.getCurrentView();
      var threadId,query,groupId;
      if(previousView.indexOf('thread') != -1) {
        threadId = previousView.slice(7);
        previousView = 'thread';
      }
      else if(previousView.indexOf('search') != -1) {
        query = previousView.slice(7);
        previousView = 'search'; 
      }
      else if(previousView.indexOf('groups:') != -1) {
       groupId = previousView.slice(7);
       previousView = 'groups';  
      }
      switch (previousView){
        case "feeds" :
          self.makeActiveTab('Feeds', 'Feeds');
          break;
        case "messages" :  
          self.makeActiveTab('Messages', 'Messages');
          break;
        case "analytics":
          self.makeActiveTab('Analytics', 'Analytics');
          break;
        case "Postmessage":
          self.postMessageService.init();
          break;
        case "activityfeed":
          self.makeActiveTab('Activityfeed', 'Recent Activity');
          break;
        case "notifications":
          self.makeActiveTab('Notifications', 'Notifications');
          break;
        case "groups":
          if(typeof groupId === 'undefined') {
            self.makeActiveTab('Groups', 'Groups');
          }
          else {
            Swarm.api.getGroupThreads(groupId, function (data) {
            container.empty().parent().find('.slimScrollBar').css('top',0);
            $('.header').find('.page-title').html(data.meta.feed_name);
            Swarm.utils.buildFeedInfo(true, data);
            });
          }
          
          break;
        case "people":
          self.makeActiveTab('People', 'People');
          break;
        case "thread":
          Swarm.api.getThread(threadId, function (data) {
            $('.header .left-pane').text(Swarm.api.currentViewStack[0]);
            container.empty();
            container.slimScroll().off('slimscroll');
            container.slimScroll().removeData('events');
            Swarm.utils.hideLoadingIcon();
            data.messages.reverse();
            Swarm.utils.buildFeedInfo(true, data);
            $('div.msg_main').slice(1).css({'width': '300px','float': 'right',
                                          'border-left': '3px solid #71a6f6'})
              .find('.msg_meta').remove();
            });
            break;
        case "search":
          self.getCurrentUserMugshot();
          self.content.html(Swarm.templates.network_feed());
          var pageTitle = self.header.find('.page-title').html('Search');
          pageTitle.html('<div class="mui-form-group"><input type="text" id="search" value="'+query+'" class="mui-form-control mui-empty mui-dirty" /><label><i class="material-icons">search</i>Search</label></div>');
          pageTitle.find('input').focus();
          self.searchService.init(query);
        }
      
    });
    
  },

  bindTabSelectEvent: function () {
    var self = this;
    self.leftPane.find('i').click(function(){
      var target = $(this),
        jsVal = target.data("jsval"),
        title = target.attr('title'),
        jsValCap = jsVal.replace(/^[a-z]/, function(m){ return m.toUpperCase() });

      self.leftPane.find('i').removeClass('active');
      target.addClass('active');
      self.makeActiveTab(jsValCap, title);
    });
  },

  bindSearchEvent: function () {
    var self = this;
    self.header.on('change', 'input#search', function () {
      self.searchService.init($(this).val());
    });
  },

  bindPostMessageEvent: function () {
    var self = this;
    self.content.on('click', '.post-btn', function (event) {
      self.postMessageService.init();
    });
  },

  scrollToTop: function () {
    var self = this;
    self.content.parent().find('.slimScrollBar').css('top',0);
  },

  makeActiveTab: function (jsVal, title){
    var self = this,
      pageTitle = self.header.find('.page-title').html(title);

    // Update slimscrollbar position for content change
    self.content.slimScroll().unbind('slimscroll');
    self.scrollToTop();

    switch (jsVal){
      case "Feeds":
        self.content.html(Swarm.templates.network_feed());
        self.getCurrentUserMugshot();
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
        pageTitle.html('<div class="mui-form-group"><input type="text" id="search" class="mui-form-control mui-empty mui-dirty" /><label><i class="material-icons">search</i>Search</label></div>');
        pageTitle.find('input').focus();
        break;
      case "Settings":
        self.content.html(Swarm.templates.settings());
        break;
      case "About":
        self.content.html(Swarm.templates.about());
        break;
      default:
        console.log('Unregistered service: ' + jsVal);
        break;
    }
  },

  invokeCustomization: function () {
    var self = this;
    self.content.slimScroll({ height: '480px', width: '330px'})
      .bind('slimscroll', function (e, pos) {
        console.log('At position ' + pos);
      });
  },

  getCurrentUserMugshot: function () {
    var self = this,
      mugshotContainer = $('.header .current-mugshot'),
      content = $('#content');
      
    if(mugshotContainer.find('img').length == 0) {
      Swarm.api.getCurrentUserProfile(function (data) {
        mugshotContainer.empty();
        mugshotContainer.html($('<img />').attr('src', data.mugshot_url));
        Swarm.api.setCurrentUserId(data.id);
        mugshotContainer.find('img').on('click', function () {
        Swarm.utils.showProfile(data);
        });
      });
    }
  },

  getCurrentUserNetworks: function () {
    var self = this;
    Swarm.api.getUserNetworks(function (data) {
      self.header.find('.right-pane').html(Swarm.templates.network_selection({ networks: data}));
    });
  }
};
