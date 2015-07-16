Swarm.People = function (){
  var self = this;
};

Swarm.People.prototype = {
  init: function () {
    this.bindPersonLiveEvent();
    this.bindIndexLiveEvent();
    this.displayPeopleFeed();
  },

  displayPeopleFeed: function () {
    var self = this,
      container = $("#content").empty();

    container.append(Handlebars.templates.people({}));
    container.find('.sw-people-alpha').first().trigger('click');
  },

  displayPeopleList: function (pageNumber, initialLetter, sortFactor) {
    var self = this,
      container = $("#content .sw-people-content");

    jQuery.ajax({
      type :"GET",
      url : "https://www.yammer.com/api/v1/users.json?access_token="+yammer.getAccessToken(),
      data:{
        "page": pageNumber || 1,
        "letter": initialLetter || 'A'
      },
      dataType: 'json',
      xhrFields: {
        withCredentials: false
      },
      success : function(data){
        if (data.length !== 0) {
          Swarm.utils.hideLoadingIcon();
          data.forEach(function (d, i) {
            d.mugshot_url_template = d.mugshot_url_template.replace("{width}x{height}","64x64");
          });
          container.append(Handlebars.templates.persons({ 'users': data }));
          self.displayPeopleList(pageNumber + 1, initialLetter);
        }
      },
      error : function(){
        Swarm.utils.hideLoadingIcon();
        alert("Looks like something is wrong.");
      }
    });
  },

  bindPersonLiveEvent: function () {
    var self = this,
      container = $("#content");

    container.on('click', '.sw-person', function () {
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
      self.displayPeopleList(1, alphabet);
    });
  }
};
