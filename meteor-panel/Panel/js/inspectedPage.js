inspectedPage = function () {
  var that = this;
  var watchRefresh = function (cb) {
    var port = chrome.extension.connect();
    port.postMessage({
      action: 'register',
      inspectedTabId: chrome.devtools.inspectedWindow.tabId
    });
    port.onMessage.addListener(function(msg) {
      if (msg === 'refresh' && cb) {
        cb();
      }
    });
    port.onDisconnect.addListener(function (a) {
      console.log(a);
    });
  };

  this.onloaded = null;
  var pageLoaded = function(){
    chrome.devtools.inspectedWindow.eval(
      '({hasMeteor: !!window.Meteor, injected: !!window._meteorCollections, collections: Object.keys(window._meteorCollections||{}),'+
        'release: window.Meteor && Meteor.release,'+
        'templates: window.EJSON && EJSON.stringify(' + getTemplateSnifferScript() + ')' +
        ' })',
      function (result, isException) {
        if (isException){
          throw isException.value;
        }
        that.onloaded && that.onloaded(result.hasMeteor, {
          injected: result.injected,
          collections: result.collections,
          release: result.release,
          templates: (result.templates && EJSON.parse(result.templates)) || []
        });
      }
    );
  };
  watchRefresh(pageLoaded);
  pageLoaded();

  this.loadCollection = function(name, callback){
    chrome.devtools.inspectedWindow.eval(
      'EJSON.stringify(window._meteorCollections.' + name + '.find().fetch())',
      function(result, exception){
        if (!exception){
          var collection = EJSON.parse(result);
          callback(collection);
        }
      }
    );
  };
  this.getSessions = function(callback){
    chrome.devtools.inspectedWindow.eval(
      'EJSON.stringify(Session.keys)',
      function(result, exception){
        var session = EJSON.parse(result);
        callback(session);
      }
    );
  };
  this.getUser = function(callback){
    chrome.devtools.inspectedWindow.eval(
      'EJSON.stringify(Meteor.user && Meteor.user())',
      function(result, exception){
        var user = EJSON.parse(result);
        callback(user);
      }
    );
  };
  this.getTemplate = function(name, callback){
    chrome.devtools.inspectedWindow.eval(
      'EJSON.stringify(window._meteorTemplates && window._meteorTemplates.'+name+')',
      function(result, exception){
        var session = EJSON.parse(result);
        callback(session);
      }
    );
  };
  this.getEvents = function(callback){
    chrome.devtools.inspectedWindow.eval(
      'EJSON.stringify(window._meteorEvents)',
      function(result, exception){
        var session = EJSON.parse(result);
        callback(session);
      }
    );
  };


  this.reload = function(script){
    chrome.devtools.inspectedWindow.reload({
      injectedScript : script
    });
  }
}
