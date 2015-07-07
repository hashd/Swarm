$(document).ready(function() {
    init();
});

function init(){
  $(document).find(".nav-bar i").click(function(event, isFirst){
    var target = $(this),
        jsVal = target.data("jsval"),
        jsValCap = jsVal.replace(/^[a-z]/, function(m){ return m.toUpperCase() });
        jsObj = loadJSObj(jsValCap);
        jsObj.init();

        if (!isFirst) {
          chrome.storage.local.set({'newImagePath': 'yammerlogo_notifier.png'});
          // create alarm for polling new messages every 1 minutes
          chrome.alarms.create('checkNewTasks', {
            when: 1000,
            periodInMinutes: 1
          });
        }
        chrome.browserAction.setIcon({ path: "yammerlogo.png" });
        target.parent().siblings().find('i').removeClass('active');
        target.addClass('active');
    });

    /*$(document).find('input.search').change(function(){
        var target = $(this);
        var searchObj = new Search();
        searchObj.init(target.val());
    });*/

  $(".nav-bar i").first().trigger("click", [true]);
};

function loadJSObj(jsVal){
  var jsObj = "";
  switch (jsVal){
    case "Feeds":
          jsObj = new Feeds();
          break;
    case "Messages":
          jsObj = new Messages();
          break;
    case "Analytics":
          jsObj = new Analytics();
          break;
    case "Postmessage":
          jsObj = new Postmessage();
          break;
  }
  return jsObj;
}
