function Postmessage(){
  var self = this;
};
Postmessage.prototype = {
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
		//alert(body_message);
		jQuery.ajax({
  		type :"POST",
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