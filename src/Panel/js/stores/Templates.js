
var DocumentBridge = require('../DocumentBridge');
var EventEmitter = require('events').EventEmitter;
var PageStatus = require('./PageStatus');

const TEMPLATES_CHANGED = 'templates-changed';

let Templates = Object.assign({}, EventEmitter.prototype, {
  templates: new Map(),

  constructor(){
    PageStatus.on(PageStatus.DOCUMENT_READY, () => this.loadTemplates());
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
