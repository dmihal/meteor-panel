var DocumentBridge = require('../DocumentBridge');
var EventEmitter = require('events').EventEmitter;

let PageStatus = Object.assign({}, EventEmitter.prototype, {
  DOCUMENT_READY: 'page-added',

  loaded: false,
  dirty: false,
  
  constructor(){
    DocumentBridge.isInjected(isInjected => {
      if (isInjected) {
        this.emit(this.DOCUMENT_READY);
        this.loaded = true;
      }
    });

    DocumentBridge.addMessageListener(msg => {
      if (msg.action = 'documentLoaded') {
        this.emit(this.DOCUMENT_READY);
        this.loaded = true;
      }
    });
  },

  isLoaded() {
    return this.loaded;
  }
});
PageStatus.constructor();

module.exports = PageStatus;
