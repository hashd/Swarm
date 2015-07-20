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

    var confirmation = confirm("This message will be posted to All Company.");
    if(confirmation == true){
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
    }

	});
  },
  addAllCompany : function(){
    $("#slt_groups").prepend("<option value='' selected='selected'>All Company</option>");
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
          
          container.empty().html(Swarm.templates.post_message({ user: data}));
          self.addAllCompany();
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
