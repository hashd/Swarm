Swarm.Messages = function (){
  var self = this;
};

Swarm.Messages.prototype = {
  init: function(){
  	var self = this;
  	self.getReceivedMessages();
    self.attachWindowScrollEvent();
  },

  getReceivedMessages: function(){
      var self = this;
      $("#content").empty();
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
            chrome.storage.local.set({'lastMsgId': data.messages[0].id});
          	Swarm.utils.buildFeedInfo(data);
    			//console.log(data);
    		},
    		error : function(){
    			alert("error");
    		}
  	  });
  },

  attachWindowScrollEvent: function(){
    var self = this;
    $(window).off('scroll').on('scroll', function(e){
        if($('body').height() != ($(window).height() + window.pageYOffset)){
          return false;
        }

        var lastMsgId = $('div.msg_main:last').attr('data-msg-id');

        jQuery.ajax({
            type :"GET",
            url : "https://www.yammer.com/api/v1/messages/received.json?access_token="+yammer.getAccessToken(),
            data:{
              "limit":7,
              "older_than": lastMsgId
            },
            dataType: 'json',
            xhrFields: {
              withCredentials: false
            },
            success : function(data){
                Swarm.utils.buildFeedInfo(data);

            },
            error : function(){
              alert("error");
            }
        });
    });
  }

}
