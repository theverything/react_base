/** @jsx React.DOM */

var React = require('react');

var Hello = React.createClass({
  componentDidMount: function () {
    this.getPeople(this.state.count);
  },
  getInitialState: function () {
    return {
      count: 1,
      people: [{}]
    }
  },
  handleSelectChange: function (event) {
    this.getPeople(event.target.value);
  },
  getPeople: function (count) {
    $.getJSON('/api/people/' + count, function (data, textStatus, jqXHR) {
      this.setState({ count: count, people: data });
    }.bind(this));
  },
  render: function () {
    var people = this.state.people.map(function (person, index) {
      return (
        <li key={index}>
          Name: {person.name} <br />
          Eye Color: {person.eyes}
        </li>
      );
    });
    return (
      <div className="main">
      <select value={this.state.count} onChange={this.handleSelectChange}>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </select>
        <ul>
          {people}
        </ul>
      </div>
    );
  }
});

module.exports = Hello;
