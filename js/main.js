$(document).ready(function() {
    init();
    loadCurrentUserMugshot();
    getCurrentNetwork();
});

function init(){
  $(document).find(".nav-bar i").click(function(event, isFirst){
    var target = $(this),
        jsVal = target.data("jsval"),
        jsValCap = jsVal.replace(/^[a-z]/, function(m){ return m.toUpperCase() });
        jsObj = loadJSObj(jsValCap);
        jsObj.init();

        if (!isFirst) {
          chrome.storage.local.set({'newImagePath': '/img/yammerlogo_notifier.png'});
          // create alarm for polling new messages every 1 minutes
          chrome.alarms.create('checkNewTasks', {
            when: 1000,
            periodInMinutes: 1
          });
        }
        chrome.browserAction.setIcon({ path: "/img/yammerlogo.png" });
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
    case "Activityfeed":
          jsObj = new Activityfeed();
          break;
    case "Notifications":
          jsObj = new Notifications();
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

function getCurrentNetwork() {
  new Network().getCurrentNetworkInformation(function (data) {
    data.push({ id: 10001, name: 'Imaginea' });
    data.push({ id: 10002, name: 'Wavemaker' });

    var select = $('.header .left-pane').html($('<div class="mui-dropdown" />')).find('.mui-dropdown');
    select.append($('<button class="mui-btn mui-btn-accent mui-btn-raised" data-mui-toggle="dropdown" />').append($('<span class="mui-caret" />')));
    select.append($('<ul class="mui-dropdown-menu" />'));
    for (var i = 0, length = data.length; i < length; i++) {
      select.find('.mui-dropdown-menu').append($('<li />').append($('<a />').attr('href', '#').data('networkId', data[i].id).html(data[i].name)));
      if (data[i].is_primary === true) {
        select.find('.mui-btn').remove();
        select.prepend($('<button class="mui-btn mui-btn-accent mui-btn-raised" data-mui-toggle="dropdown" />').html(data[i].name).append($('<span class="mui-caret" />')));
      }
    }
  });
}
