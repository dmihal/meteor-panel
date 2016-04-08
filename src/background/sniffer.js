window._meteorPanel = (function(){
  let sendMessage = function(message){
    let customEvent = new CustomEvent('MeteorPanelMessage', {detail: message});
    document.dispatchEvent(customEvent);
  };

  // A page is "dirty" if meteor is already loaded before the sniffer runs.
  // Sniffing collections can't be setup if the page is already dirty.
  let dirty = false;

  let docLoaded = (document.readyState === "complete");
  if (!docLoaded) {
    document.addEventListener('DOMContentLoaded', function(){
      sendMessage({action: 'documentLoaded'});
      docLoaded = true;
    });
  } else {
    dirty = true;
    sendMessage({action: 'documentLoaded'});
  }

  return {
    getStatus() {
      if (!window.Meteor) {
        return {
          loaded: docLoaded,
          meteor: false,
        }
      }
      return {
        loaded: docLoaded,
        meteor: true,
        dirty,
        version: Meteor.release,
        packages: Object.getOwnPropertyNames(Package),
      }
    },
    getTemplates() {
      let templates = [];
      for (var templateName in Template) {
        let template = Template[templateName];
        if (!(template instanceof Blaze.Template)) {
          continue;
        }
        let isPrivate = templateName.charAt(0) === '_';

        templates.push({
          name: templateName,
          private: isPrivate
        });
      }
      return templates;
    }
  };
})();
