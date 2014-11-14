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

    var initializeMeteor = function(obj){
      var MyCollection = function(name, options){
        MyCollection.__super__.constructor.apply(this, arguments);
        console.log('collection',arguments,this);
        _meteorCollections[name] = this;
      };
      __extends(MyCollection, obj.Collection);
      obj.Collection = MyCollection;

      if (obj.users) {
        _meteorCollections.users = obj.users;
      }
    };
    __watch("Meteor", initializeMeteor);
    __watch("Mongo", initializeMeteor);
    
  };

  return "(" + injected.toString() + ")()";
};

getTemplateSnifferScript = function(){
  var injected = function(){
    window._meteorTemplates = {};

    Object.keys(window.Template || {}).forEach(function(name) {
      var template = Template[name];
      if ((template.kind && template.kind.indexOf('Template_') == 0) ||
          (template.viewName && template.viewName.indexOf('Template.') == 0)){
        _meteorTemplates[name] = {
          helpers:[],
          events: template._events && template._events.map(function(obj){
            return obj.events + ' ' + obj.selector;
          }) || [],
          hidden: name.indexOf('_') == 0,
          instances:[]
        };
      }
    });

    return _meteorTemplates;
  };

  return "(" + injected.toString() + ")()";
};
