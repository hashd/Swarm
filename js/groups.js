Swarm.Groups = function (){
  var self = this;
};

Swarm.Groups.prototype = {
  init: function(){
    var self = this;
    Swarm.api.initCurrentView();
    Swarm.api.pushCurrentView('groups');
    swarmInstance.getCurrentUserMugshot();
    self.buildGroupMessageFeed();
  },

  buildGroupMessageFeed : function(){
    var self = this,
      container = $("#content");

    Swarm.utils.showLoadingIcon();
    Swarm.api.getGroupsList(function (data) {
      Swarm.utils.hideLoadingIcon();
      container.empty().html(Swarm.templates.groups({ groups: data}));
      self.bindDisplayGroupEvent();
    });
  },

  bindDisplayGroupEvent: function() {
    var self = this,
      container = $("#content");

    container.find('.sw-group-card').off('click').on('click', function() {
      var groupId = $(this).data('group-id'),
        groupName = $(this).text();

      Swarm.utils.showLoadingIcon();
      Swarm.api.getGroupThreads(groupId, function (data) {
        Swarm.api.pushCurrentView('groups:'+groupId);
        Swarm.api.displayBackButton();
        swarmInstance.bindBackButtonEvent();
        container.empty().parent().find('.slimScrollBar').css('top',0);
        $('.header').find('.page-title').html(groupName);

        Swarm.utils.hideLoadingIcon();
        Swarm.utils.buildFeedInfo(true, data);
      });
    });
  },
}
