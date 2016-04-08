var React = require('react');
var Constants = require('../Constants');
var Dispatcher = require('../Dispatcher');
var DocumentBridge = require('../DocumentBridge');
var Templates = require('../stores/Templates');
var Pages = require('../stores/Pages');
var PageStatus = require('../stores/PageStatus');
var NavTree = require('./NavTree');

var InfoPage = require('./InfoPage');
var TemplatesPage = require('./TemplatesPage');

var div = React.DOM.div;


var MeteorPanel = React.createClass({

  getInitialState() {
    return {
      pageId: 'info',
      isLoaded: false
    };
  },

  componentDidMount: function() {
    DocumentBridge.isInjected(isLoaded => this.setState({isLoaded}));

    PageStatus.on(PageStatus.DOCUMENT_READY, () => {
      this.setState({isLoaded: true});
    });

    Dispatcher.register(this.handleActions);

    DocumentBridge.injectScript();
  },

  render() {
    var isLoaded = this.state.isLoaded;
    var loadedText = isLoaded ? "Sniffer loaded" : "Not loaded";

    let currentPage = Pages.getPage(this.state.pageId);

    return div({className: 'container'},
      div({className: 'alert'}, loadedText),
      div({className: 'containerBody'},
        React.createElement(NavTree),
        div({className: 'content'},
          React.createElement(currentPage.component)
        )
      )
    );
  },

  handleActions(action) {
    switch(action.actionType) {
      case Constants.SET_PAGE:
        this.setState({pageId: action.id});
        break;
    }
  }
});

module.exports = MeteorPanel;

