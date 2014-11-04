(function () {

  // This will run once on panel page load, which is basically
  // whenever you open the dev tools.
  //
  // How do we find out when the inspected page changes?
  //
  // If we want to keep state across closing the dev tools,
  // there are definitely mechanisms for that, like
  // "background pages."

  chrome.devtools.inspectedWindow.eval(
    '({release: Meteor.release})',
    function (result, isException) {
      if (result.release){
        document.body.appendChild(document.createTextNode(
          'Meteor.release = ' + result.release));
      } else {
        document.body.appendChild(document.createTextNode("This page does not use Meteor"));
      }
    });


  var injected = function(){
    var _meteor;
    window._meteorCollections = {};
    // Function that does subclassing
    var __extends = function(child, parent) {
      for (var key in parent) {
        if (Object.prototype.hasOwnProperty.call(parent, key)) {
          child[key] = parent[key];
        }
      }
      function ctor() { this.constructor = child; }
      ctor.prototype = parent.prototype;
      child.prototype = new ctor;
      child.__super__ = parent.prototype;
      return child;
    };
    var __watch = function(name, callback) {
      var obj = {};
      Object.defineProperty(window, name, {
        get: function () { return obj; },
        set: function (val) {
          obj = val;
          callback(obj);
        }
      });
    };

    var initializeMeteor = function(){
      var MyCollection = function(name, options){
        MyCollection.__super__.constructor.apply(this, arguments);
        console.log('collection',arguments,this);
        _meteorCollections[name] = this;
      };
      __extends(MyCollection, Meteor.Collection);
      Meteor.Collection = MyCollection;

    };
    __watch("Meteor", initializeMeteor);
    
  };

  var inject = function()
  {
    chrome.devtools.inspectedWindow.reload({
      injectedScript : "(" + injected.toString() + ")()"
    });
  }
  document.getElementById('reload').addEventListener('click', inject);

})();
