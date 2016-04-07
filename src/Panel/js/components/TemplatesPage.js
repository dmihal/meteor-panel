var React = require('react');
var Pages = require('../stores/Pages');
var Templates = require('../stores/Templates');

var TemplatesPage = React.createClass({
  getInitialState() {
    return {
      templates: Templates.getTemplates()
    };
  },

  componentDidMount: function() {
    Templates.addChangeListener(() => {
      this.setState({templates: Templates.getTemplates()})
    });
  },

  render() {
    let templateNodes = [];
    this.state.templates.forEach(template => {
      templateNodes.push(React.DOM.div(null, template.name));
    });

    return React.DOM.div(null, templateNodes);
  }
});

Pages.addPage(TemplatesPage, {
  title: "Templates",
  id: "templates",
});

module.exports = TemplatesPage;
