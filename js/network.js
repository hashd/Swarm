Swarm.Network = function (){
  var self = this;
};

Swarm.Network.prototype = {
  getCurrentNetworkInformation: function (cb) {
    var self = this;
    jQuery.ajax({
      type :"GET",
      url : "https://www.yammer.com/api/v1/networks/current.json?access_token="+yammer.getAccessToken(),
      dataType: 'json',
      xhrFields: {
        withCredentials: false
      },
      success : function(data){
        if (cb) {
          cb(data);
        } else {
          console.log('Network: No access specified.');
        }
      },
      error : function(){
        alert("error");
      }
    });
  }
}
