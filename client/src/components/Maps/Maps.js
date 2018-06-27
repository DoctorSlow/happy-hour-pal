// maintain a state on the parent to pass down to both listresults and mapresults pages

import React, { Component } from 'react';
import { Link } from "react-router-dom";
import "./Maps.css";
import API from "../../utils/API";

class App extends React.Component {
  constructor(props) {
    super(props);

    // Must initialize state first
    this.state = { count: 0 };
  }

  handleClick() {
    // Increment the count when the button is clicked
    this.setState({
      count: this.state.count + 1
    }, function () {
      // setState is asynchronous! This function gets called
      // when it's finished.
      console.log("Job's done");
    });
  }

  render() {
    return (
      <div className="app">
        <div className="click-count">
          Button presses: {this.state.count}
        </div>
        <button onClick={this.handleClick.bind(this)}>
          Add One
        </button>
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('container')
);