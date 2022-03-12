import React, { Component } from "react";

import "./Todo.scss";
import TodoBox from "./TodoBox";

export default class TodoBoxContainer extends Component {
  render() {
    const { todoList = [] } = this.props;
    return (
      <div className=" todoBoxContainer">
        {todoList.map((todo, index) => {
          return <TodoBox key={index} todo={todo} />;
        })}
      </div>
    );
  }
}
