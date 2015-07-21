this["Swarm"] = this["Swarm"] || {};
this["Swarm"]["templates"] = this["Swarm"]["templates"] || {};
this["Swarm"]["templates"]["groups"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<option value=\""
    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + "\"\">"
    + alias3(((helper = (helper = helpers.full_name || (depth0 != null ? depth0.full_name : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"full_name","hash":{},"data":data}) : helper)))
    + "</option>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"mui-form-group group_list\"\n<label>Groups</label>\n<div class=\"mui-select\">\n<select name=\"groups\" id=\"slt_groups\">\n"
    + ((stack1 = helpers.each.call(depth0,((stack1 = (depth0 != null ? depth0.groups : depth0)) != null ? stack1.group_memberships : stack1),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "</select>\n</div>\n</div>";
},"useData":true});
this["Swarm"]["templates"]["network_feed"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<ul class=\"mui-tabs sw-network-feed-tabs mui-tabs-justified mui-z3\">\n  <li class=\"mui-active\"><a data-mui-toggle=\"tab\" data-mui-controls=\"network-feed-all\">All</a></li>\n  <li><a data-mui-toggle=\"tab\" data-mui-controls=\"network-feed-top\">Top</a></li>\n  <li><a data-mui-toggle=\"tab\" data-mui-controls=\"network-feed-following\">Following</a></li>\n</ul>\n<div class=\"mui-tab-content\">\n  <div class=\"mui-tab-pane mui-active network-feed\" id=\"network-feed-all\"></div>\n  <div class=\"mui-tab-pane network-feed\" id=\"network-feed-top\"></div>\n  <div class=\"mui-tab-pane network-feed\" id=\"network-feed-following\"></div>\n</div>\n<div>\n	<button class=\"mui-z3 mui-btn mui-btn-floating mui-btn-floating-mini post-btn\">\n		<i class=\"material-icons\">add</i>\n	</button>\n</div>\n";
},"useData":true});
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
this["Swarm"]["templates"]["notifications"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<div class='msg_main mui-panel mui-z2'>\n<div class='msg_sender_pic'>\n<a class='senderLinkAnc' data-user-id=\""
    + alias3(((helper = (helper = helpers.userId || (depth0 != null ? depth0.userId : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"userId","hash":{},"data":data}) : helper)))
    + "\" href='javascript:{}'>\n<img src=\""
    + alias3(((helper = (helper = helpers.itemUrl || (depth0 != null ? depth0.itemUrl : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"itemUrl","hash":{},"data":data}) : helper)))
    + "\"/>\n</a>\n</div>\n<div class='msg_details_main'>\n<div class='msg_head'>\n<div class='msg_sender_name'>\n<a class='senderLinkAnc' data-user-id=\""
    + alias3(((helper = (helper = helpers.userId || (depth0 != null ? depth0.userId : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"userId","hash":{},"data":data}) : helper)))
    + "\" href='javascript:{}'>"
    + alias3(((helper = (helper = helpers.userName || (depth0 != null ? depth0.userName : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"userName","hash":{},"data":data}) : helper)))
    + "</a></div>\n<div class='msg_date_time'>"
    + alias3(((helper = (helper = helpers.createdDate || (depth0 != null ? depth0.createdDate : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"createdDate","hash":{},"data":data}) : helper)))
    + "</div>\n</div>\n<div class='msg_body'>"
    + alias3(((helper = (helper = helpers.msg_body || (depth0 != null ? depth0.msg_body : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"msg_body","hash":{},"data":data}) : helper)))
    + "</div>\n</div>\n</div>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.items : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "");
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
    return "  <div class=\"mui-col-xs-24 mui-panel sw-no-user-found\">\n    You have reached the end.\n  </div>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"mui-row sw-people\">\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.users : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers.unless.call(depth0,((stack1 = (depth0 != null ? depth0.users : depth0)) != null ? stack1.length : stack1),{"name":"unless","hash":{},"fn":this.program(3, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "</div>\n";
},"useData":true});
this["Swarm"]["templates"]["post_message"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<option value=\""
    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">"
    + alias3(((helper = (helper = helpers.full_name || (depth0 != null ? depth0.full_name : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"full_name","hash":{},"data":data}) : helper)))
    + "</option>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return "<div class='post_form mui-panel mui-z2'>\n<form>\n<div class=\"mui-form-group\">\n<label>Groups</label>\n<div class=\"mui-select\">\n<select name=\"groups\" id=\"slt_groups\">\n"
    + ((stack1 = helpers.each.call(depth0,((stack1 = (depth0 != null ? depth0.user : depth0)) != null ? stack1.group_memberships : stack1),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "</select>\n</div>\n</div>\n<div class=\"mui-form-group\">\n<textarea name=\"message_body\" class=\"mui-form-control\" id=\"message_body\" rows=\"10\" cols=\"37\"/>\n<label class=\"mui-form-floating-label\">Write Message Here</label>\n</div>\n<input class=\"post_button mui-btn mui-btn-primary mui-btn-raised mui-btn-flat\" type=\"submit\" ></input>\n</form>\n</div>";
},"useData":true});
this["Swarm"]["templates"]["reply_message"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<div class=\"reply_message mui-form-group\">\n<textarea name=\"message_body\" class=\"mui-form-control\" id=\"reply_body\" rows=\"5\" cols=\"37\" autofocus/>\n<button class=\"post_button mui-btn mui-btn-primary mui-btn-raised mui-btn-flat\">Post</button>\n</div>";
},"useData":true});
this["Swarm"]["templates"]["search"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<ul class=\"mui-tabs mui-tabs-justified\">\n<li class=\"mui-active\">\n<a class=\"search_messages\" data-mui-toggle=\"tab\" data-mui-controls=\"search_messages\">Messages</a>\n</li>\n<li>\n<a class=\"search_users\" data-mui-toggle=\"tab\" data-mui-controls=\"search_users\">Users</a>\n</li>\n</ul>\n<div class=\"mui-tab-content\">\n<div class=\"mui-tab-pane mui-active\" id=\"search_messages\"></div>\n<div class=\"mui-tab-pane\" id=\"search_users\"></div>\n</div>";
},"useData":true});
this["Swarm"]["templates"]["share_message"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<option value=\""
    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + "\"\">"
    + alias3(((helper = (helper = helpers.full_name || (depth0 != null ? depth0.full_name : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"full_name","hash":{},"data":data}) : helper)))
    + "</option>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"reply_message mui-form-group\">\n<div class=\"mui-select\">\n<select name=\"groups\" id=\"slt_groups\">\n"
    + ((stack1 = helpers.each.call(depth0,((stack1 = (depth0 != null ? depth0.groups : depth0)) != null ? stack1.group_memberships : stack1),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "</select>\n</div>\n<textarea name=\"message_body\" class=\"mui-form-control\" id=\"reply_body\" rows=\"5\" cols=\"37\" autofocus/>\n<button class=\"share_button mui-btn mui-btn-primary mui-btn-raised mui-btn-flat\">Share</button>\n</div>";
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
this["Swarm"]["templates"]["threads"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression, alias4=this.lambda;

  return "<div class='msg_main msg_thread_main mui-panel mui-z2' data-msg-id='"
    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + "' data-thread-id=\""
    + alias3(((helper = (helper = helpers.thread_id || (depth0 != null ? depth0.thread_id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"thread_id","hash":{},"data":data}) : helper)))
    + "\">\n	<div class='msg_meta'>\n		<div class='msg_group_title'>"
    + alias3(alias4(((stack1 = (depth0 != null ? depth0.group : depth0)) != null ? stack1.full_name : stack1), depth0))
    + "</div>\n	</div>\n	<div>\n		<div class='msg_sender_pic'>\n			<a class='senderLinkAnc' data-user-id='"
    + alias3(alias4(((stack1 = (depth0 != null ? depth0.sender : depth0)) != null ? stack1.id : stack1), depth0))
    + "' href=\"javascript:{}\">\n				<img src='"
    + alias3(alias4(((stack1 = (depth0 != null ? depth0.sender : depth0)) != null ? stack1.mugshot_url : stack1), depth0))
    + "' />\n			</a>\n		</div>\n		<div class='msg_details_main'>\n			<div class='msg_head'>\n				<div class=\"msg_sender_name\">\n					<a class='senderLinkAnc' data-user-id='"
    + alias3(alias4(((stack1 = (depth0 != null ? depth0.sender : depth0)) != null ? stack1.id : stack1), depth0))
    + "' href=\"javascript:{}\">"
    + alias3(alias4(((stack1 = (depth0 != null ? depth0.sender : depth0)) != null ? stack1.full_name : stack1), depth0))
    + "</a>\n				</div>\n				<div class=\"msg_date_time\">"
    + alias3(((helper = (helper = helpers.createdDate || (depth0 != null ? depth0.createdDate : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"createdDate","hash":{},"data":data}) : helper)))
    + "</div>\n			</div>\n			<div class='msg_body' data-thread-id='"
    + alias3(((helper = (helper = helpers.thread_id || (depth0 != null ? depth0.thread_id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"thread_id","hash":{},"data":data}) : helper)))
    + "'>\n				"
    + ((stack1 = ((helper = (helper = helpers.mainBody || (depth0 != null ? depth0.mainBody : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"mainBody","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\n				"
    + ((stack1 = ((helper = (helper = helpers.mainAttachment || (depth0 != null ? depth0.mainAttachment : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"mainAttachment","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\n			</div>\n			<div class=\"msg_actions\">\n				<span class=\"msg_like\">"
    + alias3(((helper = (helper = helpers.like_text || (depth0 != null ? depth0.like_text : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"like_text","hash":{},"data":data}) : helper)))
    + " ("
    + alias3(alias4(((stack1 = (depth0 != null ? depth0.liked_by : depth0)) != null ? stack1.count : stack1), depth0))
    + ")</span>\n				<span class=\"msg_reply\">Reply ("
    + alias3(alias4(((stack1 = ((stack1 = (depth0 != null ? depth0.threadInfo : depth0)) != null ? stack1.stats : stack1)) != null ? stack1.updates : stack1), depth0))
    + ")</span>\n				<span class=\"msg_share\">Share ("
    + alias3(alias4(((stack1 = ((stack1 = (depth0 != null ? depth0.threadInfo : depth0)) != null ? stack1.stats : stack1)) != null ? stack1.shares : stack1), depth0))
    + ")</span>\n			</div>\n			<div class='msg_info'>\n"
    + ((stack1 = helpers['if'].call(depth0,((stack1 = (depth0 != null ? depth0.liked_by : depth0)) != null ? stack1.count : stack1),{"name":"if","hash":{},"fn":this.program(2, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "			</div>\n			<div class=\"msg_extended\" style=\"padding: 2px 8px;\">\n"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.remainingMessages : depth0),{"name":"if","hash":{},"fn":this.program(9, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.extendedThread : depth0),{"name":"each","hash":{},"fn":this.program(11, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "			</div>\n		</div>\n	</div>\n</div>\n";
},"2":function(depth0,helpers,partials,data) {
    var stack1;

  return "				<div class='msg_likes'>\n"
    + ((stack1 = helpers.each.call(depth0,((stack1 = (depth0 != null ? depth0.likedBy : depth0)) != null ? stack1.names : stack1),{"name":"each","hash":{},"fn":this.program(3, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "					"
    + ((stack1 = helpers['if'].call(depth0,((stack1 = (depth0 != null ? depth0.likedBy : depth0)) != null ? stack1.count : stack1),{"name":"if","hash":{},"fn":this.program(5, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\n					"
    + ((stack1 = helpers.unless.call(depth0,((stack1 = (depth0 != null ? depth0.likedBy : depth0)) != null ? stack1.count : stack1),{"name":"unless","hash":{},"fn":this.program(7, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\n				</div>\n";
},"3":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "						<span class=\"msg_liked_by\" data-user-id=\""
    + alias3(((helper = (helper = helpers.user_id || (depth0 != null ? depth0.user_id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"user_id","hash":{},"data":data}) : helper)))
    + "\">"
    + alias3(((helper = (helper = helpers.full_name || (depth0 != null ? depth0.full_name : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"full_name","hash":{},"data":data}) : helper)))
    + "</span>\n";
},"5":function(depth0,helpers,partials,data) {
    var stack1;

  return " and "
    + this.escapeExpression(this.lambda(((stack1 = (depth0 != null ? depth0.likedBy : depth0)) != null ? stack1.count : stack1), depth0))
    + " like this.";
},"7":function(depth0,helpers,partials,data) {
    return " likes this.";
},"9":function(depth0,helpers,partials,data) {
    return "				<div class=\"msg_extended_actions\">\n					<span class=\"msg_thread_view\">More messages</span>\n				</div>\n";
},"11":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression, alias4=this.lambda;

  return "				<div class='msg_main' data-msg-id='"
    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + "'>\n					<div>\n						<div class='msg_sender_pic'>\n							<a class='senderLinkAnc' data-user-id='"
    + alias3(alias4(((stack1 = (depth0 != null ? depth0.sender : depth0)) != null ? stack1.id : stack1), depth0))
    + "' href=\"javascript:{}\">\n								<img src='"
    + alias3(alias4(((stack1 = (depth0 != null ? depth0.sender : depth0)) != null ? stack1.mugshot_url : stack1), depth0))
    + "' />\n							</a>\n						</div>\n						<div class='msg_details_main'>\n							<div class='msg_head'>\n								<div class=\"msg_sender_name\">\n									<a class='senderLinkAnc' data-user-id='"
    + alias3(alias4(((stack1 = (depth0 != null ? depth0.sender : depth0)) != null ? stack1.id : stack1), depth0))
    + "' href=\"javascript:{}\">"
    + alias3(alias4(((stack1 = (depth0 != null ? depth0.sender : depth0)) != null ? stack1.full_name : stack1), depth0))
    + "</a>\n								</div>\n								<div class=\"msg_date_time\">"
    + alias3(((helper = (helper = helpers.createdDate || (depth0 != null ? depth0.createdDate : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"createdDate","hash":{},"data":data}) : helper)))
    + "</div>\n							</div>\n							<div class='msg_body' data-thread-id='"
    + alias3(((helper = (helper = helpers.thread_id || (depth0 != null ? depth0.thread_id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"thread_id","hash":{},"data":data}) : helper)))
    + "'>\n								"
    + ((stack1 = ((helper = (helper = helpers.mainBody || (depth0 != null ? depth0.mainBody : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"mainBody","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\n								"
    + ((stack1 = ((helper = (helper = helpers.mainAttachment || (depth0 != null ? depth0.mainAttachment : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"mainAttachment","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\n							</div>\n							<div class=\"msg_actions\">\n								<span class=\"msg_like\">"
    + alias3(((helper = (helper = helpers.like_text || (depth0 != null ? depth0.like_text : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"like_text","hash":{},"data":data}) : helper)))
    + " ("
    + alias3(alias4(((stack1 = (depth0 != null ? depth0.liked_by : depth0)) != null ? stack1.count : stack1), depth0))
    + ")</span>\n							</div>\n							<div class='msg_info'>\n"
    + ((stack1 = helpers['if'].call(depth0,((stack1 = (depth0 != null ? depth0.liked_by : depth0)) != null ? stack1.count : stack1),{"name":"if","hash":{},"fn":this.program(12, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "							</div>\n						</div>\n					</div>\n				</div>\n";
},"12":function(depth0,helpers,partials,data) {
    var stack1;

  return "								<div class='msg_likes'>\n"
    + ((stack1 = helpers.each.call(depth0,((stack1 = (depth0 != null ? depth0.likedBy : depth0)) != null ? stack1.names : stack1),{"name":"each","hash":{},"fn":this.program(13, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "									"
    + ((stack1 = helpers['if'].call(depth0,((stack1 = (depth0 != null ? depth0.likedBy : depth0)) != null ? stack1.count : stack1),{"name":"if","hash":{},"fn":this.program(5, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\n									"
    + ((stack1 = helpers.unless.call(depth0,((stack1 = (depth0 != null ? depth0.likedBy : depth0)) != null ? stack1.count : stack1),{"name":"unless","hash":{},"fn":this.program(7, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\n								</div>\n";
},"13":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "										<span class=\"msg_liked_by\" data-user-id=\""
    + alias3(((helper = (helper = helpers.user_id || (depth0 != null ? depth0.user_id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"user_id","hash":{},"data":data}) : helper)))
    + "\">"
    + alias3(((helper = (helper = helpers.full_name || (depth0 != null ? depth0.full_name : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"full_name","hash":{},"data":data}) : helper)))
    + "</span>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.messages : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "");
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
this["Swarm"]["templates"]["users_list"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<div class='msg_main mui-panel mui-z2'>\n<div class='msg_sender_pic'>\n<a class='senderLinkAnc' data-user-id=\""
    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" href='javascript:{}'>\n<img src=\""
    + alias3(((helper = (helper = helpers.mugshot_url || (depth0 != null ? depth0.mugshot_url : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"mugshot_url","hash":{},"data":data}) : helper)))
    + "\"/>\n</a>\n</div>\n<div class='msg_details_main'>\n<div class='msg_head'>\n<div class='msg_sender_name'>\n<a class='senderLinkAnc' data-user-id=\""
    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" href='javascript:{}'>"
    + alias3(((helper = (helper = helpers.full_name || (depth0 != null ? depth0.full_name : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"full_name","hash":{},"data":data}) : helper)))
    + "</a>\n</div>\n</div>\n<div class='msg_body'>\n</div>\n</div>\n</div>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.user : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"useData":true});