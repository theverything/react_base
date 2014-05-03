/** @jsx React.DOM */

var React = require('../../bower_components/react/react-with-addons');

var Hello = React.createClass({
  getInitialState: function () {
    return {
      name: "you"
    }
  },
  handleOnChange: function (event) {
    this.setState({ name: event.target.value });
  },
  render: function () {
    return (
      <div className="main">
        <input type="text" onChange={this.handleOnChange} placeholder="Type your name.." />
        <h1>Hello {this.state.name}!</h1>
      </div>
    );
  }
});

module.exports = Hello;
