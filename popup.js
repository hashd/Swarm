/*
 * Copyright 2011 Google Inc. All Rights Reserved.

 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var yammer = new OAuth2('yammer', {
  client_id: '4U9LMyxNql8uwVusWytHfw',
  client_secret: '3wGDnQpuz6Auu3ZHHXYxUMmD8W6NrxoCsXLLfaxdZg'
});

yammer.authorize(function() {

  var TASK_CREATE_URL = 'https://www.yammer.com/api/v1/users/current.json?access_token='+yammer.getAccessToken();

  var form = document.getElementById('form');
  var success = document.getElementById('success');

  // Hook up the form to create a new task with Google Tasks
  form.addEventListener('submit', function(event) {
    event.preventDefault();
    var input = document.getElementById('input');
    createTodo(input.value);
  });

  function createTodo(task) {
    // Make an XHR that creates the task
    var xhr = new XMLHttpRequest();
    jQuery.ajax({
		type :"GET",
		url : "https://www.yammer.com/api/v1/users/current.json?access_token="+yammer.getAccessToken(),
		dataType: 'json',
		xhrFields: {
			withCredentials: false
		},
		success : function(data){
			alert(data.full_name);

		},
		error : function(){
			alert("error");
		}
	});
  }

});
