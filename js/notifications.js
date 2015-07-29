Swarm.Notifications = function (){
  var self = this;
};

Swarm.Notifications.prototype = {
  init: function(){
  	var self = this;
    Swarm.api.initCurrentView();
    Swarm.api.pushCurrentView('notifications');
    swarmInstance.getCurrentUserMugshot();
  	self.displayNotifications();
  },

  displayNotifications : function() {
  	var self = this;
  	$("#content").empty();
    Swarm.utils.showLoadingIcon();
  	jQuery.ajax({
    		type :"GET",
    		url : "https://www.yammer.com/api/v1/streams/notifications.json?access_token="+yammer.getAccessToken(),
        	data:{
          		"limit":20
        	},
    		dataType: 'json',
    		xhrFields: {
    			withCredentials: false
    		},
    		success : function(data){
          Swarm.utils.hideLoadingIcon();
          		self.buildNotificationFeed(data);
    		},
    		error : function(){
          Swarm.utils.hideLoadingIcon();
    			alert("error");
    		}
  	  });
  },

  buildNotificationFeed : function(data) {
  	var self = this,
    container = $("#content");
  	var items = data.items;
  	var users = data.objects.user;
  	var references = data.references;
  	// do this only for the first set of messages
    if(container.find('div.feed_main').length == 0) {
       	container.append('<div class="feed_main"></div>');
    }
    
    $.each(items, function(ind, item){

    	var msg_body = item.message;
    	var firstIndex,lastIndex,userId,item_name, item_url,groupId,userName;
    	var msgArray = [];
    	$.each(msg_body.split(' '), function(ind, temp) {
    		lastIndex = temp.indexOf(']');
    		if((firstIndex=temp.indexOf('user:')) != -1) {
    			userId = temp.substring(firstIndex+5, lastIndex);
    			var referencesArrObj = $.grep(references, function(e){ return e.id == userId; });
       			userArrObj = $.grep(users, function(e){ return e.id == userId; }),
        		item_name = (referencesArrObj.length > 0) ? referencesArrObj[0].full_name : userArrObj[0].full_name;
        		item_url = (referencesArrObj.length > 0) ? referencesArrObj[0].mugshot_url : userArrObj[0].full_name;
        		userName = item_name;
    		}
    		else if ((firstIndex=temp.indexOf('group:')) != -1) {
    			groupId = temp.substring(firstIndex+6, lastIndex);
    			var referencesArrObj = $.grep(references, function(e){ return e.id == groupId; });
        		item_name = (referencesArrObj.length > 0) ? referencesArrObj[0].full_name : "";
    		}
    		else {
    			item_name = temp;
    		}
    		msgArray.push(item_name);
    	});
      if(typeof userName === 'undefined') {
        userId = item.objects[0].id;
        var userArrObj = $.grep(users, function(e){ return e.id == userId; }),
            item_name = (userArrObj.length > 0) ? userArrObj[0].full_name : "";
            item_url = (userArrObj.length > 0) ? userArrObj[0].mugshot_url : "";
            userName = item_name;
      }
      msg_body = msgArray.join(' ');
      item.userId = userId;
      item.userName = userName;
      item.createdDate = Swarm.utils.getCreatedDate(item.created_at);
      item.itemUrl = item_url;
      item.msg_body = msg_body;
     	
 	});
  
	container.find('div.feed_main').append(Swarm.templates.notifications({items:data.items}));
  container.slimScroll().off('slimscroll');
  container.slimScroll().removeData('events');
	container.off("click", ".feed_main a.senderLinkAnc").on("click", ".feed_main a.senderLinkAnc", function(){
    	var target = $(this),
    	userId = target.data("user-id"),
    	profileObj = new Swarm.Profile();
    	$(window).off("scroll");
    	profileObj.init(userId);
	 });

  },
 }
