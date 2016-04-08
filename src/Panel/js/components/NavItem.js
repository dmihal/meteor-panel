var React = require('react');
var UIActions = require('../actions/UIActions');

var NavItem = React.createClass({
  render() {
    return React.DOM.a({
      href: this.props.page.id,
      className: 'navItem',
      onClick: this.handleClick,
    }, this.props.page.title);
  },

  handleClick(e) {
    e.preventDefault();
    UIActions.setPage(this.props.page.id);
  }
});

module.exports = NavItem;
