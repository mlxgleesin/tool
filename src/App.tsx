import React, { Component } from 'react';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { name: 0 };
  }
  handleClick = () => {
    setTimeout(() => {
      this.setState({ name: this.state.name + 3 });
    }, 0);
    setTimeout(() => {
      this.setState({ name: this.state.name + 1 });
    }, 0);
  };
  render() {
    return (
      <div>
        <button onClick={this.handleClick}>按钮</button>
        <div>{this.state.name}</div>
      </div>
    );
  }
}
