
var AppDispatcher = require('./Dispatcher');
var Constants = require('./Constants');

/** 
 * Responsible for handling the console's communication with the inspected
 * page.
 */
var DocumentBridge = {
  constructor() {
    this.port = chrome.extension.connect();
    this.tabId = chrome.devtools.inspectedWindow.tabId;

    AppDispatcher.register(this.handleAction);

    this.port.onMessage.addListener(function (msg) {
      console.log('Recieved message', msg);
    });
  },

  injectScript() {
    this.port.postMessage({
      action: 'injectScript',
      inspectedTabId: this.tabId
    });
  },

  callSniffer(funcName, callback) {
    let jsMethod = `window._meteorPanel.${funcName}()`;
    chrome.devtools.inspectedWindow.eval(jsMethod, callback);
  },

  addMessageListener(listener) {
    this.port.onMessage.addListener(listener);
  },

  handleAction(action) {
    switch(action.actionType) {
      case Constants.BRIDGE_INJECT_SCRIPT:
        injectScript();
        break;
    }
  }
};
DocumentBridge.constructor();

module.exports = DocumentBridge;
