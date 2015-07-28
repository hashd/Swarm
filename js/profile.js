Swarm.Profile = function (){
  var self = this;
};

Swarm.Profile.prototype = {
  init: function(userId){
  	var self = this;
    Swarm.api.pushCurrentView('profile');
    Swarm.api.displayBackButton();
    swarmInstance.bindBackButtonEvent();
  	self.getProfileInformation(userId);
  },
  getProfileInformation : function(userId){
  	var self = this;
    $('#content').empty();
    Swarm.utils.showLoadingIcon();
  	jQuery.ajax({
  		type :"GET",
  		url : "https://www.yammer.com/api/v1/users/"+userId+".json?access_token="+yammer.getAccessToken(),
      data:{
        "limit":1
      },
  		dataType: 'json',
  		xhrFields: {
  			withCredentials: false
  		},
  		success : function(data){
        Swarm.utils.hideLoadingIcon();
      	Swarm.utils.showProfile(data);
  			//console.log(data);
  		},
  		error : function(){
        Swarm.utils.hideLoadingIcon();
  			alert("profile error");
  		}
  	});
  },
  getCurrentUserProfileInformation: function (cb) {
    var self = this;
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
        if (cb) {
          cb(data);
        } else {
          Swarm.utils.showProfile(data);
        }
        //console.log(data);
      },
      error : function(){
        alert("error");
      }
    });
  }
}
