var React = require('react');
var Pages = require('../stores/Pages');

var InfoPage = React.createClass({
  render() {
    return React.DOM.div(null, "InfoPage");
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
