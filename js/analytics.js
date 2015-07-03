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
				

				$("#content").html('<div id="donut_chart" style="width:300px;height:200px"></div>')
				self.drawChart(data);
				//self.generateGroupChart(data);
				utils.hideLoadingIcon();

			},
			error : function(){
				alert("error");
			}
		});
	},

	generateGroupChart : function(data){
		$.each(data.group_memberships, function(i, val){


		});
	},

	constructGroupData: function(groupObj){
		var groupId = groupObj.id;
		var groupName = groupObj.full_name;

	},

	drawChart: function(data){
		var github_lang_config = {

	 	graph : {
			bgcolor: 'none',
			custompalette : ['#A6CEE3','#1F78B4','#B2DF8A','#33A02C','#FB9A99','#E31A1C','#FDBF6F','#FF7F00','#CAB2D6','#6A3D9A']
		},

		dimension : {
			width : 250,
			height : 150
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
			left : -10,
			right : 60
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
	 	categories : ['language'],
		dataset : {
			'language' : [
				{name: 'Ruby', value: 12 },
				{name: 'javascript', value: 21 },
				{name: 'Java', value: 8 },
				{name: 'Shell', value: 8 },
				{name: 'Python', value: 8 },
				{name: 'PHP', value: 7 },
				{name: 'C', value: 6 },
				{name: 'C++', value: 5 },
				{name: 'Perl', value: 4 },
				{name: 'CoffeeScript', value: 3 }
			]
		}
	 };

	github_lang_config.meta.position = '#donut_chart';
	uv.chart('Pie', github_lang_data, github_lang_config);

	}	
}
