function Profile(){
  var self = this;
};
Profile.prototype = {
  init: function(userId){
  	var self = this;
  	self.getProfileInformation(userId);
  },
  getProfileInformation : function(userId){
  	var self = this;
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
        	utils.showProfile(data);
  			//console.log(data);
  		},
  		error : function(){
  			alert("error");
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
          utils.showProfile(data);
        }
        //console.log(data);
      },
      error : function(){
        alert("error");
      }
    });
  }
}
