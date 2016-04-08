var React = require('react');
var Pages = require('../stores/Pages');
var PageStatus = require('../stores/PageStatus');

var div = React.DOM.div;

var InfoPage = React.createClass({
  getInitialState() {
    return {
      status: PageStatus.getStatus(),
    };
  },

  componentDidMount: function() {
    PageStatus.on(PageStatus.STATUS_UPDATED, status => this.setState({status}));
  },

  render() {
    if (!this.state.status.loaded) {
      return div(null, "Loading...");
    }
    if (!this.state.status.meteor) {
      return div(null, "Meteor not found!");
    }

    return div(null,
      "InfoPage",
      div(null, "Meteor version: " + this.state.status.version),
      div(null, "Packages:"),
      this.state.status.packages.sort().map(pkg => div(null, pkg))
    );
  }
});

Pages.addPage(InfoPage, {
  title: "Info",
  id: "info",
  params: {},
  parent: null,
  order: -100
});

module.exports = InfoPage;
