$(document).ready(function() {
    init();
    loadCurrentUserMugshot();
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

  $('#content').enscroll({
    showOnHover: true,
    verticalTrackClass: 'track3',
    verticalHandleClass: 'handle3'
  });
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

function loadCurrentUserMugshot() {
  new Profile().getCurrentUserProfileInformation(function (data) {
    $('.header .current-mugshot').html($('<img />').attr('src', data.mugshot_url_template.replace("{width}x{height}","100x100")).height('34px')
      .on('click', function () {
        new Profile().getCurrentUserProfileInformation();
      }));
  });
}
