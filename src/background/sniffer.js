window._meteorPanel = (function(){
  let sendMessage = function(message){
    let customEvent = new CustomEvent('MeteorPanelMessage', {detail: message});
    document.dispatchEvent(customEvent);
  };

  let docLoaded = (document.readyState === "complete");
  if (!docLoaded) {
    document.addEventListener('DOMContentLoaded', function(){
      sendMessage({action: 'documentLoaded'});
    });
  } else {
    sendMessage({action: 'documentLoaded'});
  }

  return {
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
