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