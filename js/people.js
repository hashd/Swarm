Swarm.People = function (){
  var self = this;
};

Swarm.People.prototype = {
  init: function () {
    Swarm.api.initCurrentView();
    Swarm.api.pushCurrentView('people');
    swarmInstance.getCurrentUserMugshot();
    this.bindPersonLiveEvent();
    this.bindIndexLiveEvent();
    this.bindSearchLiveEvent();
    this.displayPeopleFeed();
  },

  bindSearchLiveEvent: function () {
    var self = this,
      pageTitle = $('.header').find('.page-title'),
      content = $('#content');

    content.off('click', '.sw-search').on('click', '.sw-search', function () {
      pageTitle.html('<div class="mui-form-group"><input type="text" id="search-people" class="mui-form-control mui-empty mui-dirty" /><label><i class="material-icons">search</i>Search People</label></div>');
      pageTitle.find('input').focus();

      pageTitle.off('change', 'input#search-people').on('change', 'input#search-people', function () {
        self.displaySearchResults($(this).val());
      });
    });

  },

  displayPeopleFeed: function () {
    var self = this,
      container = $("#content").empty();

    container.append(Swarm.templates.people({}));
    container.find('.sw-people-alpha').first().trigger('click');
  },

  displayPeopleList: function (pageNumber, initialLetter, sortFactor) {
    var self = this,
      container = $("#content .sw-people-content");

    self.pageNumber = pageNumber || 1;
    self.initialLetter = initialLetter || 'A';

    jQuery.ajax({
      type :"GET",
      url : "https://www.yammer.com/api/v1/users.json?access_token="+yammer.getAccessToken(),
      data:{
        "page": self.pageNumber,
        "letter": self.initialLetter
      },
      dataType: 'json',
      xhrFields: {
        withCredentials: false
      },
      success : function(data){
        Swarm.utils.hideLoadingIcon();
        data.forEach(function (d, i) {
          d.mugshot_url_template = d.mugshot_url_template.replace("{width}x{height}","36x36");
        });
        container.append(Swarm.templates.persons({ 'users': data }));
      },
      error : function(){
        Swarm.utils.hideLoadingIcon();
        alert("Looks like something is wrong.");
      }
    });
  },

  displaySearchResults: function (query) {
    var self = this,
      container = $("#content .sw-people-content");

    $('#content').slimScroll().unbind('slimscroll');

    Swarm.utils.showLoadingIcon(container);
    Swarm.api.getSearchResults(query, function (data) {
      Swarm.utils.hideLoadingIcon();
      data.users.forEach(function (d, i) {
        d.mugshot_url_template = d.mugshot_url_template.replace("{width}x{height}","64x64");
      });
      container.append(Swarm.templates.persons({ 'users': data.users }));
    });
  },

  bindPersonLiveEvent: function () {
    var self = this,
      container = $("#content");

    container.off('click', '.sw-person').on('click', '.sw-person', function () {
      var clkd = $(this),
        userId = clkd.attr('data-user-id');

      jQuery.ajax({
        type: "GET",
        url: "https://www.yammer.com/api/v1/users/" + userId + ".json?access_token=" + yammer.getAccessToken(),
        data: {
          "limit": 1
        },
        dataType: 'json',
        xhrFields: {
          withCredentials: false
        },
        success: function(data){
          Swarm.api.pushCurrentView('profile');
          Swarm.api.displayBackButton();
          swarmInstance.bindBackButtonEvent();
          Swarm.utils.showProfile(data);
        },
        error: function(){
          alert("Looks like something is wrong.");
        }
      });
    });
  },

  bindIndexLiveEvent: function () {
    var self = this,
      container = $("#content");

    container.on('click', '.sw-people-alpha', function () {
      var clkd = $(this),
        alphabet = clkd.attr('value');

      $('.sw-people-alpha').removeClass('active');
      clkd.addClass('active');

      container.find('.sw-people-content').empty();
      Swarm.utils.showLoadingIcon("#content .sw-people-content");

      self.attachWindowScrollEvent();
      self.displayPeopleList(1, alphabet);
    });
  },

  attachWindowScrollEvent: function () {
    var self = this,
      content = $("#content");

    content.slimScroll().unbind('slimscroll').bind('slimscroll', function (e, pos) {
      if (pos === 'bottom') {
        if($('body').height() != ($(window).height() + window.pageYOffset)) {
          return false;
        }

        self.displayPeopleList(self.pageNumber + 1, self.initialLetter);
      }
    });
  }
};
