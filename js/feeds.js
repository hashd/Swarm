function Feeds(){
  var self = this;
};
Feeds.prototype = {
  init: function(){
    var self = this;
    self.getFeeds();
  },
  getFeeds: function(){
      var self = this;
      jQuery.ajax({
  		type :"GET",
  		url : "https://www.yammer.com/api/v1/messages.json?access_token="+yammer.getAccessToken(),
      data:{
        "limit":5
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
    str.push("<div class='feed_main'>");
    $.each(msgs, function(ind, msg){
        var senderArrObj = $.grep(references, function(e){ return e.id == msg.sender_id; }),
            senderName = (senderArrObj.length > 0) ? senderArrObj[0].full_name : "";
        str.push("<div class='msg_main'>");
        str.push("<div class='msg_head'>");
        str.push("<div class='msg_sender_name'>"+senderName+"</div>");
        str.push("<div class='msg_date_time'>"+msg.created_at+"</div>");
        str.push("</div>");
        str.push("<div class='msg_body'>");
        str.push(msg.body.plain);
        str.push("</div>");
        str.push("</div>");
    });
    str.push("</div>");
    container.empty().html(str.join(''));
  },
}
