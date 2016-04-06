require("babel-polyfill");

var React = require('react');

var MeteorPanel = require('./components/MeteorPanel');

React.render(
  React.createElement(MeteorPanel),
  document.getElementById('app')
);
