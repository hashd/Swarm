function Feeds(){
  var self = this;
};
Feeds.prototype = {
  init: function(){
    var self = this;
    self.getFeeds();
  },
  getFeeds: function(){
      var self = this;
      jQuery.ajax({
  		type :"GET",
  		url : "https://www.yammer.com/api/v1/messages.json?access_token="+yammer.getAccessToken(),
      data:{
        "limit":5
      },
  		dataType: 'json',
  		xhrFields: {
  			withCredentials: false
  		},
  		success : function(data){
        utils.buildFeedInfo(data);
  			//console.log(data);
  		},
  		error : function(){
  			alert("Error, Please login to Yammer");
  		}
  	});
  },
  
}
