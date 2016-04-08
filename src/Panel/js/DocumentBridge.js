
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
    // Only inject if the script hasn't been injected yet.
    this.isInjected(isInjected =>{
      if (!isInjected) {
        this.port.postMessage({
          action: 'injectScript',
          inspectedTabId: this.tabId
        });
      }
    })
  },

  /**
   * Check if ths sniffer script has been injected into the inspected page.
   * @param callback {function} Callback that accepts a boolean argument
   */
  isInjected(callback) {
    chrome.devtools.inspectedWindow.eval("!!window._meteorPanel", callback);
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
