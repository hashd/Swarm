Swarm.Search = function (){
  var self = this;
};

Swarm.Search.prototype = {
  init: function(query){
  	var self = this;
    if(query.length > 0){
      container = $("#content"),
      container.empty();
      self.getSearchQueryResults(query);
    }else{
      var feeds = new Swarm.Feeds();
      feeds.init();
    }
  },
  getSearchQueryResults : function(query){
  	var self = this;
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
        Swarm.utils.buildFeedInfo(data.messages);
  		},
  		error : function(){
        Swarm.utils.hideLoadingIcon();
  			alert("error");
  		}
  	});
  }
}
