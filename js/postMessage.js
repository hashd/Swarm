Swarm.PostMessage = function (){
  var self = this;
};

Swarm.PostMessage.prototype = {
  init: function(){
  	var self = this;
  	self.postMessageToGroup();
  },
  postMessageToGroup : function() {
  	var self = this;
  	self.getGroupList();
  },
  postMessage :function() {
  	var self = this,
    container = $('#content');
	$('.post_form').submit(function() {
		var groupId = $("select#slt_groups").val();
		var body_message = $("textarea#message_body").val();
    
    jQuery.ajax({
        type :"POST",
        beforeSend: function (request)
        {
          request.setRequestHeader("Authorization", "Bearer "+yammer.getAccessToken());
        },
        url : "https://www.yammer.com/api/v1/messages.json?access_token="+yammer.getAccessToken(),
        data:{
          "group_id":groupId,
          "body":body_message
        },
        dataType: 'json',
        xhrFields: {
          withCredentials: false
        },
        success : function(data){
          /*Swarm.api.getGroupThreads(groupId, function (data) {
                Swarm.api.pushCurrentView('groups:'+groupId);
                Swarm.api.displayBackButton();
                swarmInstance.bindBackButtonEvent();
                container.empty().parent().find('.slimScrollBar').css('top',0);
                $('.header').find('.page-title').html(data.meta.feed_name);
                Swarm.utils.hideLoadingIcon();
                Swarm.utils.buildFeedInfo(true, data);
              });*/
        },
        error : function(){
          alert("error");
        }
    });

	});
  },
  
  getGroupList : function(){
  	var self = this;
  	container = $("#content"),
  	jQuery.ajax({
  		type :"GET",
  		url : "https://www.yammer.com/api/v1/users/current.json?access_token="+yammer.getAccessToken()+"&include_group_memberships=true",
      	data:{
        	"limit":1
      	},
  		dataType: 'json',
  		xhrFields: {
  			withCredentials: false
  		},
  		success : function(data){
          
          container.empty().html(Swarm.templates.post_message({ user: data}));
          container.slimScroll().off('slimscroll');
          container.slimScroll().removeData('events');
          container.find('textarea[name="message_body"]').focus();
          self.postMessage();
  		},
  		error : function(){
  			alert("error");
  		}
  	});
  }
}
