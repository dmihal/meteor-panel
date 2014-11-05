getSnifferScript = function(){
  var injected = function(){
    var _meteor;
    window._meteorCollections = {};
    window._meteorStats = function(){
      result = {};
      result.release = Meteor && Meteor.release;
      result.collections = Object.keys(_meteorCollections);
    }

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

  return "(" + injected.toString() + ")()";
}
