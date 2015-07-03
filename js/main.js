

$(document).ready(function() {
    init();
});

function init(){
  $(document).find("div#hamburgermenu a.listAnc").click(function(){
    var target = $(this),
        jsVal = target.data("jsval"),
        jsValCap = jsVal.replace(/^[a-z]/, function(m){ return m.toUpperCase() });
        jsObj = loadJSObj(jsValCap);
        jsObj.init();
        $("a.menubtn").trigger("click");
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
  }
  return jsObj;
}
