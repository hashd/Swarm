Swarm.Analytics = function (){
  var self = this;
};

Swarm.Analytics.prototype = {
	init: function(){
		var self = this;
		$(window).off('scroll');
		Swarm.utils.showLoadingIcon();
		Swarm.api.initCurrentView();
		Swarm.api.pushCurrentView('analytics');
		swarmInstance.getCurrentUserMugshot();
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
        		Swarm.utils.buildFeedInfo(false,data);
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
