Swarm.Search = function (){
  var self = this;
};

Swarm.Search.prototype = {
  init: function(query){
  	var self = this;
    if(query.length > 0){
      container = $("#content"),
      container.empty();
      self.getSearchQueryResults(query);
    }else{
      var feeds = new Swarm.Feeds();
      feeds.init();
    }
  },
  getSearchQueryResults : function(query){
  	var self = this,
    container = $("#content");
    Swarm.utils.showLoadingIcon();
  	jQuery.ajax({
  		type :"GET",
  		url : "https://www.yammer.com/api/v1/search.json?access_token="+yammer.getAccessToken(),
      data:{
        "search":query,
        "page":1,
        "num_per_page":5
      },
  		dataType: 'json',
  		xhrFields: {
  			withCredentials: false
  		},
  		success : function(data){
        Swarm.utils.hideLoadingIcon();
        var str = [];
        container.append('<div class="feed_main"></div>');
        str.push('<ul class="mui-tabs mui-tabs-justified">');
        str.push('<li class="mui-active"><a class="search_messages" data-mui-toggle="tab" data-mui-controls="search_messages">Messages</a></li>');
        str.push('<li><a class="search_users" data-mui-toggle="tab" data-mui-controls="search_users">Users</a></li>');
        str.push('</ul>');
        str.push('<div class="mui-tab-content">');
        str.push('<div class="mui-tab-pane mui-active" id="search_messages">');
        str.push(Swarm.utils.buildFeedInfo(data.messages, true));
        str.push('</div>');  
        str.push('<div class="mui-tab-pane" id="search_users">');
        self.buildUserList(data.users, str);
        str.push('</div>');
        str.push('</div>');
                
        container.find('div.feed_main').append(str.join(''));
        container.slimScroll().off('slimscroll');
        container.slimScroll().removeData('events');
  		},
  		error : function(){
        Swarm.utils.hideLoadingIcon();
  			alert("error");
  		}
  	});
  },
  buildUserList : function(data,str) {

    var container = $("#content");
    $.each(data, function(ind, user){
      
      var senderName = user.full_name,
      senderPicURL = user.mugshot_url,
      senderId = user.id ;
      
      str.push("<div class='msg_main mui-panel mui-z2'>");
      str.push("<div class='msg_sender_pic'><a class='senderLinkAnc' data-userid='"+senderId+"' href='javascript:{}'><img src='"+senderPicURL+"'/></a></div>");
      str.push("<div class='msg_details_main'>");
      str.push("<div class='msg_head'>");
      str.push("<div class='msg_sender_name'><a class='senderLinkAnc' data-userid='"+senderId+"' href='javascript:{}'>"+senderName+"</a></div>");
      str.push("</div>");
      str.push("<div class='msg_body' ");
      str.push("</div>");
      str.push("</div>");
      str.push("</div>");
      str.push("</div>");
    });

    container.off("click", ".msg_sender_name a.senderLinkAnc").on("click", ".msg_sender_name a.senderLinkAnc", function(){
    var target = $(this),
    userId = target.data("userid"),
    profileObj = new Swarm.Profile();
    $(window).off("scroll");
    profileObj.init(userId);
    });
  },

}
