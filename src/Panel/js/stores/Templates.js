
var DocumentBridge = require('../DocumentBridge');
var EventEmitter = require('events').EventEmitter;

const TEMPLATES_CHANGED = 'templates-changed';

let Templates = Object.assign({}, EventEmitter.prototype, {
  templates: new Map(),

  constructor(){
    DocumentBridge.addMessageListener((msg) => {
      if (msg.action == 'documentLoaded') {
        this.loadTemplates();
      }
    });
  },

  loadTemplates() {
    DocumentBridge.callSniffer('getTemplates', (templates) => {
      templates.forEach((template) => {
        this.templates.set(template.name, template);
      });
      this.emit(TEMPLATES_CHANGED);
    });
  },

  getTemplates() {
    return this.templates;
  },

  addChangeListener(callback) {
    this.on(TEMPLATES_CHANGED, callback);
  },

  removeChangeListener(callback) {
    this.removeListener(TEMPLATES_CHANGED, callback);
  }

});
Templates.constructor();

module.exports = Templates;
