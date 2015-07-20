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
			container.empty().html(Swarm.templates.groups({ groups: data}));
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