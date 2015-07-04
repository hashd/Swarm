var utils = {

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
        	str.push("<div class='msg_main' data-msg-id='"+msg.id+"'>");
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
    	
    	container.find('div.feed_main').empty().append(str.join(''));
  
    	container.off("click", ".feed_main a.senderLinkAnc").on("click", ".feed_main a.senderLinkAnc", function(){
				var target = $(this),
						userId = target.data("userid"),
        		profileObj = new Profile();
        profileObj.init(userId);
    });
  },

  showProfile : function(data){
    var self = this,
    container = $("#content"),
    profile = data,
    profilePic = data.mugshot_url,
    str = [];
    console.log(data);
    str.push('<div class="profile_pic"><img src="'+profilePic+'"/></div>');
    str.push('<div class="full_name">Name '+data.full_name+'</div>');
    str.push('<div class="birth_date">Birth Date '+data.birth_date+'</div>')
    str.push('<div class="job_title">Job Title '+data.job_title+'</div>');
    str.push('<div class="department">Department '+data.department+'</div>');
    str.push('<div class="email">Email '+data.email+'</div>');
    str.push('<div class="phone">Phone </div>');
    str.push('<div class="active_since">Active Since '+self.getDaysBetween(new Date(data.activated_at.toString()))+'Days </div>');
    str.push('<div class="stats">');
    str.push('<div class="following">Following '+data.stats.followers+'</div>');
    str.push('<div class="followers">Followers '+data.stats.following+'</div>');
    str.push('<div class="updates"> Updates '+data.stats.updates+'</div>');
    str.push('</div>');

    container.empty().html(str.join(''));
  },

  getDaysBetween : function(date){
    var oneDay = 24*60*60*1000, // hours * minutes * seconds * milliseconds
    firstDate = date,
    secondDate = new Date();

    var diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));
    return diffDays;
  }
}
