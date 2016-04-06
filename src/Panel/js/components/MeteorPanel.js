var React = require('react');
var DocumentBridge = require('../DocumentBridge');


var MeteorPanel = React.createClass({

  getInitialState() {
    return {
      isLoaded: false
    };
  },

  componentDidMount: function() {
    DocumentBridge.addMessageListener((msg) => {
      if (msg.action = 'documentLoaded') {
        this.setState({isLoaded: true});
      }
    });
    DocumentBridge.injectScript();
  },

  render() {
    var isLoaded = this.state.isLoaded;

    var loadedText = isLoaded ? "Sniffer loaded" : "Not loaded";

  	return React.DOM.div(null, loadedText);
  },


});

module.exports = MeteorPanel;

