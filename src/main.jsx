require('./utils/react-shim');
const React = require('react');

const App = require('./components/App');
const OrganizerPanel = require('./controllers/OrganizerPanel');

const organizerPanel = new OrganizerPanel(App);

module.exports = {
  panels : { organizerPanel }
};
