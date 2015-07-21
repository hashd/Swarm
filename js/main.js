$(document).ready(function() {
 	var container = $("#content");
	jQuery.ajax({
      type :"GET",
      url : "https://www.yammer.com/api/v1/users/current.json?access_token="+yammer.getAccessToken(),
      data:{
        "limit":1
      },
      dataType: 'json',
      xhrFields: {
        withCredentials: false
      },
      success : function(data){
  			Swarm.api = new Swarm.API(yammer.getAccessToken());
  			swarmInstance = new Swarm.Client();
      },
      error : function(){
        	container.empty().html(Swarm.templates.signin_yammer({}));
      }
    });	
  
  	container.off("click", ".signin_button").on("click", ".signin_button", function(){
  		yammer.openAuthorizationCodePopup();
  	});

});
