var React = require('react');
var Pages = require('../stores/Pages');
var NavItem = require('./NavItem');

var NavTree = React.createClass({
  render() {
    let pages = Pages.getPages();
    let links = [];
    pages.forEach((page) => {
      links.push(React.createElement(NavItem, {page}));
    });

    return React.DOM.div({
      className: 'navTree',
    }, links);
  }
});

module.exports = NavTree;
