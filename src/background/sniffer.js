(function(){
  let sendMessage = function(message){
    let customEvent = new CustomEvent('MeteorPanelMessage', {detail: message});
    document.dispatchEvent(customEvent);
  };
  sendMessage({action: 'documentLoaded'});
})();
