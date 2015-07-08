function Notifications(){
  var self = this;
};

Notifications.prototype = {
  init: function(){
  	var self = this;
  	self.displayNotifications();
  },

  displayNotifications : function() {
  	var self = this;
  	$("#content").empty();
  	jQuery.ajax({
    		type :"GET",
    		url : "https://www.yammer.com/api/v1/streams/notifications.json?access_token="+yammer.getAccessToken(),
        	data:{
          		"limit":7
        	},
    		dataType: 'json',
    		xhrFields: {
    			withCredentials: false
    		},
    		success : function(data){
          		self.buildNotificationFeed(data);
    		},
    		error : function(){
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
    var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    var str = [];
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
      var msgCreatedDate = item.created_at;
      msg_body = msgArray.join(' ');
      var todayDate = new Date();
      var msgDate = new Date(msgCreatedDate);
      if(todayDate.getDate() == msgDate.getDate() &&
          todayDate.getMonth() == msgDate.getMonth() &&
          todayDate.getFullYear() == msgDate.getFullYear()) {
          msgCreatedDate = msgCreatedDate.split(' ')[1];
         	msgCreatedDate = msgCreatedDate.split(':')[0]+":"+msgCreatedDate.split(':')[1];
     	}
     	else {
        	msgCreatedDate = monthNames[msgDate.getMonth()] + " " + msgDate.getDate();
     	}
     	
     	str.push("<div class='msg_main mui-panel' data-msg-id=''>");
     	str.push("<div class='msg_sender_pic'><a class='senderLinkAnc' data-userid='"+userId+"' href='javascript:{}'><img src='"+item_url+"'/></a></div>");
     	str.push("<div class='msg_details_main'>");
     	str.push("<div class='msg_head'>");
     	str.push("<div class='msg_sender_name'><a class='senderLinkAnc' data-userid='"+userId+"' href='javascript:{}'>"+userName+"</a></div>");
     	str.push("<div class='msg_date_time'>"+msgCreatedDate+"</div>");
     	str.push("</div>");
     	str.push("<div class='msg_body'>");
     	str.push(msg_body);
     	str.push("</div>");
     	str.push("</div>");
     	str.push("</div>");
 	});
	container.find('div.feed_main').append(str.join(''));
	
	container.off("click", ".feed_main a.senderLinkAnc").on("click", ".feed_main a.senderLinkAnc", function(){
    	var target = $(this),
    	userId = target.data("userid"),
    	profileObj = new Profile();
    	$(window).off("scroll");
    	profileObj.init(userId);
	 });
  },
 }