var Dispatcher = require('../Dispatcher');
var Constants = require('../Constants');

var UIActions = {
  setPage(id) {
    Dispatcher.dispatch({
      actionType: Constants.SET_PAGE,
      id
    });
  }
}

module.exports = UIActions;
