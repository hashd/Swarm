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
    var content = $("#content");
  	$("#content").empty();
    Swarm.utils.showLoadingIcon();
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
          Swarm.utils.hideLoadingIcon();
      		self.buildActivityFeed(data);
    		},
    		error : function(){
          Swarm.utils.hideLoadingIcon();
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

     	str.push("<div class='msg_main mui-panel mui-z2' data-msg-id=''>");
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
  
  container.slimScroll().off('slimscroll');
  container.slimScroll().removeData('events');
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
		Swarm.utils.showLoadingIcon();
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
				Swarm.utils.hideLoadingIcon();
				$('div.uv-chart-div').off('click');
				$('div.uv-chart-div').on('click', 'g.uv-arc-groups', function(e){
					//alert(groupData[$(this).index()].id);
					self.getGroupMessages(groupData[$(this).index()].id);
				});
			},
			error : function(){
        Swarm.utils.hideLoadingIcon();
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

Swarm.API = function (accessToken) {
  var self = this;
  self.networks = {};
  self.primaryAccessToken = accessToken;
  self.accessToken = accessToken;

  self.init();
};

Swarm.API.prototype = {
  init: function () {
    var self = this;
    self.getUserNetworkAccessTokens();
  },

  ajaxCall: function (type, url, data, cb) {
    var self = this;
    jQuery.ajax({
      type: type,
      url: url,
      beforeSend: function (request) {
        request.setRequestHeader("Authorization", "Bearer " + self.getAccessToken());
      },
      data: $.extend({}, {}, data),
      dataType: 'json',
      xhrFields: {
        withCredentials: false
      },
      success: function(data){
        if (cb !== undefined) {
          cb(data);
        }
      },
      error: function(e) {
        console.log(e);
        alert("Unable to fetch data from Yammer network");
      }
    });
  },

  setAccessToken: function (accessToken) {
    this.accessToken = accessToken;
  },

  getAccessToken: function () {
    return this.accessToken;
  },

  setNetworks: function (networks) {
    var self = this;
    networks.forEach(function (i, d) {
      self.networks[d.network_id] = d;
    });
  },

  setPrimaryNetwork: function (networkId) {
    var self = this;
    self.activeNetwork = self.networks[networkId];
  },

  switchNetwork: function (networkdId) {
    var self = this;
    self.activeNetwork = self.networks[networkId];
    self.setAccessToken(self.activeNetwork.token);
  },



  /** All Yammer API Calls below */
  getCurrentUserProfile: function (cb) {
    var self = this;
    self.ajaxCall('GET', 'https://www.yammer.com/api/v1/users/current.json', {}, cb);
  },

  getUserNetworks: function (cb) {
    var self = this;
    self.ajaxCall('GET', 'https://www.yammer.com/api/v1/networks/current.json', {}, cb);
  },

  getUserNetworkAccessTokens: function (cb) {
    var self = this,
      tempAccessToken = self.accessToken;

    self.setAccessToken(self.primaryAccessToken);
    self.ajaxCall('GET', 'https://www.yammer.com/api/v1/oauth/tokens.json', {}, function (data) {
      self.setNetworks(data);
      self.setAccessToken(tempAccessToken);
    });
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
  self.groupsService = new Swarm.Groups();
  self.peopleService = new Swarm.People();

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
        title = target.attr('title'),
        jsValCap = jsVal.replace(/^[a-z]/, function(m){ return m.toUpperCase() });
        self.makeActiveTab(jsValCap, title);


        //chrome.storage.local.set({'newImagePath': '/img/yammerlogo_notifier.png'});
        // create alarm for polling new messages every 1 minutes
        chrome.alarms.create('checkNewTasks', {
            when: 1000,
            periodInMinutes: 1
        });

        chrome.browserAction.setBadgeText({text: ""});

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

  makeActiveTab: function (jsVal, title){
    var self = this,
      pageTitle = self.header.find('.page-title').html(title);

    // Update slimscrollbar position for content change
    self.content.slimScroll().removeData('events');
    self.content.parent().find('.slimScrollBar').css('top',0);

    switch (jsVal){
      case "Feeds":
        self.feedsService.init();
        break;
      case "Messages":
        self.messagesService.init();
        break;
      case "Analytics":
        self.analyticsService.init();
        break;
      case "Postmessage":
        self.postMessageService.init();
        break;
      case "Activityfeed":
        self.activityFeedService.init();
        break;
      case "Notifications":
        self.notificationsService.init();
        break;
      case "Groups":
        self.groupsService.init();
        break;
      case "People":
        self.peopleService.init();
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
    self.content.slimScroll({
      height: '480px',
      width: '330px'
    }).bind('slimscroll', function (e, pos) {
      console.log('At position ' + pos);
    });
  },

  getCurrentUserMugshot: function () {
    var self = this,
      mugshotContainer = $('.header .current-mugshot'),
      content = $('#content');

    Swarm.api.getCurrentUserProfile(function (data) {
      mugshotContainer.html($('<img />').attr('src', data.mugshot_url_template.replace("{width}x{height}","100x100")));
      mugshotContainer.find('img').on('click', function () {
        Swarm.utils.showProfile(data);
      });
    });
  },

  getCurrentUserNetworks: function () {
    var self = this;
    Swarm.api.getUserNetworks(function (data) {
      self.header.find('.right-pane').html(Handlebars.templates.network_selection({ networks: data}));
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
    Swarm.utils.showLoadingIcon();
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
        Swarm.utils.hideLoadingIcon();
        Swarm.utils.buildFeedInfo(data);
        $('#content').append('<div><button class="mui-z3 mui-btn mui-btn-floating mui-btn-floating-mini post-btn"><i class="material-icons">add</i></button></div>');
  			$('.post-btn').click(function (event){
          swarmInstance.postMessageService.init();
        });
        //console.log(data);
  		},
  		error : function(){
        Swarm.utils.hideLoadingIcon();
  			alert("Error, Please login to Yammer");
  		}
  	});
  },
  attachWindowScrollEvent: function(){
    var self = this;
    var content = $("#content");
    
    content.slimScroll().unbind('slimscroll').bind('slimscroll', function (e, pos) {
      //console.log('At position ' + pos);
      if(pos == 'bottom') {
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
      }
    });
  }

}

Swarm.Groups = function (){
  var self = this;
};

Swarm.Groups.prototype = {
  init: function(){
  	var self = this;
  	self.buildGroupMessageFeed();
  },

  buildGroupMessageFeed : function(){
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
          	str.push('<div class="mui-form-group group_list">');
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
			container.empty().html(str.join(''));
			self.displayGroupMessages();
			$('#slt_groups').trigger('change');
  		},
  		error : function(){
  			alert("error");
  		}
  	});
  },

  displayGroupMessages :function() {
  	var self = this;
	$('#slt_groups').change(function() {
		var content = $("#content");
		var groupId = $("select#slt_groups").val();
		
		jQuery.ajax({
  		type :"GET",
      
  		url : 'https://www.yammer.com/api/v1/messages/in_group/'+groupId+'.json?access_token='+yammer.getAccessToken(),
      	data:{
        	"limit":20
      	},
  		dataType: 'json',
  		xhrFields: {
  			withCredentials: false
  		},
  		success : function(data){
  			content.find('div.feed_main').remove();
        	Swarm.utils.buildFeedInfo(data);
  		},
  		error : function(){
  			alert("error");
  		}
  		});

	});
  },
}
$(document).ready(function() {
  Swarm.api = new Swarm.API(yammer.getAccessToken());
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
      Swarm.utils.showLoadingIcon();
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
          Swarm.utils.hideLoadingIcon();
          chrome.storage.local.set({'lastMsgId': data.messages[0].id});
        	Swarm.utils.buildFeedInfo(data);
    			//console.log(data);
    		},
    		error : function(){
          Swarm.utils.hideLoadingIcon();
    			alert("error");
    		}
  	  });
  },

  attachWindowScrollEvent: function(){
    var self = this;
    var content = $("#content");
    content.slimScroll().off('slimscroll');
    content.slimScroll().removeData('events');
    content.slimScroll().on('slimscroll');
    content.slimScroll().bind('slimscroll', function (e, pos) {

        if(pos == 'bottom') {
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
       } 
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
    Swarm.utils.showLoadingIcon();
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

     	str.push("<div class='msg_main mui-panel mui-z2' data-msg-id=''>");
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
  container.slimScroll().off('slimscroll');
  container.slimScroll().removeData('events');
	container.off("click", ".feed_main a.senderLinkAnc").on("click", ".feed_main a.senderLinkAnc", function(){
    	var target = $(this),
    	userId = target.data("userid"),
    	profileObj = new Swarm.Profile();
    	$(window).off("scroll");
    	profileObj.init(userId);
	 });
  },
 }

Swarm.People = function (){
  var self = this;
};

Swarm.People.prototype = {
  init: function () {
    this.bindPersonLiveEvent();
    this.bindIndexLiveEvent();
    this.displayPeopleFeed();
  },

  displayPeopleFeed: function () {
    var self = this,
      container = $("#content").empty();

    container.append(Handlebars.templates.people({}));
    container.find('.sw-people-alpha').first().trigger('click');
  },

  displayPeopleList: function (pageNumber, initialLetter, sortFactor) {
    var self = this,
      container = $("#content .sw-people-content");

    jQuery.ajax({
      type :"GET",
      url : "https://www.yammer.com/api/v1/users.json?access_token="+yammer.getAccessToken(),
      data:{
        "page": pageNumber || 1,
        "letter": initialLetter || 'A'
      },
      dataType: 'json',
      xhrFields: {
        withCredentials: false
      },
      success : function(data){
        Swarm.utils.hideLoadingIcon();
        if (!(pageNumber > 1 && data.length === 0)) {
          data.forEach(function (d, i) {
            d.mugshot_url_template = d.mugshot_url_template.replace("{width}x{height}","64x64");
          });
          container.append(Handlebars.templates.persons({ 'users': data }));
          self.displayPeopleList(pageNumber + 1, initialLetter);
        }
      },
      error : function(){
        Swarm.utils.hideLoadingIcon();
        alert("Looks like something is wrong.");
      }
    });
  },

  bindPersonLiveEvent: function () {
    var self = this,
      container = $("#content");

    container.on('click', '.sw-person', function () {
      var clkd = $(this),
        userId = clkd.attr('data-user-id');

      jQuery.ajax({
        type: "GET",
        url: "https://www.yammer.com/api/v1/users/" + userId + ".json?access_token=" + yammer.getAccessToken(),
        data: {
          "limit": 1
        },
        dataType: 'json',
        xhrFields: {
          withCredentials: false
        },
        success: function(data){
          Swarm.utils.showProfile(data);
        },
        error: function(){
          alert("Looks like something is wrong.");
        }
      });
    });
  },

  bindIndexLiveEvent: function () {
    var self = this,
      container = $("#content");

    container.on('click', '.sw-people-alpha', function () {
      var clkd = $(this),
        alphabet = clkd.attr('value');

      $('.sw-people-alpha').removeClass('active');
      clkd.addClass('active');

      container.find('.sw-people-content').empty();
      Swarm.utils.showLoadingIcon("#content .sw-people-content");
      self.displayPeopleList(1, alphabet);
    });
  }
};

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
        	str.push("<div class='post_form mui-panel mui-z2'>");
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
          str.push('<div class="mui-form-group">');
          str.push('<textarea name="message_body" class="mui-form-control" id="message_body" rows="10" cols="37"/>');
          str.push('<label class="mui-form-floating-label">Write Message Here</label>');
          str.push("</div>");
          str.push('<input class="post_button mui-btn mui-btn-primary mui-btn-raised mui-btn-flat" type="submit" ></input>');
          str.push("</form>");
          str.push("</div>");
          container.empty().html(str.join(''));
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
    $('#content').empty();
    Swarm.utils.showLoadingIcon();
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
        Swarm.utils.hideLoadingIcon();
      	Swarm.utils.showProfile(data);
  			//console.log(data);
  		},
  		error : function(){
        Swarm.utils.hideLoadingIcon();
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
        var str = [];
        container.append('<div class="feed_main"></div>');
        str.push('<ul class="mui-tabs mui-tabs-justified">');
        str.push('<li class="mui-active"><a class="search_messages" data-mui-toggle="tab" data-mui-controls="search_messages">Messages</a></li>');
        str.push('<li><a class="search_users" data-mui-toggle="tab" data-mui-controls="search_users">Users</a></li>');
        str.push('</ul>');
        str.push('<div class="mui-tab-content">');
        str.push('<div class="mui-tab-pane mui-active" id="search_messages">');
        str.push(Swarm.utils.buildFeedInfo(data.messages, true));
        str.push('</div>');  
        str.push('<div class="mui-tab-pane" id="search_users">');
        self.buildUserList(data.users, str);
        str.push('</div>');
        str.push('</div>');
                
        container.find('div.feed_main').append(str.join(''));
        container.slimScroll().off('slimscroll');
        container.slimScroll().removeData('events');
  		},
  		error : function(){
        Swarm.utils.hideLoadingIcon();
  			alert("error");
  		}
  	});
  },
  buildUserList : function(data,str) {

    var container = $("#content");
    $.each(data, function(ind, user){
      
      var senderName = user.full_name,
      senderPicURL = user.mugshot_url,
      senderId = user.id ;
      
      str.push("<div class='msg_main mui-panel mui-z2'>");
      str.push("<div class='msg_sender_pic'><a class='senderLinkAnc' data-userid='"+senderId+"' href='javascript:{}'><img src='"+senderPicURL+"'/></a></div>");
      str.push("<div class='msg_details_main'>");
      str.push("<div class='msg_head'>");
      str.push("<div class='msg_sender_name'><a class='senderLinkAnc' data-userid='"+senderId+"' href='javascript:{}'>"+senderName+"</a></div>");
      str.push("</div>");
      str.push("<div class='msg_body' ");
      str.push("</div>");
      str.push("</div>");
      str.push("</div>");
      str.push("</div>");
    });

    container.off("click", ".msg_sender_name a.senderLinkAnc").on("click", ".msg_sender_name a.senderLinkAnc", function(){
    var target = $(this),
    userId = target.data("userid"),
    profileObj = new Swarm.Profile();
    $(window).off("scroll");
    profileObj.init(userId);
    });
  },

}

Swarm.utils = {

	showLoadingIcon: function(selector){
		$(selector || "#content").html('<div id="loading-icon"><div class="la-square-spin la-2x"><div></div></div>');
	},

	hideLoadingIcon: function(){
		$("#loading-icon").remove();
	},

	buildFeedInfo: function(data, isSearch){
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
                var minutes = msgDate.getMinutes();
                minutes = minutes < 10 ? ('0'+minutes):minutes;
                msgCreatedDate = msgDate.getHours() + ":" + minutes;
            }
            else {
                msgCreatedDate = monthNames[msgDate.getMonth()] + " " + msgDate.getDate();
            }
            str.push("<div class='msg_main mui-panel mui-z2' data-msg-id='"+msg.id+"'>");
            str.push("<div class='msg_sender_pic'><a class='senderLinkAnc' data-userid='"+senderId+"' href='javascript:{}'><img src='"+senderPicURL+"'/></a></div>");
            str.push("<div class='msg_details_main'>");
            str.push("<div class='msg_head'>");
            str.push("<div class='msg_sender_name'><a class='senderLinkAnc' data-userid='"+senderId+"' href='javascript:{}'>"+senderName+"</a></div>");
            str.push("<div class='msg_date_time'>"+msgCreatedDate+"</div>");
            str.push("</div>");
            str.push("<div class='msg_body' data-thread-id='"+msg.thread_id+"'>");
            //str.push("<a class='msg_main_body' data-thread-id='"+msg.thread_id+"' href='javascript:{}'>'");
            str.push(msg.body.rich || msg.body.plain);
            if(msg.attachments.length != 0) {

                    str.push(msg.attachments[0].inline_html || msg.attachments[0].comment ||
                        msg.attachments[0].content_excerpt || msg.attachments[0].name) ;

            }
            str.push("</div>");
            str.push("<div class='msg_info'>");
            str.push("<div class='msg_like_number'><i class='material-icons'>thumb_up</i><span>" + msg.liked_by.count + "</span></div>");
            str.push("<div class='msg_replies_number'><i class='material-icons'>comment</i><span>" + 0 + "</span></div>");
            str.push("</div>");
            str.push("</div>");
            str.push("</div>");
        });
        if(isSearch) {
            return str.join('');
        }
        else {
            container.find('div.feed_main').append(str.join(''));
        }
        container.off("click", ".feed_main a.senderLinkAnc").on("click", ".feed_main a.senderLinkAnc", function(){
            var target = $(this),
            userId = target.data("userid"),
            profileObj = new Swarm.Profile();
            $(window).off("scroll");
            profileObj.init(userId);
        });

        container.off("click", ".feed_main .msg_replies_number").on("click", ".feed_main .msg_replies_number", function(){
            var target = $(this),
            msg_main = target.parents(".msg_details_main"),
            temp = [];
            if(msg_main.find('.reply_message').length==0) {
                temp.push('<div class="reply_message mui-form-group">');
                temp.push('<textarea name="message_body" class="mui-form-control" id="reply_body" rows="5" cols="37" autofocus/>');
                temp.push('<button class="post_button mui-btn mui-btn-primary mui-btn-raised mui-btn-flat">Post</button>');
                temp.push("</div>");
                msg_main.append(temp.join(''));
            }
        });

        container.off("click", ".feed_main .reply_message .post_button").on("click", ".feed_main .reply_message .post_button", function(){
            var target = $(this),
            msg_main = target.parents(".msg_main"),
            msgId = msg_main.data("msg-id"),
            reply_text = target.parent().find('textarea').val();
            jQuery.ajax({
                type :"POST",
                beforeSend: function (request)
                {
                    request.setRequestHeader("Authorization", "Bearer "+yammer.getAccessToken());
                },
                url : "https://www.yammer.com/api/v1/messages.json?access_token="+yammer.getAccessToken(),
                data:{
                    "replied_to_id":msgId,
                    "body":reply_text
                },
                dataType: 'json',
                xhrFields: {
                    withCredentials: false
                },
                success : function(data){
                    // show the message thread if the reply is success
                    target.parents(".msg_details_main").find('.msg_body').trigger("click", [true]);
                },
                error : function(){
                    alert("error");
                }
            });

        });

        container.off("click", ".feed_main .msg_like_number").on("click", ".feed_main .msg_like_number", function(){
            var target = $(this),
            msg_main = target.parents(".msg_main"),
            msgId = msg_main.data("msg-id");
            jQuery.ajax({
                type :"POST",
                beforeSend: function (request)
                {
                    request.setRequestHeader("Authorization", "Bearer "+yammer.getAccessToken());
                },
                url : 'https://www.yammer.com/api/v1/messages/liked_by/current.json?message_id='+msgId+'&access_token='+yammer.getAccessToken(),
                data:{
                    "message_id" : msgId
                },
                dataType: 'text',
                xhrFields: {
                    withCredentials: false
                },
                success : function(data){
                    var like_number = parseInt(target.find('span').text());
                    target.find('span').html(like_number+1);

                },
                error : function(){
                    //Swarm.utils.hideLoadingIcon();
                    alert("like error");
                }
            });
        });

        container.off("click", ".feed_main .msg_body").on("click", ".feed_main .msg_body", function(){
            var self = this;
            var target = $(this),
            threadId = target.data("thread-id");
            jQuery.ajax({
                type :"GET",
                url : 'https://www.yammer.com/api/v1/messages/in_thread/'+threadId+'.json?access_token='+yammer.getAccessToken(),
                data:{
                    "limit":10
                },
                dataType: 'json',
                xhrFields: {
                    withCredentials: false
                },
                success : function(data){

                    container.empty();
                    container.slimScroll().off('slimscroll');
                    container.slimScroll().removeData('events');
                    Swarm.utils.hideLoadingIcon();
                    data.messages.reverse();
                    Swarm.utils.buildFeedInfo(data);
                    $('div.msg_main').slice(1).css({'width': '300px','float': 'right',
                                                    'border-left': '3px solid #71a6f6',
                                                    'background': '#f3f5f8'});

                },
                error : function(){
                    Swarm.utils.hideLoadingIcon();
                    alert("error");
            }
        });

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

showProfile: function(data) {
  var self = this,
    container = $("#content");

  data.mugshot_url_template = data.mugshot_url_template.replace("{width}x{height}","100x100"),
  data.active_since = self.getActiveDuration(new Date(data.activated_at.toString()));

  container.empty().html(Handlebars.templates.user_profile(data));
  container.slimScroll().off('slimscroll');
  container.slimScroll().removeData('events');
},

getActiveDuration : function(date){
    var self = this,
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
