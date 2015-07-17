$(document).ready(function() {
  Swarm.api = new Swarm.API(yammer.getAccessToken());
  swarmInstance = new Swarm.Client();
});
