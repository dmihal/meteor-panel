var DocumentBridge = require('../DocumentBridge');
var EventEmitter = require('events').EventEmitter;

let PageStatus = Object.assign({}, EventEmitter.prototype, {
  DOCUMENT_READY: 'page-added',
  STATUS_UPDATED: 'status-updated',

  loaded: false,
  dirty: false,
  status: {},
  
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

    this.on(this.DOCUMENT_READY, this.updateStatus);
  },

  getStatus() {
    return this.status;
  },

  updateStatus() {
    DocumentBridge.callSniffer("getStatus", response => {
      this.status = response;
      this.loaded = response.loaded;
      this.dirty = response.dirty;

      this.emit(this.STATUS_UPDATED, this.status);
    });
  },

  isLoaded() {
    return this.loaded;
  }
});
PageStatus.constructor();

module.exports = PageStatus;
