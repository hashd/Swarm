Swarm.utils = {

	showLoadingIcon: function(){
		$("#content").html('<div id="loading-icon"><div class="la-pacman la-lg"><div></div><div></div><div></div><div></div><div></div></div></div>');
	},

	hideLoadingIcon: function(){
		$("#loading-icon").remove();
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
     str.push("<div class='msg_main mui-panel mui-z2' data-msg-id='"+msg.id+"'>");
     str.push("<div class='msg_sender_pic'><a class='senderLinkAnc' data-userid='"+senderId+"' href='javascript:{}'><img src='"+senderPicURL+"'/></a></div>");
     str.push("<div class='msg_details_main'>");
     str.push("<div class='msg_head'>");
     str.push("<div class='msg_sender_name'><a class='senderLinkAnc' data-userid='"+senderId+"' href='javascript:{}'>"+senderName+"</a></div>");
     str.push("<div class='msg_date_time'>"+msgCreatedDate+"</div>");
     str.push("</div>");
     str.push("<div class='msg_body'>");
     str.push(msg.body.rich || msg.body.plain);
     str.push("</div>");
     str.push("<div class='msg_info'>");
     str.push("<div class='msg_like_number'><i class='material-icons'>thumb_up</i><span>" + msg.liked_by.count + "</span></div>");
     str.push("<div class='msg_replies_number'><i class='material-icons'>comment</i><span>" + 0 + "</span></div>");
     str.push("</div>")
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
    str.push('<div class="profileInfo_main mui-panel mui-z2">');
    str.push('<div class="profile_cell_div">');
    str.push('<div class="profileDataDiv profile_pic"><img src="'+profilePic+'"/></div>');
    str.push('<div class="profileDataDiv full_name">'+data.full_name+'</div>');
    str.push('<div class="profileDataDiv job_title">'+self.getEmptyStringIfNull(data.job_title)+'</div>');
    str.push('<div class="stats">');
    str.push('<table width="100%">');
    str.push('<tr>');
    str.push('<td width="33%"><div class="following"><img title="followers" src="../img/followers.png"><span class="statsVal"> '+data.stats.followers+'</span></div></td>');
    str.push('<td width="33%"><div class="followers"><img title="following" src="../img/following.png"> <span class="statsVal"> '+data.stats.following+'</span></div></td>');
    str.push('<td width="33%"><div class="updates"> <img title="updates" src="../img/updates.png"><span class="statsVal"> '+data.stats.updates+'</span></div></td>');
    str.push('</tr>');
    str.push('</table>');
    str.push('</div>');
    str.push('</div>');
    str.push('<div class="profile_cell_div profile-summary">');
    str.push('<div class="profileDataDiv summary"><div class="profileLabeldiv">Summary </div><div class="profileBreakDiv"></div><div class="profileValuediv">'+self.getEmptyStringIfNull(data.summary)+'</div></div>');
    str.push('<div class="profileDataDiv department"><div class="profileLabeldiv">Department </div><div class="profileBreakDiv"></div><div class="profileValuediv">'+self.getEmptyStringIfNull(data.department)+'</div></div>');
    str.push('<div class="profileDataDiv location"><div class="profileLabeldiv">Location </div><div class="profileBreakDiv"></div><div class="profileValuediv">'+self.getEmptyStringIfNull(data.location)+'</div></div>');
    str.push('<div class="profileDataDiv birth_date"><div class="profileLabeldiv">Birthday </div><div class="profileBreakDiv"></div><div class="profileValuediv">'+data.birth_date+'</div></div>')
    str.push('<div class="profileDataDiv email"><div class="profileLabeldiv">Email </div><div class="profileBreakDiv"></div><div class="profileValuediv">'+data.email+'</div></div>');
    str.push('<div class="profileDataDiv phone"><div class="profileLabeldiv">Phone </div><div class="profileBreakDiv"></div><div class="profileValuediv">'+self.getPhoneNumberInfo(data.contact.phone_numbers)+'</div></div>');
    str.push('<div class="profileDataDiv interests"><div class="profileLabeldiv">Interests </div><div class="profileBreakDiv"></div><div class="profileValuediv">'+self.getEmptyStringIfNull(data.interests)+'</div></div>');
    str.push('<div class="profileDataDiv expertise"><div class="profileLabeldiv">Expertise </div><div class="profileBreakDiv"></div><div class="profileValuediv">'+self.getEmptyStringIfNull(data.expertise)+'</div></div>');
    str.push('<div class="profileDataDiv active_since"><div class="profileLabeldiv">Active Since </div><div class="profileBreakDiv"></div><div class="profileValuediv">'+self.getActiveDuration(new Date(data.activated_at.toString()))+' </div></div>');
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
