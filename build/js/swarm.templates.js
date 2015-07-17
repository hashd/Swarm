this["Swarm"] = this["Swarm"] || {};
this["Swarm"]["templates"] = this["Swarm"]["templates"] || {};
this["Swarm"]["templates"]["network_selection"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.is_primary : depth0),{"name":"if","hash":{},"fn":this.program(2, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"2":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "  <button class=\"mui-btn mui-btn-default mui-btn-flat\" data-mui-toggle=\"dropdown\" data-network-id=\""
    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">"
    + alias3(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"name","hash":{},"data":data}) : helper)))
    + "<span class=\"mui-caret\"></span></button>\n";
},"4":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "    <li><a href=\"#\" data-network-id=\""
    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">"
    + alias3(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"name","hash":{},"data":data}) : helper)))
    + "</a></li>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"mui-dropdown\">\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.networks : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "  <ul class=\"mui-dropdown-menu mui-dropdown-menu-right\">\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.networks : depth0),{"name":"each","hash":{},"fn":this.program(4, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "  </ul>\n</div>\n";
},"useData":true});
this["Swarm"]["templates"]["people"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<div class=\"mui-row mui-panel mui-z2 sw-people-alpha-index\">\n	<span class=\"sw-people-alpha\" value=\"A\">A</span>\n	<span class=\"sw-people-alpha\" value=\"B\">B</span>\n	<span class=\"sw-people-alpha\" value=\"C\">C</span>\n	<span class=\"sw-people-alpha\" value=\"D\">D</span>\n	<span class=\"sw-people-alpha\" value=\"E\">E</span>\n	<span class=\"sw-people-alpha\" value=\"F\">F</span>\n	<span class=\"sw-people-alpha\" value=\"G\">G</span>\n	<span class=\"sw-people-alpha\" value=\"H\">H</span>\n	<span class=\"sw-people-alpha\" value=\"I\">I</span>\n	<span class=\"sw-people-alpha\" value=\"J\">J</span>\n	<span class=\"sw-people-alpha\" value=\"K\">K</span>\n	<span class=\"sw-people-alpha\" value=\"L\">L</span>\n	<span class=\"sw-people-alpha\" value=\"M\">M</span>\n	<span class=\"sw-people-alpha\" value=\"N\">N</span>\n	<span class=\"sw-people-alpha\" value=\"O\">O</span>\n	<span class=\"sw-people-alpha\" value=\"P\">P</span>\n	<span class=\"sw-people-alpha\" value=\"Q\">Q</span>\n	<span class=\"sw-people-alpha\" value=\"R\">R</span>\n	<span class=\"sw-people-alpha\" value=\"S\">S</span>\n	<span class=\"sw-people-alpha\" value=\"T\">T</span>\n	<span class=\"sw-people-alpha\" value=\"U\">U</span>\n	<span class=\"sw-people-alpha\" value=\"V\">V</span>\n	<span class=\"sw-people-alpha\" value=\"W\">W</span>\n	<span class=\"sw-people-alpha\" value=\"X\">X</span>\n	<span class=\"sw-people-alpha\" value=\"Y\">Y</span>\n	<span class=\"sw-people-alpha\" value=\"Z\">Z</span>\n</div>\n<div class=\"mui-row sw-people-content\">\n\n</div>\n";
},"useData":true});
this["Swarm"]["templates"]["persons"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "	<div class=\"mui-col-xs-5 sw-person mui-panel\" data-user-id=\""
    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">\n		<div class=\"sw-person-mugshot\"><img src=\""
    + alias3(((helper = (helper = helpers.mugshot_url_template || (depth0 != null ? depth0.mugshot_url_template : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"mugshot_url_template","hash":{},"data":data}) : helper)))
    + "\" /></div>\n		<div class=\"sw-person-fullname\">"
    + alias3(((helper = (helper = helpers.full_name || (depth0 != null ? depth0.full_name : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"full_name","hash":{},"data":data}) : helper)))
    + "</div>\n	</div>\n";
},"3":function(depth0,helpers,partials,data) {
    return "  <div class=\"mui-col-xs-24 mui-panel sw-no-user-found\">\n    No users found.\n  </div>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"mui-row sw-people\">\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.users : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers.unless.call(depth0,((stack1 = (depth0 != null ? depth0.users : depth0)) != null ? stack1.length : stack1),{"name":"unless","hash":{},"fn":this.program(3, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "</div>\n";
},"useData":true});
this["Swarm"]["templates"]["threadedmessage"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var stack1, alias1=this.lambda, alias2=this.escapeExpression;

  return "  <div class=\"sw-message\">\n    <div class=\"mui-row sw-message-starter\">\n      <div class=\"mui-col-xs-4 sw-user-mugshot\" data-user-id=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.createdby : depth0)) != null ? stack1.id : stack1), depth0))
    + "\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.createdby : depth0)) != null ? stack1.mugshot_url : stack1), depth0))
    + "</div>\n      <div class=\"mui-col-xs-20 sw-message-content\">\n\n      </div>\n    </div>\n  </div>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"mui-panel sw-message-thread\">\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.messages : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "</div>\n";
},"useData":true});
this["Swarm"]["templates"]["user_profile"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "        <div>\n          <div class=\"phoneType\">"
    + alias3(((helper = (helper = helpers.type || (depth0 != null ? depth0.type : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"type","hash":{},"data":data}) : helper)))
    + "</div><div class=\"phoneNumber\">"
    + alias3(((helper = (helper = helpers.number || (depth0 != null ? depth0.number : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"number","hash":{},"data":data}) : helper)))
    + "</div>\n        </div>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression, alias4=this.lambda;

  return "<div class=\"profileInfo_main mui-panel mui-z2\" data-user-id=\""
    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">\n  <div class=\"profile_cell_div\">\n    <div class=\"profileDataDiv profile_pic\"><img src=\""
    + alias3(((helper = (helper = helpers.mugshot_url_template || (depth0 != null ? depth0.mugshot_url_template : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"mugshot_url_template","hash":{},"data":data}) : helper)))
    + "\"></div>\n    <div class=\"profileDataDiv full_name\">"
    + alias3(((helper = (helper = helpers.full_name || (depth0 != null ? depth0.full_name : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"full_name","hash":{},"data":data}) : helper)))
    + "</div>\n    <div class=\"profileDataDiv job_title\">"
    + alias3(((helper = (helper = helpers.job_title || (depth0 != null ? depth0.job_title : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"job_title","hash":{},"data":data}) : helper)))
    + "</div>\n    <div class=\"stats\">\n      <table width=\"100%\">\n        <tbody>\n          <tr>\n            <td width=\"25%\"><div class=\"following\"><img title=\"followers\" src=\"../img/followers.png\"><span class=\"statsVal\"> "
    + alias3(alias4(((stack1 = (depth0 != null ? depth0.stats : depth0)) != null ? stack1.followers : stack1), depth0))
    + "</span></div></td>\n            <td width=\"25%\"><div class=\"followers\"><img title=\"following\" src=\"../img/following.png\"> <span class=\"statsVal\"> "
    + alias3(alias4(((stack1 = (depth0 != null ? depth0.stats : depth0)) != null ? stack1.following : stack1), depth0))
    + "</span></div></td>\n            <td width=\"25%\"><div class=\"updates\"> <img title=\"updates\" src=\"../img/updates.png\"><span class=\"statsVal\"> "
    + alias3(alias4(((stack1 = (depth0 != null ? depth0.stats : depth0)) != null ? stack1.updates : stack1), depth0))
    + "</span></div></td>\n            <td width=\"25%\"><div class=\"hierarchy\"><i class=\"material-icons sw-hierarchy-icon\">people_outline</i></div></td>\n          </tr>\n        </tbody>\n      </table>\n    </div>\n  </div>\n\n  <div class=\"profile_cell_div profile-summary\">\n    <div class=\"profileDataDiv summary\">\n      <div class=\"profileLabeldiv\">Summary </div>\n      <div class=\"profileBreakDiv\"></div>\n      <div class=\"profileValuediv\">"
    + alias3(((helper = (helper = helpers.summary || (depth0 != null ? depth0.summary : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"summary","hash":{},"data":data}) : helper)))
    + "</div>\n    </div>\n    <div class=\"profileDataDiv department\">\n      <div class=\"profileLabeldiv\">Department </div>\n      <div class=\"profileBreakDiv\"></div>\n      <div class=\"profileValuediv\">"
    + alias3(((helper = (helper = helpers.department || (depth0 != null ? depth0.department : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"department","hash":{},"data":data}) : helper)))
    + "</div>\n    </div>\n    <div class=\"profileDataDiv location\">\n      <div class=\"profileLabeldiv\">Location </div>\n      <div class=\"profileBreakDiv\"></div>\n      <div class=\"profileValuediv\">"
    + alias3(((helper = (helper = helpers.location || (depth0 != null ? depth0.location : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"location","hash":{},"data":data}) : helper)))
    + "</div>\n    </div>\n    <div class=\"profileDataDiv birth_date\">\n      <div class=\"profileLabeldiv\">Birthday </div>\n      <div class=\"profileBreakDiv\"></div>\n      <div class=\"profileValuediv\">"
    + alias3(((helper = (helper = helpers.birth_date || (depth0 != null ? depth0.birth_date : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"birth_date","hash":{},"data":data}) : helper)))
    + "</div>\n    </div>\n    <div class=\"profileDataDiv email\">\n      <div class=\"profileLabeldiv\">Email </div>\n      <div class=\"profileBreakDiv\"></div>\n      <div class=\"profileValuediv\">"
    + alias3(((helper = (helper = helpers.email || (depth0 != null ? depth0.email : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"email","hash":{},"data":data}) : helper)))
    + "</div>\n    </div>\n    <div class=\"profileDataDiv phone\">\n      <div class=\"profileLabeldiv\">Phone </div>\n      <div class=\"profileBreakDiv\"></div>\n      <div class=\"profileValuediv\">\n"
    + ((stack1 = helpers.each.call(depth0,((stack1 = (depth0 != null ? depth0.contact : depth0)) != null ? stack1.phone_numbers : stack1),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "      </div>\n    </div>\n    <div class=\"profileDataDiv interests\">\n      <div class=\"profileLabeldiv\">Interests </div>\n      <div class=\"profileBreakDiv\"></div>\n      <div class=\"profileValuediv\">"
    + alias3(((helper = (helper = helpers.interests || (depth0 != null ? depth0.interests : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"interests","hash":{},"data":data}) : helper)))
    + "</div>\n    </div>\n    <div class=\"profileDataDiv expertise\">\n      <div class=\"profileLabeldiv\">Expertise </div>\n      <div class=\"profileBreakDiv\"></div>\n      <div class=\"profileValuediv\">"
    + alias3(((helper = (helper = helpers.expertise || (depth0 != null ? depth0.expertise : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"expertise","hash":{},"data":data}) : helper)))
    + "</div>\n    </div>\n    <div class=\"profileDataDiv active_since\">\n      <div class=\"profileLabeldiv\">Active Since </div>\n      <div class=\"profileBreakDiv\"></div>\n      <div class=\"profileValuediv\">"
    + alias3(((helper = (helper = helpers.active_since || (depth0 != null ? depth0.active_since : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"active_since","hash":{},"data":data}) : helper)))
    + "</div>\n    </div>\n  </div>\n</div>\n";
},"useData":true});