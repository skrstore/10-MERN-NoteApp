import React, { Component } from "react";

export default class TodoBox extends Component {
  render() {
    const { todo } = this.props;
    return (
      <div>
        <h3>{todo.title}</h3>
        <div>
          <pre>{todo.todo}</pre>
        </div>
      </div>
    );
  }
}
