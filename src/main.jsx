require('./utils/react-shim');
const React = require('react');

const App = require('./components/App');
const OrganizerPanel = require('./controllers/OrganizerPanel');

module.exports = {
  panels : {
    organizerPanel: new OrganizerPanel(App),
    colorOrganizerPanel: new OrganizerPanel(App, 0),
    textStylesOrganizerPanel: new OrganizerPanel(App, 1),
    componentsOrganizerPanel: new OrganizerPanel(App, 2),
  }
};
