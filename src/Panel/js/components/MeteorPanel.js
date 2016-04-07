var React = require('react');
var DocumentBridge = require('../DocumentBridge');
var Templates = require('../stores/Templates');
var Pages = require('../stores/Pages');
var InfoPage = require('./InfoPage');
var NavTree = require('./NavTree');


var MeteorPanel = React.createClass({

  getInitialState() {
    return {
      pageId: 'info',
      isLoaded: false,
      templates: Templates.getTemplates()
    };
  },

  componentDidMount: function() {
    DocumentBridge.addMessageListener((msg) => {
      if (msg.action = 'documentLoaded') {
        this.setState({isLoaded: true});
      }
    });
    Templates.addChangeListener(() => {
      this.setState({templates: Templates.getTemplates()})
    });

    DocumentBridge.injectScript();
  },

  render() {
    var isLoaded = this.state.isLoaded;

    var loadedText = isLoaded ? "Sniffer loaded" : "Not loaded";

    let templateNodes = []
    this.state.templates.forEach(template => {
      templateNodes.push(React.DOM.div(null, template.name));
    });

    let currentPage = Pages.getPage(this.state.pageId);

    return React.DOM.div(null,
      React.DOM.div(null, loadedText),
      React.createElement(NavTree),
      React.createElement(currentPage.component),
      React.DOM.div(null, templateNodes));
  },


});

module.exports = MeteorPanel;

