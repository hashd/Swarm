function Search(){
  var self = this;
};
Search.prototype = {
  init: function(query){
  	var self = this;
    if(query.length > 0){
      self.getSearchQueryResults(query);
    }else{
      var feeds = new Feeds();
      feeds.init();
    }
  },
  getSearchQueryResults : function(query){
  	var self = this;
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
        	utils.showSearchResults(data);
  		},
  		error : function(){
  			alert("error");
  		}
  	});
  }
}