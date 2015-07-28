Swarm.Search = function (){
  var self = this;
};

Swarm.Search.prototype = {
  init: function(query){
  	var self = this;
    if(query.length > 0){
      Swarm.api.initCurrentView();
      Swarm.api.pushCurrentView('search:'+query);
      container = $("#content"),
      container.empty();
      self.getSearchQueryResults(query);
    }else{
      var feeds = new Swarm.Feeds();
      feeds.init();
    }
  },
  getSearchQueryResults : function(query){
  	var self = this,
    container = $("#content");
    Swarm.utils.showLoadingIcon();
  	jQuery.ajax({
  		type :"GET",
  		url : "https://www.yammer.com/api/v1/search.json?access_token="+yammer.getAccessToken(),
      data:{
        "search":query,
        "page":1,
        "num_per_page":5
      },
  		dataType: 'json',
  		xhrFields: {
  			withCredentials: false
  		},
  		success : function(data){
        Swarm.utils.hideLoadingIcon();
        container.html(Swarm.templates.search());
        Swarm.utils.buildFeedInfo(false, data.messages,$("#search_messages"));
        self.buildUserList(data.users, $("#search_users"));
        container.slimScroll().off('slimscroll');
        container.slimScroll().removeData('events');

  		},
  		error : function(){
        Swarm.utils.hideLoadingIcon();
  			alert("error");
  		}
  	});
  },
  buildUserList : function(data,feedContainer) {

    var container = $("#content");
    var feed = Swarm.templates.users_list({user:data});
    container.find(feedContainer).append(feed);
    container.off("click", "a.senderLinkAnc").on("click", "a.senderLinkAnc", function(){
        var target = $(this),
        userId = target.data("user-id"),
        profileObj = new Swarm.Profile();
        $(window).off("scroll");
        profileObj.init(userId);
        });

  },

}
