import React, { Component } from "react";

import "./Todo.scss";

export default class TodoList extends Component {
  render() {
    const { Todos = [] } = this.props;
    return (
      <div className="todoList">
        <ul className="list-unstyled h-75">
          {Todos.map((todo, index) => (
            <li
              key={todo._id}
              className="text-truncate w-100 border"
              onClick={() => this.props.setActiveTodo(todo._id)}
            >
              {todo.title || "Undefined"}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
