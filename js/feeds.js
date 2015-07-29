Swarm.Feeds = function (){
  var self = this;
};

Swarm.Feeds.prototype = {
  init: function(){
    var self = this;
    self.bindTabEvents();
    Swarm.api.initCurrentView();
    Swarm.api.pushCurrentView('feeds');
    //swarmInstance.getCurrentUserMugshot();
    $('#content .sw-network-feed-tabs a').first().trigger('click')
  },

  bindTabEvents: function () {
    var self = this;
    $('#content .sw-network-feed-tabs a').on('click', function () {
      var clkd = $(this),
        channel = clkd.html().toLowerCase();

      $("#content .network-feed").empty();
      $('#content').parent().find('.slimScrollBar').css('top',0);
      self.getFeeds(channel);
      self.attachWindowScrollEvent(channel);
    });
  },

  getFeeds: function (channel) {
    var self = this;
    channel = channel || 'all';

    Swarm.utils.showLoadingIcon('#network-feed-' + channel);
    Swarm.api.getThreadedMessagesFeed(channel, function (data) {
      Swarm.utils.hideLoadingIcon();
      Swarm.utils.buildFeedInfo(false, data, $("#network-feed-" + channel));
		});
  },

  attachWindowScrollEvent: function (channel) {
    var self = this,
      content = $("#content");
    channel = channel || 'all';

    content.slimScroll().unbind('slimscroll').bind('slimscroll', function (e, pos) {
      if (pos === 'bottom') {
        if($('body').height() != ($(window).height() + window.pageYOffset)) {
          return false;
        }

        var lastMsgId = $('.network-feed div.msg_main:last').attr('data-msg-id');
        Swarm.api.getThreadedMessagesFeed(channel, function (data) {
          Swarm.utils.buildFeedInfo(false, data, $("#network-feed-" + channel));
        }, { older_than: lastMsgId });
      }
    });
  }

}
