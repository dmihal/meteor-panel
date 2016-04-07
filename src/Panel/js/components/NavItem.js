var React = require('react');
var Pages = require('../stores/Pages');
var NavItem = require('./NavItem');
var UIActions = require('../actions/UIActions');

var NavTree = React.createClass({
  render() {
    return React.DOM.a({
      href: this.props.page.id,
      onClick: this.handleClick
    }, this.props.page.title);
  },

  handleClick(e) {
    e.preventDefault();
    UIActions.setPage(this.props.page.id);
  }
});

module.exports = NavTree;
