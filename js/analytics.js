function Analytics(){
  var self = this;
};
Analytics.prototype = {
	init: function(){
		var self = this;
		utils.showLoadingIcon();
	    jQuery.ajax({
			type :"GET",
			url : "https://www.yammer.com/api/v1/users/current.json?access_token="+yammer.getAccessToken()+"&include_group_memberships=true",
			dataType: 'json',
			xhrFields: {
				withCredentials: false
			},
			success : function(data){
				

				$("#content").html('<div id="donut_chart" style="width:350px;height:250px"></div>');
				var groupData = self.generateGroupData(data) 
				self.drawChart(groupData);
				utils.hideLoadingIcon();
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
        	self.buildFeedInfo(data);
  				console.log(data);
  			},
  			error : function(){
  				alert("error");
  			}
  		});
	},
	buildFeedInfo: function(data){
    	var self = this,
        container = $("#content"),
        msgs = data.messages,
        references = data.references,
        str = [];
        var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
      		"Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    	];
    	str.push("<div class='feed_main'>");
    	$.each(msgs, function(ind, msg){
        	var senderArrObj = $.grep(references, function(e){ return e.id == msg.sender_id; }),
        	senderName = (senderArrObj.length > 0) ? senderArrObj[0].full_name : "",
        	senderPicURL = (senderArrObj.length > 0) ? senderArrObj[0].mugshot_url : "",
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
        	str.push("<div class='msg_main'>");
        	str.push("<div class='msg_sender_pic'><img src='"+senderPicURL+"'/></div>");
        	str.push("<div class='msg_details_main'>");
        	str.push("<div class='msg_head'>");
        	str.push("<div class='msg_sender_name'>"+senderName+"</div>");
        	str.push("<div class='msg_date_time'>"+msgCreatedDate+"</div>");
        	str.push("</div>");
        	str.push("<div class='msg_body'>");
        	str.push(msg.body.plain);
        	str.push("</div>");
        	str.push("</div>");
        	str.push("</div>");
    	});
    	str.push("</div>");
    	container.empty().html(str.join(''));
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
			fontfamily : 'PT Sans'
		},

		legend : {
			position: 'right',
			fontfamily : 'PT Sans'
		},

		caption : {
			fontfamily: 'PT Sans'
		},

		subCaption : {
			fontfamily : 'PT Sans'
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