Swarm = {};
Swarm.ActivityFeed = function (){
  var self = this;
};

Swarm.ActivityFeed.prototype = {
  init: function(){
  	var self = this;
  	self.displayActivityFeed();
  },

  displayActivityFeed : function() {
  	var self = this;
  	$("#content").empty();
  	jQuery.ajax({
    		type :"GET",
    		url : "https://www.yammer.com/api/v1/streams/activities.json?access_token="+yammer.getAccessToken(),
        	data:{
          		"limit":7
        	},
    		dataType: 'json',
    		xhrFields: {
    			withCredentials: false
    		},
    		success : function(data){
          		self.buildActivityFeed(data);
    		},
    		error : function(){
    			alert("error");
    		}
  	  });
  },

  buildActivityFeed : function(data) {
  	var self = this,
    container = $("#content");
  	var items = data.items;
  	//var users = data.objects.user;
  	var references = data.references;
  	var objects = data.objects;
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
       			//userArrObj = $.grep(users, function(e){ return e.id == userId; }),
        		item_name = (referencesArrObj.length > 0) ? referencesArrObj[0].full_name : "";
        		item_url = (referencesArrObj.length > 0) ? referencesArrObj[0].mugshot_url : "";
        		userName = item_name;
    		}
    		else if ((firstIndex=temp.indexOf('group:')) != -1) {
    			groupId = temp.substring(firstIndex+6, lastIndex);
    			var referencesArrObj = $.grep(references, function(e){ return e.id == groupId; });
        		item_name = (referencesArrObj.length > 0) ? referencesArrObj[0].full_name : "";
    		}
    		else if ((firstIndex=temp.indexOf('page:')) != -1) {
    			pageId = temp.substring(firstIndex+5, lastIndex);
    			var ObjectsArr = $.grep(references, function(e){ return e.id == pageId; });
    			item_name = (ObjectsArr.length > 0) ? ObjectsArr[0].full_name : "";
    		}
    		else if ((firstIndex=temp.indexOf('uploaded_file:')) != -1) {
    			pageId = temp.substring(firstIndex+14, lastIndex);
    			var ObjectsArr = $.grep(references, function(e){ return e.id == pageId; });
    			item_name = (ObjectsArr.length > 0) ? ObjectsArr[0].full_name : "";
    		}
    		else {
    			item_name = temp;
    		}
    		msgArray.push(item_name);
    	});
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
    	profileObj = new Swarm.Profile();
    	$(window).off("scroll");
    	profileObj.init(userId);
	});
  },
 }

Swarm.Analytics = function (){
  var self = this;
};

Swarm.Analytics.prototype = {
	init: function(){
		var self = this;
		$(window).off('scroll');
		// Swarm.utils.showLoadingIcon();
	    jQuery.ajax({
			type :"GET",
			url : "https://www.yammer.com/api/v1/users/current.json?access_token="+yammer.getAccessToken()+"&include_group_memberships=true",
			dataType: 'json',
			xhrFields: {
				withCredentials: false
			},
			success : function(data){


				$("#content").html('<div id="donut_chart" class="msg_main" style="width:340px;height:250px;padding-top:10px"></div>');
				var groupData = self.generateGroupData(data)
				self.drawChart(groupData);
				//Swarm.utils.hideLoadingIcon();
				$('div.uv-chart-div').off('click');
				$('div.uv-chart-div').on('click', 'g.uv-arc-groups', function(e){
					//alert(groupData[$(this).index()].id);
					self.getGroupMessages(groupData[$(this).index()].id);
				});
			},
			error : function(){
				alert("error");
			}
		});
	},

	getGroupMessages: function(group_id) {
		var self = this;
		jQuery.ajax({
  			type :"GET",
  			url : 'https://www.yammer.com/api/v1/messages/in_group/'+group_id+'.json?access_token='+yammer.getAccessToken(),
      		data:{
        		"limit":7
      		},
  			dataType: 'json',
  			xhrFields: {
  				withCredentials: false
  			},
  			success : function(data){
  				$('#content').find('div.feed_main').remove();
        		Swarm.utils.buildFeedInfo(data);
  				//console.log(data);
  			},
  			error : function(){
  				alert("error");
  			}
  		});
	},


	generateGroupData: function(data){
		var result = [];
		$.each(data.group_memberships, function(i,val){
			if(i<10){
				result.push({name: val.full_name, value: (21 - (i*2)), id: val.id});
			}
		});
		return result;
	},
	generateGroupChart : function(data, result){
			var self = this;
			var index = 0;
			var group_messages = {};
			var appendResult = function(group_data){
				group_messages[data.group_memberships[index].id] = group_data;
				index++;
				if(index < data.group_memberships.length){
					self.constructGroupData(data, index, appendResult);
				}
				else{
					result(group_messages);
				}
			}
			self.constructGroupData(data, index, appendResult);
	},

	constructGroupData: function(data, index, cb){

		var groupId = data.group_memberships[index].id;
		var groupName = data.group_memberships[index].full_name;
		jQuery.ajax({
			type :"GET",
			url : "https://www.yammer.com/api/v1/messages/in_group/"+groupId+".json?access_token="+yammer.getAccessToken(),
			dataType: 'json',
			xhrFields: {
				withCredentials: false
			},
			success : function(data){
				cb(data);
			},
			error : function(){
				alert("error");
			}
		});
	},

	drawChart: function(data){
		var github_lang_config = {

	 	graph : {
			bgcolor: 'none',
			custompalette : ['#A6CEE3','#1F78B4','#B2DF8A','#33A02C','#FB9A99','#E31A1C','#FDBF6F','#FF7F00','#CAB2D6','#6A3D9A']
		},

		dimension : {
			width : 200,
			height : 200
		},

		meta : {
			caption : 'Top 10 groups in the past week'
		},

		label : {
			suffix : '',
			strokecolor: '#555'
		},

		margin : {
			top : 20,
			bottom : 20,
			left : -1,
			right : 100
		},

		caption : {
			fontvariant : 'none'
		},

		frame : {
			bgcolor : 'none'
		},

		axis : {
			fontfamily : 'Arial'
		},

		legend : {
			position: 'right',
			fontfamily : 'Arial'
		},

		caption : {
			fontfamily: 'Arial'
		},

		subCaption : {
			fontfamily : 'Arial'
		}
	 };

	var github_lang_data = {
	 	categories : ['groups'],
		dataset : {
			'groups' : data
		}
	 };

	github_lang_config.meta.position = '#donut_chart';
	uv.chart('Pie', github_lang_data, github_lang_config);

	}
}

Swarm.Client = function () {
  var self = this;
  self.navBar = $('.nav-bar');
  self.header = $('.header');
  self.content = $('#content');

  self.feedsService = new Swarm.Feeds();
  self.messagesService = new Swarm.Messages();
  self.analyticsService = new Swarm.Analytics();
  self.activityFeedService = new Swarm.ActivityFeed();
  self.searchService = new Swarm.Search();
  self.postMessageService = new Swarm.PostMessage();
  self.notificationsService = new Swarm.Notifications();

  self.init();
};

Swarm.Client.prototype = {
  init: function () {
    var self = this;
    self.bindUserEvents();
    self.invokeCustomization();

    self.getCurrentUserMugshot();
    self.getCurrentUserNetworks();

    self.navBar.find("i").first().trigger("click", [true]);
  },

  bindUserEvents: function () {
    var self = this;
    self.bindTabSelectEvent();
    self.bindSearchEvent();
  },

  bindTabSelectEvent: function () {
    var self = this;
    self.navBar.find('i').click(function(event, isFirst){
      var target = $(this),
        jsVal = target.data("jsval"),
        jsValCap = jsVal.replace(/^[a-z]/, function(m){ return m.toUpperCase() });
        self.makeActiveTab(jsValCap);

        if (!isFirst) {
          chrome.storage.local.set({'newImagePath': '/img/yammerlogo_notifier.png'});
          // create alarm for polling new messages every 1 minutes
          chrome.alarms.create('checkNewTasks', {
            when: 1000,
            periodInMinutes: 1
          });
        }
        chrome.browserAction.setIcon({ path: "/img/yammerlogo.png" });
        target.parent().siblings().find('i').removeClass('active');
        target.addClass('active');
    });
  },

  bindSearchEvent: function () {
    var self = this;
    self.header.on('change', 'input#search', function () {
      var target = $(this);
      self.searchService.init(target.val());
    });
  },

  makeActiveTab: function (jsVal){
    var self = this,
      pageTitle = self.header.find('.page-title');

    switch (jsVal){
      case "Feeds":
        pageTitle.html('Network Feed');
        self.feedsService.init();
        break;
      case "Messages":
        pageTitle.html('Messages');
        self.messagesService.init();
        break;
      case "Analytics":
        pageTitle.html('Analytics');
        self.analyticsService.init();
        break;
      case "Postmessage":
        pageTitle.html('Post Message');
        self.postMessageService.init();
        break;
      case "Activityfeed":
        pageTitle.html('Recent Activity');
        self.activityFeedService.init();
        break;
      case "Notifications":
        pageTitle.html('Notifications');
        self.notificationsService.init();
        break;
      case "Search":
        pageTitle.html('<div class="mui-form-group"><input type="text" id="search" class="mui-form-control mui-empty mui-dirty" /><label>Search</label></div>');
        pageTitle.find('input').focus();
        break;
      default:
        console.log('Unregistered service: ' + jsVal);
        break;
    }
  },

  invokeCustomization: function () {
    var self = this;
    self.content.enscroll({
      showOnHover: true,
      verticalTrackClass: 'track3',
      verticalHandleClass: 'handle3'
    });
  },

  getCurrentUserMugshot: function () {
    var self = this;
    new Swarm.Profile().getCurrentUserProfileInformation(function (data) {
    $('.header .current-mugshot').html($('<img />').attr('src', data.mugshot_url_template.replace("{width}x{height}","100x100"))
      .on('click', function () {
        new Swarm.Profile().getCurrentUserProfileInformation();
      }));
    });
  },

  getCurrentUserNetworks: function () {
    var self = this;
    new Swarm.Network().getCurrentNetworkInformation(function (data) {
      var select = self.header.find('.right-pane').html($('<div class="mui-dropdown" />')).find('.mui-dropdown');
      select.append($('<button class="mui-btn mui-btn-default mui-btn-flat" data-mui-toggle="dropdown" />').append($('<span class="mui-caret" />')));
      select.append($('<ul class="mui-dropdown-menu mui-dropdown-menu-right" />'));
      for (var i = 0, length = data.length; i < length; i++) {
        select.find('.mui-dropdown-menu').append($('<li />').append($('<a />').attr('href', '#').data('networkId', data[i].id).html(data[i].name)));
        if (data[i].is_primary === true) {
          select.find('.mui-btn').remove();
          select.prepend($('<button class="mui-btn mui-btn-default mui-btn-flat" data-mui-toggle="dropdown" />').html(data[i].name).append($('<span class="mui-caret" />')));
        }
      }
    });
  }
};

Swarm.Feeds = function (){
  var self = this;
};

Swarm.Feeds.prototype = {
  init: function(){
    var self = this;
    self.getFeeds();
    self.attachWindowScrollEvent();
  },
  getFeeds: function(){
      var self = this;
      $("#content").empty();
      jQuery.ajax({
  		type :"GET",
  		url : "https://www.yammer.com/api/v1/messages.json?access_token="+yammer.getAccessToken(),
      data:{
        "limit":7
      },
  		dataType: 'json',
  		xhrFields: {
  			withCredentials: false
  		},
  		success : function(data){
        Swarm.utils.buildFeedInfo(data);
        $('#content').append('<div><button class="mui-z3 mui-btn mui-btn-floating mui-btn-floating-mini post-btn"><i class="material-icons">add</i></button></div>');
  			//console.log(data);
  		},
  		error : function(){
  			alert("Error, Please login to Yammer");
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
            url : "https://www.yammer.com/api/v1/messages.json?access_token="+yammer.getAccessToken(),
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

$(document).ready(function() {
  swarmInstance = new Swarm.Client();
});

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

Swarm.Network = function (){
  var self = this;
};

Swarm.Network.prototype = {
  getCurrentNetworkInformation: function (cb) {
    var self = this;
    jQuery.ajax({
      type :"GET",
      url : "https://www.yammer.com/api/v1/networks/current.json?access_token="+yammer.getAccessToken(),
      dataType: 'json',
      xhrFields: {
        withCredentials: false
      },
      success : function(data){
        if (cb) {
          cb(data);
        } else {
          console.log('Network: No access specified.');
        }
      },
      error : function(){
        alert("error");
      }
    });
  }
}

Swarm.Notifications = function (){
  var self = this;
};

Swarm.Notifications.prototype = {
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
    	profileObj = new Swarm.Profile();
    	$(window).off("scroll");
    	profileObj.init(userId);
	 });
  },
 }

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
  	var self = this;
	$('.post_form').submit(function() {
		var groupId = $("select#slt_groups").val();
		var body_message = $("textarea#message_body").val();

		//alert(body_message+''+groupId);
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
        //alert("post successful") ;
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
        	str = [];
        	str.push("<div class='post_form'>");
        	str.push("<form>");
          str.push('<div class="mui-form-group">');
          str.push('<label>Groups</label>');
        	//str.push('<label style="font-size:12px">Groups:</label>');
          str.push('<div class="mui-select">');
        	str.push('<select name="groups" id="slt_groups">');

  			$.each(data.group_memberships, function(i,val){
				str.push('<option value='+'"'+val.id+'"'+'>'+val.full_name+'</option>')	;
			});
			str.push('</select>');

      str.push("</div>");
      str.push("</div>");
			//str.push('<br/>');
			//str.push('<label style="font-size:12px">Message Body:</label>');
			//str.push('<br/>');
      str.push('<div class="mui-form-group">');
			str.push('<textarea name="message_body" class="mui-form-control" id="message_body" rows="7" cols="37"/>');
      str.push('<label class="mui-form-floating-label">Write Message Here</label>');
			str.push("</div>");
      //str.push('<br/>');
			str.push('<input class="post_button mui-btn mui-btn-primary mui-btn-raised mui-btn-flat" type="submit" ></input>');
			str.push("</form>");
			str.push("</div>");
			container.empty().html(str.join(''));
			self.postMessage();
  		},
  		error : function(){
  			alert("error");
  		}
  	});
  }
}

Swarm.Profile = function (){
  var self = this;
};

Swarm.Profile.prototype = {
  init: function(userId){
  	var self = this;
  	self.getProfileInformation(userId);
  },
  getProfileInformation : function(userId){
  	var self = this;
  	jQuery.ajax({
  		type :"GET",
  		url : "https://www.yammer.com/api/v1/users/"+userId+".json?access_token="+yammer.getAccessToken(),
      data:{
        "limit":1
      },
  		dataType: 'json',
  		xhrFields: {
  			withCredentials: false
  		},
  		success : function(data){
        	Swarm.utils.showProfile(data);
  			//console.log(data);
  		},
  		error : function(){
  			alert("error");
  		}
  	});
  },
  getCurrentUserProfileInformation: function (cb) {
    var self = this;
    jQuery.ajax({
      type :"GET",
      url : "https://www.yammer.com/api/v1/users/current.json?access_token="+yammer.getAccessToken(),
      data:{
        "limit":1
      },
      dataType: 'json',
      xhrFields: {
        withCredentials: false
      },
      success : function(data){
        if (cb) {
          cb(data);
        } else {
          Swarm.utils.showProfile(data);
        }
        //console.log(data);
      },
      error : function(){
        alert("error");
      }
    });
  }
}

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
          Swarm.utils.buildFeedInfo(data.messages);
  		},
  		error : function(){
  			alert("error");
  		}
  	});
  }
}

Swarm.utils = {

	showLoadingIcon: function(){
		$("#loadingIcon").show();

	},

	hideLoadingIcon: function(){
		$("#loadingIcon").hide();

	},
	buildFeedInfo: function(data){
       var self = this,
       container = $("#content"),
       msgs = data.messages,
       references = data.references,
       str = [];
        // do this only for the first set of messages
        if(container.find('div.feed_main').length == 0){
        	container.append('<div class="feed_main"></div>');
        }
        var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];
        $.each(msgs, function(ind, msg){
        	var senderArrObj = $.grep(references, function(e){ return e.id == msg.sender_id; }),
        	senderName = (senderArrObj.length > 0) ? senderArrObj[0].full_name : "",
        	senderPicURL = (senderArrObj.length > 0) ? senderArrObj[0].mugshot_url : "",
           senderId = (senderArrObj.length > 0) ? senderArrObj[0].id : "",
           msgCreatedDate = msg.created_at;
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
     str.push("<div class='msg_main mui-panel' data-msg-id='"+msg.id+"'>");
     str.push("<div class='msg_sender_pic'><a class='senderLinkAnc' data-userid='"+senderId+"' href='javascript:{}'><img src='"+senderPicURL+"'/></a></div>");
     str.push("<div class='msg_details_main'>");
     str.push("<div class='msg_head'>");
     str.push("<div class='msg_sender_name'><a class='senderLinkAnc' data-userid='"+senderId+"' href='javascript:{}'>"+senderName+"</a></div>");
     str.push("<div class='msg_date_time'>"+msgCreatedDate+"</div>");
     str.push("</div>");
     str.push("<div class='msg_body'>");
     str.push(msg.body.plain);
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
showSearchResults:function(data){
    var self = this;
    container = $("#content"),
    profile = data,
    str = [];
    str.push('<div>');
    str.push('<div>Users '+data.count.users+'</div>');
    str.push('<div>Messages '+data.count.messages+'</div>');
    str.push('<div>Groups '+data.count.groups+'</div>');
    str.push('<div>Pages '+data.count.pages+'</div>');
    str.push('<div>Topics '+data.count.topics+'</div>');

    //messages
    str.push('<div>'+Swarm.utils.buildFeedInfo(data.messages)+'</div>');
    //users

    str.push('</div>');
    container.empty().html(str.join(''));
},
showProfile : function(data){
    var self = this,
    container = $("#content"),
    profile = data,
    profilePic = data.mugshot_url_template.replace("{width}x{height}","100x100"),
    emailData =
    str = [];
    str.push('<div class="profileInfo_main">');
    str.push('<div class="profile_cell_div">');
    str.push('<div class="profileDataDiv profile_pic"><img src="'+profilePic+'"/></div>');
    str.push('<div class="profileDataDiv full_name">'+data.full_name+'</div>');
    str.push('<div class="profileDataDiv job_title">'+self.getEmptyStringIfNull(data.job_title)+'</div>');
    str.push('<div class="stats">');
    str.push('<table width="100%">');
    str.push('<tr>');
    str.push('<td width="33%"><div class="following"><img title="followers" src="../css/followers.png"><span class="statsVal"> '+data.stats.followers+'</span></div></td>');
    str.push('<td width="33%"><div class="followers"><img title="following" src="../css/following.png"> <span class="statsVal"> '+data.stats.following+'</span></div></td>');
    str.push('<td width="33%"><div class="updates"> <img title="updates" src="../css/updates.png"><span class="statsVal"> '+data.stats.updates+'</span></div></td>');
    str.push('</tr>');
    str.push('</table>');
    str.push('</div>');
    str.push('</div>');
    str.push('<div class="profile_cell_div">');
    str.push('<div class="profileDataDiv infoTitle"></div>');
    str.push('<div class="profileDataDiv summary"><div class="profileLabeldiv">Summary </div><div class="profileValuediv">'+self.getEmptyStringIfNull(data.summary)+'</div></div>');
    str.push('<div class="profileDataDiv department"><div class="profileLabeldiv">Department </div><div class="profileValuediv">'+self.getEmptyStringIfNull(data.department)+'</div></div>');
    str.push('<div class="profileDataDiv location"><div class="profileLabeldiv">Location </div><div class="profileValuediv">'+self.getEmptyStringIfNull(data.location)+'</div></div>');
    str.push('<div class="profileDataDiv birth_date"><div class="profileLabeldiv">Birthday </div><div class="profileValuediv">'+data.birth_date+'</div></div>')
    str.push('<div class="profileDataDiv email"><div class="profileLabeldiv">Email </div><div class="profileValuediv">'+data.email+'</div></div>');
    str.push('<div class="profileDataDiv phone"><div class="profileLabeldiv">Phone </div><div class="profileValuediv">'+self.getPhoneNumberInfo(data.contact.phone_numbers)+'</div></div>');
    str.push('<div class="profileDataDiv interests"><div class="profileLabeldiv">Interests </div><div class="profileValuediv">'+self.getEmptyStringIfNull(data.interests)+'</div></div>');
    str.push('<div class="profileDataDiv expertise"><div class="profileLabeldiv">Expertise </div><div class="profileValuediv">'+self.getEmptyStringIfNull(data.expertise)+'</div></div>');
    str.push('<div class="profileDataDiv active_since"><div class="profileLabeldiv">Active Since </div><div class="profileValuediv">'+self.getActiveDuration(new Date(data.activated_at.toString()))+' </div></div>');
    str.push('</div>');
    container.empty().html(str.join(''));
},

getActiveDuration : function(date){
    var self = this;
    var oneDay = 24*60*60*1000, // hours * minutes * seconds * milliseconds
    firstDate = date,
    secondDate = new Date();
    return self.getTimeDuration(firstDate, secondDate);
},

getTimeDuration : function(date_1, date_2){
    var self = this;
    //convert to UTC
    var date2_UTC = new Date(Date.UTC(date_2.getUTCFullYear(), date_2.getUTCMonth(), date_2.getUTCDate()));
    var date1_UTC = new Date(Date.UTC(date_1.getUTCFullYear(), date_1.getUTCMonth(), date_1.getUTCDate()));

    //--------------------------------------------------------------
    var days = date2_UTC.getDate() - date1_UTC.getDate();
    if (days < 0){
        date2_UTC.setMonth(date2_UTC.getMonth() - 1);
        days += self.daysInMonth(date2_UTC);
    }
    //--------------------------------------------------------------
    var months = date2_UTC.getMonth() - date1_UTC.getMonth();
    if (months < 0){
        date2_UTC.setFullYear(date2_UTC.getFullYear() - 1);
        months += 12;
    }

    //--------------------------------------------------------------
    var years = date2_UTC.getFullYear() - date1_UTC.getFullYear();
    var result = '';
    if (years > 1){
        result += years + " years ";
    }
    if (months > 1){
        result += months + " months ";
    }
    if (days > 1){
        result += days+" days";
    }

    return result;
},

daysInMonth : function (date2_UTC){
    var monthStart = new Date(date2_UTC.getFullYear(), date2_UTC.getMonth(), 1);
    var monthEnd = new Date(date2_UTC.getFullYear(), date2_UTC.getMonth() + 1, 1);
    var monthLength = (monthEnd - monthStart) / (1000 * 60 * 60 * 24);
    return monthLength;
},
getPhoneNumberInfo : function(phoneNumbers){
    var self = this,
    result = [];
    for(var phoneNumber in phoneNumbers){
        result.push('<div>');
            result.push('<div class="phoneType">'+phoneNumbers[phoneNumber].type+'</div>');
            result.push('<div class="phoneNumber"> '+phoneNumbers[phoneNumber].number+'</div>');
        result.push('</div>');
    }
    return result.join('');
},
getEmptyStringIfNull : function(data){
    var self = this;
    if(data == null || data == undefined){
        return "";
    }
    return data;
}

}
