const React = require('react');
const ReactDOM = require('react-dom');


class OrganizerPanel {
  constructor(App, defaultSection = null) {
    this.App = App;
    this.instance = null;
    this.rootNode = document.createElement('div');
    this.attachment = null;
    this.defaultSection = defaultSection;

    ['show', 'hide', 'update'].forEach((fn) =>
      this[fn] = this[fn].bind(this)
    );
  }

  show(event) {
    const { selection, root } = require('scenegraph');
    const App = this.App;

    this.attachment = event.node;
    this.attachment.appendChild(this.rootNode);

    if (!this.instance) {
      this.instance = ReactDOM.render(<App defaultSection={this.defaultSection} />, this.rootNode);
    }

    this.update(selection, root);
  }

  hide(event) {
    this.attachment.removeChild(this.rootNode);
  }

  update(selection, root) {
    if (this.instance.documentStateChanged) {
      this.instance.documentStateChanged(selection, root);
    }
  }
}

module.exports = OrganizerPanel;
