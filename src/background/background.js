// notify of page refreshes
let ports = [];
let broadcast = function(msg) {
  ports.forEach(function(port){
    port.postMessage(msg);
  });
};
chrome.extension.onConnect.addListener(function(port) {
  ports.push(port);

  port.onMessage.addListener(function (msg) {
    if (actions[msg.action]){
      actions[msg.action](msg, port);
    } else {
      broadcast(msg);
    }
  });
});
var actions = {
  listenForReload(msg, port) {
    var respond = function (tabId, changeInfo, tab) {
      if (tabId !== msg.inspectedTabId) {
        return;
      }
      port.postMessage('refresh');
    };

    chrome.tabs.onUpdated.addListener(respond);
    port.onDisconnect.addListener(function () {
      chrome.tabs.onUpdated.removeListener(respond);
    });
  },
  injectScript(msg, port) {
    chrome.tabs.executeScript(msg.inspectedTabId, {
      file: 'background/content-script.js',
      runAt: 'document_start'
    });
  }
};
