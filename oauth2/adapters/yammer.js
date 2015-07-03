OAuth2.adapter('yammer', {
  authorizationCodeURL: function(config) {
    return ('https://www.yammer.com/oauth2/authorize?' +
      'client_id={{CLIENT_ID}}&' +
      'redirect_uri={{REDIRECT_URI}}&' +
      'response_type=code')
        .replace('{{CLIENT_ID}}', '4U9LMyxNql8uwVusWytHfw')
        .replace('{{REDIRECT_URI}}', this.redirectURL(config));
  },

  redirectURL: function(config) {
    return 'https://www.yammer.com/robots.txt';
  },

  parseAuthorizationCode: function(url) {
    var error = url.match(/[&\?]error=([^&]+)/);
    if (error) {
      throw 'Error getting authorization code: ' + error[1];
    }
    return url.match(/[&\?]code=([\w\/\-]+)/)[1];
  },

  accessTokenURL: function() {
    return 'https://www.yammer.com/oauth2/access_token';
  },

  accessTokenMethod: function() {
    return 'POST';
  },

  accessTokenParams: function(authorizationCode, config) {
    return {
      code: authorizationCode,
      client_id: config.clientId,
      client_secret: config.clientSecret,
      grant_type: 'authorization_code'
    };
  },

  parseAccessToken: function(response) {
    var parsedResponse = JSON.parse(response);
    return {
      accessToken: parsedResponse.access_token.token
      //refreshToken: parsedResponse.refresh_token,
      //expiresIn: parsedResponse.expires_in
    };
  }
});
