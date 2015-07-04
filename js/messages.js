function Messages(){
  var self = this;
};
Messages.prototype = {
  init: function(){
  	var self = this;
  	chrome.alarms.create('checkNewTasks', {
          when: 1000,
          periodInMinutes: 1
    });
  	self.getReceivedMessages();
  },
  getReceivedMessages: function(){
      var self = this;
      jQuery.ajax({
  		type :"GET",
  		url : "https://www.yammer.com/api/v1/messages/received.json?access_token="+yammer.getAccessToken(),
      data:{
        "limit":7
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
  			alert("error");
  		}
  	});
  },
  
}
