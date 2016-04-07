var EventEmitter = require('events').EventEmitter;

let Pages = Object.assign({}, EventEmitter.prototype, {
  pages: new Map(),

  PAGE_ADDED: 'page-added',

  addPage(component, options) {
    page = Object.assign({
      component,
      title: "Untitled",
      id: `page-${Math.random()*10000|0}`,
      params: {},
      parent: null,
      order: 999
    }, options);
    this.pages.set(page.id, page);

    return page.id;
  },

  getPage(id) {
    return this.pages.get(id);
  }
});
Pages.constructor();

module.exports = Pages;